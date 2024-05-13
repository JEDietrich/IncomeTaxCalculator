using IncomeTaxCalculator.API.Data.Repositories;
using IncomeTaxCalculator.API.Models;

namespace IncomeTaxCalculator.API.Sevices
{
    public interface IEmployeeService
    {
        Task<List<Employee>> GetEmployees();
        Task<Employee> GetEmployee(int id);
        Task<Employee> UpdateEmployee(Employee employee);
    }
}
