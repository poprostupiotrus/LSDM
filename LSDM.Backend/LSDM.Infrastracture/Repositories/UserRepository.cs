using LSDM.Domain.Entities;
using LSDM.Domain.Interfaces;
using LSDM.Infrastracture.Persistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Infrastracture.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<LSDMUser> _userManager;
        private readonly LSDMDbContext _context;
        public UserRepository(UserManager<LSDMUser> userManager, LSDMDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }
        public async Task<bool> AnyAsync()
        {
            return await _userManager.Users.AnyAsync();
        }

        public async Task<LSDMUser> CreateAsync(LSDMUser user, string password)
        {
            var result = await _userManager.CreateAsync(user, password);
            if (!result.Succeeded)
            {
                throw new Exception(string.Join(", ", result.Errors.Select(e => e.Description)));
            }
            return user;
        }

        public async Task<LSDMUser?> GetByIdAsync(string id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task AssignServerRole(LSDMUser user, ServerRole role)
        {
            user.ServerRoleId = role.ServerRoleId;
            await _context.SaveChangesAsync();
        }
    }
}
