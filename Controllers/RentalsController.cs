using System.Web.Mvc;

namespace Vidly.Controllers
{
    public class RentalsController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Add()
        {
            return View("RentalsForm");
        }
    }
}