using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Store.Data.Entities;

namespace Store.Data.DataAccess
{
    public class StoreDbContext : IdentityDbContext<ApplicationUser>
    {
        public StoreDbContext(DbContextOptions<StoreDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Game>()
                .HasMany(g => g.Genres)
                .WithMany(g => g.Games)
                .UsingEntity<GameGenre>(
                    gg => gg.HasOne(prop => prop.Genre).WithMany().HasForeignKey(prop => prop.GenresId),
                    gg => gg.HasOne(prop => prop.Game).WithMany().HasForeignKey(prop => prop.GamesId),
                    gg =>
                    {
                        gg.HasKey(prop => new { prop.GenresId, prop.GamesId });
                    }
                );

            base.OnModelCreating(builder);
        }

        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<GameGenre> GameGenre { get; set; }
        public DbSet<Comment> Comments { get; set; }
    }
}