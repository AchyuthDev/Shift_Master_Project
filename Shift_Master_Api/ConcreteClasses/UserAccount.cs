using Shift_Master_Api.DataContextDb;
using Shift_Master_Api.DTO;
using Shift_Master_Api.Models.DomineModels;
using Shift_Master_Api.Repostry;

namespace Shift_Master_Api.ConcreteClasses
{
    public class UserAccount : IUserAccount
    {
        private readonly ApplicationDbContext _context;

        public UserAccount(ApplicationDbContext Context)
        {
            _context = Context;
        }

        public bool AddUser(RegisterDto UserDetails)
        {
            try
            {
                Register User=new Register();
                User.Name = UserDetails.Name;
                User.Email = UserDetails.Email;
                User.Password = UserDetails.Password;
                _context.Register.Add(User);
                int i=_context.SaveChanges();
                return true;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public bool validateUser(LoginDto UserCredentials)
        {
           
            try
            {
                var ValidUser = (from Login in _context.Register where Login.Email == UserCredentials.email && Login.Password == UserCredentials.password select new { email = Login.Email }).FirstOrDefault();

                if (ValidUser == null)
                {
                    return false;
                }
                return true;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
