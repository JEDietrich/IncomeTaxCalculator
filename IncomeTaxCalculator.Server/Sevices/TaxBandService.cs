using IncomeTaxCalculator.API.Data.Repositories;
using IncomeTaxCalculator.API.Models;

namespace IncomeTaxCalculator.API.Sevices
{
    public class TaxBandService : ITaxBandService
    {
        private readonly ITaxBandRepository _taxBandRepository;

        public TaxBandService(ITaxBandRepository taxBandRepository)
        {
            _taxBandRepository = taxBandRepository;
        }

        public async Task<IEnumerable<TaxBand>> GetTaxBands()
        {
            return await _taxBandRepository.GetTaxBands();
        }
    }
}
