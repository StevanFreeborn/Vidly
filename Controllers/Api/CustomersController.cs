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
    public class CustomersController : ApiController
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CustomersController()
        {
            _context = new ApplicationDbContext();

            var mapperConfig = AutoMapperConfig.Configure();
            _mapper = mapperConfig.CreateMapper();
        }

        [HttpGet]
        public IHttpActionResult GetCustomers(string query = null)
        {
            var customersQuery = _context.Customers
                .Include(c => c.MembershipType);

            if (String.IsNullOrEmpty(query) is false)
            {
                customersQuery = customersQuery.Where(c => c.Name.ToLower().Contains(query.ToLower()));
            }

            var customerDtos = customersQuery
                .ToList()
                .Select(_mapper.Map<CustomerDto>);
            
            return Ok(customerDtos);
        }

        [HttpGet]
        public IHttpActionResult GetCustomer(int id)
        {
            var customer = _context.Customers
                .Include(c => c.MembershipType)
                .SingleOrDefault(c => c.Id == id);

            if (customer is null) return NotFound();

            var customerDto = _mapper.Map<CustomerDto>(customer);

            return Ok(customerDto);
        }

        [HttpPost]
        public IHttpActionResult CreateCustomer(CustomerDto customerDto)
        {
            if (ModelState.IsValid is false) return BadRequest();

            var customer = _mapper.Map<Customer>(customerDto);

            _context.Customers.Add(customer);
            _context.SaveChanges();

            customerDto.Id = customer.Id;

            var resourceUri = new Uri($"{Request.RequestUri}/{customer.Id}");

            return Created(resourceUri ,customerDto);
        }

        [HttpPut]
        public IHttpActionResult UpdateCustomer(int id, CustomerDto customerDto)
        {
            if (ModelState.IsValid is false) return BadRequest();

            var existingCustomer = _context.Customers.SingleOrDefault(c => c.Id == id);

            if (existingCustomer is null) return NotFound();

            _mapper.Map(customerDto, existingCustomer);

            _context.SaveChanges();

            customerDto.Id = existingCustomer.Id;

            return Ok(customerDto);
        }

        [HttpDelete]
        public void DeleteCustomer(int id)
        {
            var existingCustomer = _context.Customers.SingleOrDefault(c => c.Id == id);

            if (existingCustomer is null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            _context.Customers.Remove(existingCustomer);
            _context.SaveChanges();
        }
    }
}
