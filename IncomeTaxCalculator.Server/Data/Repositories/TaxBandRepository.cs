using IncomeTaxCalculator.API.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace IncomeTaxCalculator.API.Data.Repositories
{
    public class TaxBandRepository : ITaxBandRepository
    {
        private readonly AppDbContext _context;

        public TaxBandRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TaxBand>> GetTaxBands()
        {
            return await _context.TaxBands.ToListAsync();
        }
    }
}
