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
        Task<LSDMUser?> GetByIdAsync(string id);
        Task<bool> AnyAsync();
        Task<LSDMUser> CreateAsync(LSDMUser user, string password);
        Task AssignServerRole(LSDMUser user, ServerRole role);
    }
}
