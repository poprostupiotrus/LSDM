using LSDM.Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
namespace LSDM.Infrastracture.Persistence
{
    public class LSDMDbContext : IdentityDbContext<LSDMUser>
    {
        public DbSet<ServerRole> ServerRoles { get; set; }
        public DbSet<Ban> Bans { get; set; }
        public DbSet<BanIdentifier> BanIdentifiers { get; set; }
        public LSDMDbContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<LSDMUser>()
                .HasOne(u => u.ServerRole)
                .WithMany(sr => sr.Users)          
                .HasForeignKey(u => u.ServerRoleId);
            modelBuilder.Entity<LSDMUser>()
                .HasMany(u => u.Bans)
                .WithOne(b => b.User)
                .HasForeignKey(b => b.UserId);
            modelBuilder.Entity<LSDMUser>()
                .HasMany(u => u.AssignedBans)
                .WithOne(b => b.BannedByUser)
                .HasForeignKey(b => b.BannedByUserId);
            modelBuilder.Entity<Ban>()
                .HasMany(b => b.BanIdentifiers)
                .WithOne(bi => bi.Ban)
                .HasForeignKey(bi => bi.BanId);
        }
    }
}
