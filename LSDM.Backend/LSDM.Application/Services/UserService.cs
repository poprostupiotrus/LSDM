using LSDM.Application.Authorization;
using LSDM.Application.DTOs.User;
using LSDM.Application.Exceptions;
using LSDM.Application.Interfaces;
using LSDM.Application.Mappers;
using LSDM.Domain.Entities;
using LSDM.Domain.Interfaces;

namespace LSDM.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly ITokenService _tokenService;
        private readonly IServerRoleRepository _serverRoleRepository;
        private readonly IBanRepository _banRepository;

        public UserService(IUserRepository userRepository, ITokenService tokenService, IServerRoleRepository serverRoleRepository, IBanRepository banRepository)
        {
            _userRepository = userRepository;
            _tokenService = tokenService;
            _serverRoleRepository = serverRoleRepository;
            _banRepository = banRepository;
        }

        public async Task<List<UserDto>> GetAllAsync(int pageNumber, int pageSize, string? username = null, bool sortByDescending = false)
        {
            var users = await _userRepository.GetAllAsync(pageNumber, pageSize, username, sortByDescending);
            return users.Select(user => user.ToUserDto()).ToList();
        }

        public async Task<GameLoginUserResponseDto> LoginAsync(string username, string password, string socialClubId, string hwid, string ipAddress)
        {
            var user = await _userRepository.GetByUsernameAsync(username);
            if (user == null)
                throw new Exception("Nieprawidłowa nazwa użytkownika lub hasło");

            var accountBan = await _banRepository.GetActiveBanForUserAsync(user.Id);
            if (accountBan != null)
            {
                throw new UserBannedException(
                    $"Twoje konto zostało zbanowane do {accountBan.EndDate?.ToLocalTime() ?? DateTime.MaxValue}. Powód: {accountBan.Reason}");
            }

            if (user.LockoutEnabled && user.LockoutEnd.HasValue && user.LockoutEnd > DateTimeOffset.UtcNow)
            {
                throw new AccountBlockedException($"Konto zostało zablokowane do {user.LockoutEnd.Value.LocalDateTime}");
            }

            var passwordValid = await _userRepository.CheckPasswordAsync(user, password);
            
            if (!passwordValid)
                throw new Exception("Nieprawidłowa nazwa użytkownika lub hasło");

            await _userRepository.UpdateLastLoginIdentifiersAsync(user, socialClubId, hwid, ipAddress);

            var serverRole = await _serverRoleRepository.GetServerRoleByUserId(user.Id);

            return new GameLoginUserResponseDto
            {
                Id = user.Id,
                Role = serverRole.Name,
                Token = _tokenService.GenerateToken(user),
                Kills = user.Kills,
                Deaths = user.Deaths
            };
        }

        public async Task<GameRegisterUserResponseDto> RegisterAsync(string username, string password, string socialClubId, string hwid, string ipAddress)
        {
            if (await _userRepository.ExistsByUserNameAsync(username))
                throw new Exception("Użytkownik o tej nazwie już istnieje");

            var playerRole = await _serverRoleRepository.GetServerRoleByName(Roles.Player);
            
            var user = new LSDMUser 
            { 
                UserName = username, 
                ServerRoleId = playerRole.ServerRoleId,
                LastSocialClubId = socialClubId,
                LastHwid = hwid,
                LastIpAddress = ipAddress
            };

            await _userRepository.CreateAsync(user, password);

            return new GameRegisterUserResponseDto
            {
                Id = user.Id,
                Role = playerRole.Name,
                Token = _tokenService.GenerateToken(user),
                Kills = user.Kills,
                Deaths = user.Deaths
            };
        }
    }
}
