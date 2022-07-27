using System.Collections.Generic;
using Vidly.Models;

namespace Vidly.ViewModels
{
    public class CustomersViewModel
    {
        public IEnumerable<Customer> Customers { get; set; }
    }
}