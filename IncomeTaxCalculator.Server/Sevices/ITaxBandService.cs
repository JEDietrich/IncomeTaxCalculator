using IncomeTaxCalculator.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace IncomeTaxCalculator.API.Sevices
{
    public interface ITaxBandService
    {
        Task<IEnumerable<TaxBand>> GetTaxBands();
    }
}
