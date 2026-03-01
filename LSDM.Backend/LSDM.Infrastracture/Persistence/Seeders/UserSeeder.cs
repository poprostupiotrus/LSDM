using LSDM.Application.Authorization;
using LSDM.Domain.Entities;
using LSDM.Domain.Interfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Infrastracture.Persistence.Seeders
{
    public class UserSeeder
    {
        public static async Task SeedOwnerAsync(IUserRepository userRepository, IServerRoleRepository roleRepository, IConfiguration config)
        {
            var serverRole = await roleRepository.GetServerRoleByName(Roles.Owner);
            if (serverRole == null)
            {
                throw new Exception($"Nie odnaleziono ServerRole o nazwie {serverRole}");
            }
            if (await userRepository.AnyAsync())
                return;
            var password = config["OWNER_PASSWORD"];
            var ownerUser = new LSDMUser
            {
                UserName = config["OWNER_USERNAME"],
                ServerRoleId = serverRole.ServerRoleId
            };
            var createdUser = await userRepository.CreateAsync(ownerUser, password);
        }
    }
}
