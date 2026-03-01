using LSDM.Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
namespace LSDM.Infrastracture.Persistence
{
    public class LSDMDbContext : IdentityDbContext<LSDMUser>
    {
        public DbSet<ServerRole> ServerRoles { get; set; }
        public LSDMDbContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<LSDMUser>()
                .HasOne(u => u.ServerRole)
                .WithMany(sr => sr.Users)          
                .HasForeignKey(u => u.ServerRoleId);
        }
    }
}
