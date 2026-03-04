using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Application.Authorization
{
    public static class RolePermissions
    {
        private static readonly Dictionary<string, List<Permission>> _permissions =
            new()
            {
            {
                Roles.Support,
                new List<Permission>()
            },
            {
                Roles.Moderator,
                new List<Permission>()
            },
            {
                Roles.Admin,
                new List<Permission>()
                {
                    Permission.BanPlayer
                }
            },
            {
                Roles.Owner,
                new List<Permission>()
            }
            };

        public static bool HasPermission(string role, Permission permission)
        {
            var userLevel = RoleHierarchy.GetLevel(role);

            var permissions = new List<Permission>();

            foreach (var kvp in _permissions)
            {
                var roleLevel = RoleHierarchy.GetLevel(kvp.Key);

                if (roleLevel <= userLevel)
                    permissions.AddRange(kvp.Value);
            }

            return permissions.Contains(permission);
        }
    }
}
