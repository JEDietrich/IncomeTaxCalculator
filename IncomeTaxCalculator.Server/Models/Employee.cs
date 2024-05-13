
// Employee.cs
using System.ComponentModel.DataAnnotations;

namespace IncomeTaxCalculator.API.Models
{
    
    public class Employee
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public decimal GrossAnnualSalary { get; set; }
    }
}
