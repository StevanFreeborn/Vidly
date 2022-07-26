using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Vidly.Models;
using Vidly.ViewModels;

namespace Vidly.Controllers
{
    public class CustomersController : Controller
    {
        public ActionResult Index()
        {
            var customers = new List<Customer>
            {
                new Customer { Id = 1, Name = "Stevan Freeborn"},
                new Customer { Id = 2, Name = "Reece Freeborn"}
            };

            var viewModel = new CustomersViewModel
            {
                Customers = customers
            };


            return View(viewModel);
        }

        public ActionResult Details(int id)
        {
            var customers = new List<Customer>
            {
                new Customer { Id = 1, Name = "Stevan Freeborn"},
                new Customer { Id = 2, Name = "Reece Freeborn"}
            };

            var customer = customers
                .Where(c => c.Id == id)
                .FirstOrDefault();

            return View(customer);
        }
    }
}