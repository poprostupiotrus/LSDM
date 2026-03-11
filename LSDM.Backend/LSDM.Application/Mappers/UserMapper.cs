using LSDM.Application.DTOs.User;
using LSDM.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Application.Mappers
{
    public static class UserMapper
    {
        public static UserDto ToUserDto(this LSDMUser user)
        {
            return new UserDto
            {
                Id = user.Id,
                UserName = user.UserName,
                ServerRole = user.ServerRole.Name,
                LastSocialClubId = user.LastSocialClubId,
                LastHwid = user.LastHwid,
                LastIpAddress = user.LastIpAddress,
                Kills = user.Kills,
                Deaths = user.Deaths
            };
        }
    }
}
