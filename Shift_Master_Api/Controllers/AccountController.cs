using Microsoft.AspNetCore.Mvc;
using Shift_Master_Api.DTO;
using Shift_Master_Api.Repostry;

namespace Shift_Master_Api.Controllers
{
   
    public class AccountController : Controller
    {
        private readonly IUserAccount _accountRepostry;

        public AccountController(IUserAccount AccountRepostry)
        {
            _accountRepostry=AccountRepostry;
        }

        [HttpPost]
        [Route("api/Account/ValidateUser")]
        public IActionResult LoginValidateUser([FromBody]LoginDto LoginDetails)
        {
            bool valid = _accountRepostry.validateUser(LoginDetails);
            return Ok(valid);
        }
        [HttpPost]
        [Route("api/Account/addUser")]
        public IActionResult AddUser([FromBody]RegisterDto UserDetails)
        {
            _accountRepostry.AddUser(UserDetails);
            return Ok(UserDetails);
        }
    }
}
