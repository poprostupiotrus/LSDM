using Microsoft.EntityFrameworkCore;
namespace LSDM.Infrastracture
{
    public class LSDMDbContext : DbContext
    {
        public LSDMDbContext(DbContextOptions options) : base(options) { }
    }
}
