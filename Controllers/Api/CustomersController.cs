using System.Collections.Generic;
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
        private ApplicationDbContext _context;
        private IMapper _mapper;

        public CustomersController()
        {
            _context = new ApplicationDbContext();

            var mapperConfig = AutoMapperConfig.Configure();
            _mapper = mapperConfig.CreateMapper();
        }

        [HttpGet]
        public IEnumerable<CustomerDto> GetCustomers()
        {
            return _context.Customers
                .ToList()
                .Select(_mapper.Map<CustomerDto>);
        }

        [HttpGet]
        public Customer GetCustomer(int id)
        {
            var customer = _context.Customers.SingleOrDefault(c => c.Id == id);

            if (customer is null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            return customer;
        }

        [HttpPost]
        public Customer CreateCustomer(Customer customer)
        {
            if (!ModelState.IsValid)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            _context.Customers.Add(customer);
            _context.SaveChanges();

            return customer;
        }

        [HttpPut]
        public Customer UpdateCustomer(int id, Customer customer)
        {
            if (!ModelState.IsValid)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            var existingCustomer = _context.Customers.SingleOrDefault(c => c.Id == id);

            if (existingCustomer is null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            existingCustomer.Name = customer.Name;
            existingCustomer.Birthday = customer.Birthday;
            existingCustomer.IsSubscribedToNewsletter = customer.IsSubscribedToNewsletter;
            existingCustomer.MembershipTypeId = customer.MembershipTypeId;

            _context.SaveChanges();

            return existingCustomer;
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
