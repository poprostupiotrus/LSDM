using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Domain.Entities
{
    public class ServerRole
    {
        public int ServerRoleId { get; set; }
        public string Name { get; set; } = null!;
        public List<LSDMUser> Users { get; set; } = new();
    }
}
