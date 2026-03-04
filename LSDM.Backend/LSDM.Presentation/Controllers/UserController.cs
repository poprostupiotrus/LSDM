using LSDM.Application.DTOs.Ban;
using LSDM.Application.Exceptions;
using LSDM.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace LSDM.Presentation.Controllers
{
    [Route("users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly int _minPageSize = 20;
        private readonly int _maxPageSize = 50;
        private readonly int _minPageNumber = 1;
        private readonly IBanService _banService;
        private readonly IUserService _userService;
        public UserController(IBanService banService, IUserService userService)
        {
            _banService = banService;
            _userService = userService;
        }
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 20,[FromQuery] string? username = null,[FromQuery] bool sortByDescending = false)
        {
            pageSize = Math.Clamp(pageSize, _minPageSize, _maxPageSize);
            pageNumber = Math.Clamp(pageNumber, _minPageNumber, int.MaxValue);
            var users = await _userService.GetAllAsync(pageNumber, pageSize, username, sortByDescending);
            return Ok(users);
        }
        [Authorize]
        [HttpPost("{userId}/ban")]
        public async Task<IActionResult> BanUser([FromRoute] string userId, [FromBody] BanUserRequestDto banUserRequestDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var bannedByUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            try
            {
                var banDto = await _banService.BanUserAsync(userId, bannedByUserId, banUserRequestDto.Reason, banUserRequestDto.BannedUntil);
                return Ok(banDto);
                
            }
            catch(UnauthorizedAccessException e)
            {
                return StatusCode(403, new
                {
                    message = e.Message
                });
            }
            catch(UserBannedException e)
            {
                return BadRequest(e.Message);
            }
            catch(UserNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }
    }
}
