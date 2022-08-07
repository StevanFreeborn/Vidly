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
        private ApplicationDbContext _context;
        private IMapper _mapper;

        public MoviesController()
        {
            _context = new ApplicationDbContext();
            var mapperConfig = AutoMapperConfig.Configure();
            _mapper = mapperConfig.CreateMapper();
        }

        [HttpGet]
        public IHttpActionResult GetMovies()
        {
            var movies = _context.Movies
                .Include(m => m.Genre)
                .ToList()
                .Select(_mapper.Map<MovieDto>);

            return Ok(movies);
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

            _context.Movies.Add(movie);
            _context.SaveChanges();

            movieDto.Id = movie.Id;

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
