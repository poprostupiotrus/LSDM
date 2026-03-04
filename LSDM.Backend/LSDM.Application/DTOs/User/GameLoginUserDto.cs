using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Application.DTOs.User
{
    public class GameLoginUserDto
    {
        [Required(ErrorMessage = "Nazwa użytkownika jest wymagana.")]
        public string UserName { get; set; } = null!;
        [Required(ErrorMessage = "Hasło jest wymagane.")]
        public string Password { get; set; } = null!;
        [Required] public string SocialClubId { get; set; } = null!;
        [Required] public string Hwid { get; set; } = null!;
        [Required] public string IpAddress { get; set; } = null!;
    }
}
