using System.Web.Mvc;

using BackboneMVC.Models;

namespace BackboneMVC.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Message = "Modify this template to jump-start your ASP.NET MVC application.";

            return View(DataFeed.Profiles);
        }
    }
}
