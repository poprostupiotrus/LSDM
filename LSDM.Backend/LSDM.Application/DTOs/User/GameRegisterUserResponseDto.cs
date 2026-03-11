using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Application.DTOs.User
{
    public class GameRegisterUserResponseDto
    {
        public string Token { get; set; } = null!;
        public string Id { get; set; } = null!;
        public string Role { get; set; } = null!;
        public int Kills { get; set; }
        public int Deaths { get; set; }
    }
}
