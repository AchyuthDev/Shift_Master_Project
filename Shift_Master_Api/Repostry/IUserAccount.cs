using Shift_Master_Api.DTO;

namespace Shift_Master_Api.Repostry
{
    public interface IUserAccount
    {
        public bool validateUser(LoginDto UserCredentials);

        public bool AddUser(RegisterDto UserDetails);
    }
}
