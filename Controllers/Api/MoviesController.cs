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

        public IHttpActionResult GetMovies()
        {
            var movies = _context.Movies
                .ToList()
                .Select(_mapper.Map<MovieDto>);

            return Ok(movies);
        }
    }
}
