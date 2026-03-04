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
            if(string.IsNullOrWhiteSpace(password))
            {
                throw new InvalidOperationException("OWNER_PASSWORD musi być ustawione");
            }
            var username = config["OWNER_USERNAME"];
            if (string.IsNullOrWhiteSpace(username))
            {
                throw new InvalidOperationException("OWNER_USERNAME musi być ustawione");
            }
            var socialClubId = config["OWNER_SOCIALCLUB_ID"];
            if (string.IsNullOrWhiteSpace(socialClubId))
            {
                throw new InvalidOperationException("OWNER_SOCIALCLUB_ID musi być ustawione");
            }
            var hwid = config["OWNER_HWID"];
            if (string.IsNullOrWhiteSpace(hwid))
            {
                throw new InvalidOperationException("OWNER_HWID musi być ustawione");
            }
            var ipAddress = config["OWNER_IP"];
            if (string.IsNullOrWhiteSpace(ipAddress))
            {
                throw new InvalidOperationException("OWNER_IP musi być ustawione");
            }
            var ownerUser = new LSDMUser
            {
                UserName = config["OWNER_USERNAME"],
                ServerRoleId = serverRole.ServerRoleId,
                LastSocialClubId = socialClubId,
                LastHwid = hwid,
                LastIpAddress = ipAddress
            };
            var createdUser = await userRepository.CreateAsync(ownerUser, password);
        }
    }
}
