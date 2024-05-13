using IncomeTaxCalculator.API.Models;
using System;

namespace IncomeTaxCalculator.API.Data.Repositories
{
    public interface ITaxBandRepository
    {
        Task<IEnumerable<TaxBand>> GetTaxBands();
    }
}
