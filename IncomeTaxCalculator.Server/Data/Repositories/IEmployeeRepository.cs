

using IncomeTaxCalculator.API.Models;
using Microsoft.EntityFrameworkCore;

namespace IncomeTaxCalculator.API.Data.Repositories
{
    public interface IEmployeeRepository
    {
        Task<List<Employee>> GetEmployees();
        Task<Employee> GetEmployee(int id);
        Task<Employee> UpdateEmployee(Employee employee);
    }
}
