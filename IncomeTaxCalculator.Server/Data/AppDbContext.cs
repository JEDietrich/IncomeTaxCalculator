using IncomeTaxCalculator.API.Models;
using Microsoft.EntityFrameworkCore;

namespace IncomeTaxCalculator.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<TaxBand> TaxBands { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>().HasData(
                new Employee { Id = 1, FirstName = "John", LastName = "Doe", GrossAnnualSalary = 40000 },
                new Employee { Id = 2, FirstName = "Jane", LastName = "Doe", GrossAnnualSalary = 50000 }
            );

            modelBuilder.Entity<TaxBand>().HasData(
                new TaxBand { Id = 1, Name = "Tax Band A", LowerLimit = 0, UpperLimit = 5000, TaxRate = 0 },
                new TaxBand { Id = 2, Name = "Tax Band B", LowerLimit = 5000, UpperLimit = 20000, TaxRate = 20 },
                new TaxBand { Id = 3, Name = "Tax Band C", LowerLimit = 20000, UpperLimit = null, TaxRate = 40 }
            );
        }
    }
}
