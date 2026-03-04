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
        private readonly SignInManager<LSDMUser> _signInManager;
        public UserRepository(UserManager<LSDMUser> userManager, LSDMDbContext context, SignInManager<LSDMUser> signInManager)
        {
            _userManager = userManager;
            _context = context;
            _signInManager = signInManager;
        }
        public async Task<List<LSDMUser>> GetAllAsync(int pageNumber, int pageSize, string? username, bool sortByDescending)
        {
            var query = _context.Users.Include(user => user.ServerRole).AsQueryable();
            if(!string.IsNullOrWhiteSpace(username))
            {
                query = query.Where(user => user.UserName.ToLower().Contains(username.ToLower()));
            }
            query = sortByDescending ? query.OrderByDescending(user => user.UserName) : query.OrderBy(user => user.UserName);
            return await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
        }
        public async Task<LSDMUser?> GetByIdAsync(string id)
        {
            return await _context.Users.FindAsync(id);
        }
        public async Task<LSDMUser?> GetByUsernameAsync(string username)
        {
            return await _context.Users.FirstOrDefaultAsync(user => user.UserName == username);
        }
        public async Task<bool> CheckPasswordAsync(LSDMUser user, string password)
        {
            var result = await _signInManager.CheckPasswordSignInAsync(user, password, lockoutOnFailure: true);
            return result.Succeeded;
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

        public async Task AssignServerRole(LSDMUser user, ServerRole role)
        {
            user.ServerRoleId = role.ServerRoleId;
            await _context.SaveChangesAsync();
        }

        public async Task<bool> ExistsByUserNameAsync(string username)
        {
            return await _context.Users.AnyAsync(u => u.UserName.ToLower() == username.ToLower());
        }

        public async Task<bool> AnyAsync()
        {
            return await _userManager.Users.AnyAsync();
        }

        public async Task UpdateLastLoginIdentifiersAsync(LSDMUser user, string socialClubId, string hwid, string ipAddress)
        {
            user.LastSocialClubId = socialClubId;
            user.LastHwid = hwid;
            user.LastIpAddress = ipAddress;
            await _context.SaveChangesAsync();
        }
    }
}
