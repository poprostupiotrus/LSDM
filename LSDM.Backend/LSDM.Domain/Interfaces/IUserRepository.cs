using LSDM.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Domain.Interfaces
{
    public interface IUserRepository
    {
        Task<List<LSDMUser>> GetAllAsync(int pageNumber, int pageSize, string? username, bool sortByDescending);
        Task<LSDMUser?> GetByIdAsync(string id);
        Task<LSDMUser?> GetByUsernameAsync(string username);
        Task<bool> CheckPasswordAsync(LSDMUser user, string password);
        Task<bool> AnyAsync();
        Task<LSDMUser> CreateAsync(LSDMUser user, string password);
        Task UpdateLastLoginIdentifiersAsync(LSDMUser user, string socialClubId, string hwid, string ipAddress);
        Task AssignServerRole(LSDMUser user, ServerRole role);
        Task<bool> ExistsByUserNameAsync(string username);
        Task<bool> ExistsAsync(string userId);
    }
}
