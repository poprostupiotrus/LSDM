using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Application.DTOs.User
{
    public class GameLoginUserResponseDto
    {
        public string Token { get; set; } = null!;
        public string Id { get; set; } = null!;
        public string Role { get; set; } = null!;
        public bool HasOutfit { get; set; }
        public int Kills { get; set; }
        public int Deaths { get; set; }
    }
}
