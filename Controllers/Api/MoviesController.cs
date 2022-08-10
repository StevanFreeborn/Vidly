using System;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web.Http;
using AutoMapper;
using Vidly.App_Start;
using Vidly.Dtos;
using Vidly.Models;

namespace Vidly.Controllers.Api
{
    public class MoviesController : ApiController
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public MoviesController()
        {
            _context = new ApplicationDbContext();
            var mapperConfig = AutoMapperConfig.Configure();
            _mapper = mapperConfig.CreateMapper();
        }

        [HttpGet]
        public IHttpActionResult GetMovies(string query = null)
        {
            var moviesQuery = _context.Movies
                .Include(m => m.Genre)
                .Where(m => m.NumberAvailable > 0);

            if (string.IsNullOrEmpty(query) is false)
            {
                moviesQuery = _context.Movies
                    .Where(m => m.Name.ToLower().Contains(query.ToLower()));
            }

            var movieDtos = moviesQuery
                .ToList()
                .Select(_mapper.Map<MovieDto>);

            return Ok(movieDtos);
        }

        [HttpGet]
        public IHttpActionResult GetMoviesById(int id)
        {
            var movie = _context.Movies
                .Include(m => m.Genre)
                .SingleOrDefault(m => m.Id == id);

            if (movie is null) return NotFound();

            var movieDto = _mapper.Map<MovieDto>(movie);

            return Ok(movieDto);
        }


        [HttpPost]
        [Authorize(Roles = RoleName.CanManageMovies)]
        public IHttpActionResult CreateMovie(MovieDto movieDto)
        {
            if (ModelState.IsValid is false) return BadRequest();

            var movie = _mapper.Map<Movie>(movieDto);

            movie.NumberAvailable = movie.NumberInStock;

            _context.Movies.Add(movie);
            _context.SaveChanges();

            movieDto.Id = movie.Id;

            var genre = _context.Genres.SingleOrDefault(g => g.Id == movieDto.GenreId);

            movieDto.Genre = _mapper.Map<GenreDto>(genre);

            var resourceUri = new Uri($"{Request.RequestUri}/{movie.Id}");

            return Created(resourceUri, movieDto);
        }

        [HttpPut]
        [Authorize(Roles = RoleName.CanManageMovies)]
        public IHttpActionResult UpdateMovie(int id, MovieDto movieDto)
        {
            if (ModelState.IsValid is false) return BadRequest();

            var existingMovie = _context.Movies.SingleOrDefault(m => m.Id == id);

            if (existingMovie is null) return NotFound();

            _mapper.Map(movieDto, existingMovie);

            _context.SaveChanges();

            movieDto.Id = existingMovie.Id;

            return Ok(movieDto);
        }
        
        [HttpDelete]
        [Authorize(Roles = RoleName.CanManageMovies)]
        public void DeleteMovie(int id)
        {
            var existingMovie = _context.Movies.SingleOrDefault(m => m.Id == id);


            if (existingMovie is null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            _context.Movies.Remove(existingMovie);
            _context.SaveChanges();
        }
    }
}
