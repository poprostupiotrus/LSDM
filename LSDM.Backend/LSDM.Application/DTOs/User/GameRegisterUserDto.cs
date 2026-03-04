using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Application.DTOs.User
{
    public class GameRegisterUserDto
    {
        [Required(ErrorMessage = "Nazwa użytkownika jest wymagana.")]
        [MinLength(3, ErrorMessage = "Nazwa użytkownika musi mieć co najmniej 3 znaki.")]
        [MaxLength(20, ErrorMessage = "Nazwa użytkownika może mieć maksymalnie 20 znaków.")]
        [RegularExpression(@"^[a-zA-Z0-9]+$", ErrorMessage = "Nazwa użytkownika może zawierać tylko litery, cyfry.")]
        public string UserName { get; set; } = null!;
        [Required(ErrorMessage = "Hasło jest wymagane.")]
        [MinLength(8, ErrorMessage = "Hasło musi mieć co najmniej 8 znaków.")]
        [MaxLength(100, ErrorMessage = "Hasło może mieć maksymalnie 100 znaków.")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$",
            ErrorMessage = "Hasło musi zawierać co najmniej 8 znaków, małą i dużą literę, cyfrę i znak specjalny.")]
        public string Password { get; set; } = null!;
        [Required] public string SocialClubId { get; set; } = null!;
        [Required] public string Hwid { get; set; } = null!;
        [Required] public string IpAddress { get; set; } = null!;
    }
}
