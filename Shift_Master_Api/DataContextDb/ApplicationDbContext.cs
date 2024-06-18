using Microsoft.EntityFrameworkCore;
using Shift_Master_Api.Models.DomineModels;

namespace Shift_Master_Api.DataContextDb
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        public DbSet<Register> Register { get; set; }
        public DbSet<Shift> ShiftTb { get; set; }
    }
}
