using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Application.DTOs.Ban
{
    public class BanUserRequestDto
    {
        [Required(ErrorMessage = "Musisz podać powód bana")]
        public string Reason { get; set; } = null!;
        public DateTime? BannedUntil { get; set; }
    }
}
