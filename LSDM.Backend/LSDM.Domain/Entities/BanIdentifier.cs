using LSDM.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Domain.Entities
{
    public class BanIdentifier
    {
        public int Id { get; set; }
        public int BanId { get; set; }
        public Ban Ban { get; set; } = null!;
        public BanIdentifierType Type { get; set; }
        public string Value { get; set; } = null!;
    }
}
