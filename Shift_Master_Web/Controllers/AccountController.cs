using Microsoft.AspNetCore.Mvc;

namespace Shift_Master_Web.Controllers
{
    public class AccountController : Controller
    {
       public IActionResult Login()
        {

            return View();
        }
        public IActionResult Register()
        {
            return View();
        }
    }
}
