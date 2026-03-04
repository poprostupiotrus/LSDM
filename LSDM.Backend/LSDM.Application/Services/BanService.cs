using LSDM.Application.Authorization;
using LSDM.Application.DTOs.Ban;
using LSDM.Application.Exceptions;
using LSDM.Application.Interfaces;
using LSDM.Application.Mappers;
using LSDM.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Application.Services
{
    public class BanService : IBanService
    {
        private readonly IUserRepository _userRepository;
        private readonly IBanRepository _banRepository;
        private readonly IServerRoleRepository _serverRoleRepository;
        public BanService(IUserRepository userRepository, IBanRepository banRepository, IServerRoleRepository serverRoleRepository)
        {
            _userRepository = userRepository;
            _banRepository = banRepository;
            _serverRoleRepository = serverRoleRepository;
        }
        public async Task<BanDto> BanUserAsync(string userId, string bannedByUserId, string reason, DateTime? bannedUntil)
        {
            var serverRole = await _serverRoleRepository.GetServerRoleByUserId(bannedByUserId);
            if(!RolePermissions.HasPermission(serverRole.Name, Permission.BanPlayer))
            {
                throw new UnauthorizedAccessException($"Nie masz dostępu do wykonania tej operacji");
            }
            var user = await _userRepository.GetByIdAsync(userId);
            if(user == null)
            {
                throw new UserNotFoundException($"Użytkownik o ID: {userId} nie istnieje");
            }
            var activeBan = await _banRepository.GetActiveBanForUserAsync(userId);
            if(activeBan != null)
            {
                throw new UserBannedException($"Uzytkownik o ID: {userId} ma aktywnego bana");
            }
            var ban = await _banRepository.CreateBanAsync(userId, user.LastSocialClubId, user.LastHwid, user.LastIpAddress, bannedByUserId, reason, bannedUntil);
            return ban.ToBanDto();
        }
    }
}
