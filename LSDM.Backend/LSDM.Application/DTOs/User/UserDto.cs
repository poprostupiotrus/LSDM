using LSDM.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Application.DTOs.User
{
    public class UserDto
    {
        public string Id { get; set; } = null!;
        public string? UserName { get; set; }
        public string ServerRole { get; set; } = null!;
        public string LastSocialClubId { get; set; } = null!;
        public string LastHwid { get; set; } = null!;
        public string LastIpAddress { get; set; } = null!;

    }
}
