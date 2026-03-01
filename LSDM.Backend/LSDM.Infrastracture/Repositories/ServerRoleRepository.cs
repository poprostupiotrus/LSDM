using LSDM.Domain.Entities;
using LSDM.Domain.Interfaces;
using LSDM.Infrastracture.Persistence;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Infrastracture.Repositories
{
    public class ServerRoleRepository : IServerRoleRepository
    {
        private readonly LSDMDbContext _context;
        public ServerRoleRepository(LSDMDbContext context)
        {
            _context = context;
        }
        public async Task<ServerRole?> GetServerRoleByName(string name)
        {
            return await _context.ServerRoles.FirstOrDefaultAsync(sr => sr.Name == name);
        }
        public async Task<ServerRole> CreateAsync(ServerRole serverRole)
        {
            await _context.ServerRoles.AddAsync(serverRole);
            await _context.SaveChangesAsync();
            return serverRole;
        }
        public async Task CreateManyAsync(List<ServerRole> serverRoles)
        {
            await _context.ServerRoles.AddRangeAsync(serverRoles);
            await _context.SaveChangesAsync();
        }
        public async Task<bool> AnyAsync()
        {
            return await _context.ServerRoles.AnyAsync();
        }
    }
}
