using LSDM.Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
namespace LSDM.Infrastracture.Persistence
{
    public class LSDMDbContext : IdentityDbContext<LSDMUser>
    {
        public DbSet<ServerRole> ServerRoles { get; set; }
        public DbSet<Ban> Bans { get; set; }
        public DbSet<BanIdentifier> BanIdentifiers { get; set; }
        public DbSet<Outfit> Outfits { get; set; }
        public DbSet<OutfitComponent> OutfitComponents { get; set; }
        public DbSet<OutfitProp> OutfitProps { get; set; }
        public DbSet<FaceFeature> FaceFeatures { get; set; }
        public DbSet<HeadOverlay> HeadOverlays { get; set; }
        public DbSet<HeadBlend> HeadBlends { get; set; }
        public DbSet<ProcessedEvent> ProcessedEvents { get; set; }
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

            modelBuilder.Entity<LSDMUser>()
                .HasOne(u => u.Outfit)
                .WithOne(o => o.User)
                .HasForeignKey<Outfit>(o => o.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OutfitComponent>()
                .HasKey(c => new { c.OutfitId, c.ComponentId });
            modelBuilder.Entity<OutfitComponent>()
                .HasOne(c => c.Outfit)
                .WithMany(o => o.Components)
                .HasForeignKey(c => c.OutfitId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OutfitProp>()
                .HasKey(p => new { p.OutfitId, p.PropId });
            modelBuilder.Entity<OutfitProp>()
                .HasOne(p => p.Outfit)
                .WithMany(o => o.Props)
                .HasForeignKey(p => p.OutfitId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<HeadBlend>()
                .HasKey(hb => hb.OutfitId);
            modelBuilder.Entity<HeadBlend>()
                .HasOne(hb => hb.Outfit)
                .WithOne(o => o.HeadBlend)
                .HasForeignKey<HeadBlend>(hb => hb.OutfitId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<FaceFeature>()
                .HasKey(f => new { f.OutfitId, f.Index });
            modelBuilder.Entity<FaceFeature>()
                .HasOne(f => f.Outfit)
                .WithMany(o => o.FaceFeatures)
                .HasForeignKey(f => f.OutfitId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<HeadOverlay>()
                .HasKey(ho => new { ho.OutfitId, ho.HeadOverlayId });
            modelBuilder.Entity<HeadOverlay>()
                .HasOne(ho => ho.Outfit)
                .WithMany(o => o.HeadOverlays)
                .HasForeignKey(ho => ho.OutfitId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
