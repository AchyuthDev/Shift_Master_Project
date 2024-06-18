using System.ComponentModel.DataAnnotations;

namespace Shift_Master_Api.Models.DomineModels
{
    public class Register
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
