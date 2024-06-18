using Microsoft.AspNetCore.Mvc;

namespace Shift_Master_Web.Controllers
{
    public class ShiftMasterController : Controller
    {
        private readonly IConfiguration _configuration;
        public ShiftMasterController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public IActionResult ShiftMasterGrid()
        {
            ViewBag.ApiBaseAddress = _configuration["ApiBaseAddress"];
            return View();
        }
       
    }
}
