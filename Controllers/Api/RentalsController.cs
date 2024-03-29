﻿using System;
using System.Linq;
using System.Web.Http;
using System.Data.Entity;
using AutoMapper;
using Vidly.App_Start;
using Vidly.Dtos;
using Vidly.Models;
using System.Net;

namespace Vidly.Controllers.Api
{
    public class RentalsController : ApiController
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public RentalsController()
        {
            _context = new ApplicationDbContext();
            var mapperConfig = AutoMapperConfig.Configure();
            _mapper = mapperConfig.CreateMapper();
        }

        [HttpGet]
        public IHttpActionResult GetRentals()
        {
            var rentalDtos = _context.Rentals
                .Include(r => r.Movie)
                .Include(r => r.Movie.Genre)
                .Include(r => r.Customer)
                .Include(r => r.Customer.MembershipType)
                .ToList()
                .Select(_mapper.Map<RentalDto>);

            return Ok(rentalDtos);
        }

        [HttpPost]
        public IHttpActionResult CreateRental(RentalsDto rentalsDto)
        {
            var numOfMovieIds = rentalsDto.MovieIds.Count;

            if (ModelState.IsValid is false) return BadRequest();

            if (numOfMovieIds == 0) return BadRequest("No movie ids.");

            var customer = _context.Customers.SingleOrDefault(c => c.Id == rentalsDto.CustomerId);

            if (customer is null) return BadRequest("Invalid customer id.");

            var movies = _context.Movies
                .Where(m => rentalsDto.MovieIds.Contains(m.Id))
                .ToList();

            if (numOfMovieIds != movies.Count) return BadRequest("One or more invalid movie ids.");

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

        [HttpPut]
        public IHttpActionResult UpdateRental(int id, RentalDto rentalDto)
        {
            if (!ModelState.IsValid) return BadRequest();

            var customer = _context.Customers.SingleOrDefault(c => c.Id == rentalDto.CustomerId);

            if (customer is null) return BadRequest();

            var movie = _context.Movies.SingleOrDefault(m => m.Id == rentalDto.MovieId);

            if (movie is null) return BadRequest();

            if (rentalDto.DateReturned < rentalDto.DateRented) return BadRequest();

            var existingRental = _context.Rentals.SingleOrDefault(r => r.Id == id);

            if (existingRental is null) return NotFound();

            if (existingRental.DateReturned == null && rentalDto.DateReturned != null)
            {
                movie.CheckIn();
            }

            if (existingRental.DateReturned != null && rentalDto.DateReturned == null)
            {
                movie.CheckOut();
            }

            _mapper.Map(rentalDto, existingRental);

            _context.SaveChanges();

            return Ok(rentalDto);
        }

        [HttpDelete]
        public void DeleteMovie(int id)
        {
            var existingRental = _context.Rentals.Include(r => r.Movie).SingleOrDefault(r => r.Id == id);

            if (existingRental is null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            var movie = _context.Movies.SingleOrDefault(m => m.Id == existingRental.Movie.Id);

            if (movie != null)
            {
                movie.CheckIn();
            }


            _context.Rentals.Remove(existingRental);
            _context.SaveChanges();
        }
    }
}
