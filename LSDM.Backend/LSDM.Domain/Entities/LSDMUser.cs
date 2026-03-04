using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace LSDM.Domain.Entities
{
    public class LSDMUser : IdentityUser
    {
        public int ServerRoleId { get; set; }
        public ServerRole ServerRole { get; set; } = null!;
        public List<Ban> Bans { get; set; } = new();
        public List<Ban> AssignedBans { get; set; } = new();
        public string LastSocialClubId { get; set; } = null!;
        public string LastHwid { get; set; } = null!;
        public string LastIpAddress { get; set; } = null!;
    }
}
