using LSDM.Application.Exceptions;
using LSDM.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using LSDM.Application.DTOs.User;

namespace LSDM.Presentation.Controllers
{
    [Route("auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        public AuthController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] GameRegisterUserDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                var token = await _userService.RegisterAsync(dto.UserName, dto.Password, dto.SocialClubId, dto.Hwid, dto.IpAddress);
                return Ok(new { token });
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] GameLoginUserDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                var token = await _userService.LoginAsync(dto.UserName, dto.Password, dto.SocialClubId, dto.Hwid, dto.IpAddress);
                return Ok(new { Token = token });
            }
            catch(AccountBlockedException e)
            {
                return StatusCode(423, new { error = e.Message });
            }
            catch(UserBannedException e)
            {
                return StatusCode(403, new
                {
                    message = e.Message
                });
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
        }
    }
}
