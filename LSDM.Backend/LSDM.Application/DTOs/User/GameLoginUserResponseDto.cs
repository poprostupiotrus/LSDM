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
    }
}
