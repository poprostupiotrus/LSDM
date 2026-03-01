using LSDM.Application.Authorization;
using LSDM.Domain.Entities;
using LSDM.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Infrastracture.Persistence.Seeders
{
    public static class ServerRoleSeeder
    {
        public static async Task SeedAsync(IServerRoleRepository serverRoleRepository)
        {
            if(await serverRoleRepository.AnyAsync())
            {
                return;
            }
            var roles = new List<ServerRole>
            {
                new ServerRole { Name = Roles.Owner },
                new ServerRole { Name = Roles.Admin },
                new ServerRole { Name = Roles.Moderator },
                new ServerRole { Name = Roles.Support },
                new ServerRole { Name = Roles.Player }
            };

            await serverRoleRepository.CreateManyAsync(roles);
        }
    }
}
