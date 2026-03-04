using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Domain.Entities
{
    public class Ban
    {
        public int Id { get; set; }
        public string UserId { get; set; } = null!;
        public LSDMUser User { get; set; } = null!;
        public string Reason { get; set; } = null!;
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string BannedByUserId { get; set; } = null!;
        public LSDMUser BannedByUser { get; set; } = null!;
        public List<BanIdentifier> BanIdentifiers { get; set; } = new();
        public bool IsActive => !EndDate.HasValue || EndDate > DateTime.UtcNow;
    }
}
