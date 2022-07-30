using System;
using System.Linq;
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
                .ToList()
                .Select(_mapper.Map<MovieDto>);

            return Ok(movies);
        }

        [HttpGet]
        public IHttpActionResult GetMoviesById(int id)
        {
            var movie = _context.Movies.SingleOrDefault(m => m.Id == id);

            if (movie is null) return NotFound();

            var movieDto = _mapper.Map<MovieDto>(movie);

            return Ok(movieDto);
        }

        [HttpPost]
        public IHttpActionResult CreateMovie(MovieDto movieDto)
        {
            if (!ModelState.IsValid) return BadRequest();

            var movie = _mapper.Map<Movie>(movieDto);

            _context.Movies.Add(movie);
            _context.SaveChanges();

            movieDto.Id = movie.Id;

            var resourceUri = new Uri($"{Request.RequestUri}/{movie.Id}");

            return Created(resourceUri, movieDto);
        }

        // TODO: Implement UpdateMovie(int id)

        // TODO: Implement DeleteMovie(int id)
    }
}
