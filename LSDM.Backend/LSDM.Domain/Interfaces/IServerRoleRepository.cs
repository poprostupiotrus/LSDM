using LSDM.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Domain.Interfaces
{
    public interface IServerRoleRepository
    {
        Task<ServerRole?> GetServerRoleByName(string name);
        Task<ServerRole> CreateAsync(ServerRole serverRole);
        Task CreateManyAsync(List<ServerRole> serverRoles);
        Task<bool> AnyAsync();
    }
}
