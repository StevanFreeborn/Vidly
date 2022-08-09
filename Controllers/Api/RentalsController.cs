using System;
using System.Linq;
using System.Web.Http;
using AutoMapper;
using Vidly.App_Start;
using Vidly.Dtos;
using Vidly.Models;

namespace Vidly.Controllers.Api
{
    public class RentalsController : ApiController
    {
        private readonly ApplicationDbContext _context;

        public RentalsController()
        {
            _context = new ApplicationDbContext();
        }

        [HttpPost]
        public IHttpActionResult CreateRental(RentalDto rentalDto)
        {
            var numOfMovieIds = rentalDto.MovieIds.Count;

            if (ModelState.IsValid is false) return BadRequest();

            if (numOfMovieIds == 0) return BadRequest("No movie ids.");

            var customer = _context.Customers.SingleOrDefault(c => c.Id == rentalDto.CustomerId);

            if (customer is null) return BadRequest("Invalid customer id.");

            var movies = _context.Movies
                .Where(m => rentalDto.MovieIds.Contains(m.Id))
                .ToList();

            if (numOfMovieIds != movies.Count ) return BadRequest("One or more invalid movie ids.");

            foreach (var movie in movies)
            {
                if (movie.IsAvailable() is false) return BadRequest("Move is not available.");

                movie.CheckOut();

                var rental = new Rental
                {
                    Customer = customer,
                    Movie = movie
                };

                _context.Rentals.Add(rental);
            }

            _context.SaveChanges();

            return Ok();
        }
    }
}
