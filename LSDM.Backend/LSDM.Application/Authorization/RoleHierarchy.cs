using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Application.Authorization
{
    public static class RoleHierarchy
    {
        private static readonly Dictionary<string, int> _roleLevels =
            new()
            {
            { Roles.Player, 0 },
            { Roles.Moderator, 1 },
            { Roles.Admin, 2 },
            { Roles.Owner, 3 }
            };

        public static int GetLevel(string role)
        {
            return _roleLevels.TryGetValue(role, out var level)
                ? level
                : 0;
        }
    }
}
