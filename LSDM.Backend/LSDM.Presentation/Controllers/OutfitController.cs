using LSDM.Application.DTOs.Outfit;
using LSDM.Application.Exceptions;
using LSDM.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace LSDM.Presentation.Controllers
{
    [Route("outfit")]
    [ApiController]
    public class OutfitController : ControllerBase
    {
        private readonly IOutfitService _outfitService;
        public OutfitController(IOutfitService outfitService)
        {
            _outfitService = outfitService;
        }
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetCurrentUserOutfit()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            try 
            {
                var outfit = await _outfitService.GetByUserIdAsync(userId);
                return Ok(outfit);
            }
            catch(OutfitNotFoundException e)
            {
                return NotFound(new { e.Message });
            }
        }
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateOutfit([FromBody] CreateOutfitRequestDto createOutfitRequestDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            try
            {
                await _outfitService.CreateAsync(userId, createOutfitRequestDto);
                return Ok();
            }
            catch(UserHasOutfitException e)
            {
                return Conflict(new { e.Message });
            }
        }
        [Authorize]
        [HttpPut]
        public async Task<IActionResult> UpdateOutfit([FromBody] UpdateOutfitRequestDto updateOutfitRequestDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            try
            {
                var outfit = await _outfitService.UpdateAsync(userId, updateOutfitRequestDto);
                return Ok(outfit);
            } catch (OutfitNotFoundException e)
            {
                return NotFound(new { e.Message });
            }
        }
    }
}
