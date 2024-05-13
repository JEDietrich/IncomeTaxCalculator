using IncomeTaxCalculator.API.Data;
using IncomeTaxCalculator.API.Models;
using IncomeTaxCalculator.API.Sevices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IncomeTaxCalculator.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaxBandController : ControllerBase
    {
        private readonly ITaxBandService _taxBandService;

        public TaxBandController(ITaxBandService taxBandService)
        {
            _taxBandService = taxBandService;
        }

        // GET: api/TaxBand
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaxBand>>> GetTaxBands()
        {
            var taxBands = await _taxBandService.GetTaxBands();
            return Ok(taxBands);
        }
    }
}
