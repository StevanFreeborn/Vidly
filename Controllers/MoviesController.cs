using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using Vidly.Models;

namespace Vidly.Controllers
{
    public class MoviesController : Controller
    {
        public ViewResult Random()
        {
            var movie = new Movie()
            {
                Name = "Shrek!"
            };

            return View(movie);
        }
    }
}
