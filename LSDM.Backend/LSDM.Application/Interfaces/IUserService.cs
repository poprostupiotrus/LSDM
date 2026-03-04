using LSDM.Application.DTOs.User;
using LSDM.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Application.Interfaces
{
    public interface IUserService
    {
        Task<List<UserDto>> GetAllAsync(int pageNumber, int pageSize, string? username, bool sortByDescending);
        Task<string> RegisterAsync(string username, string password, string socialClubId, string hwid, string ipAddress);
        Task<string> LoginAsync(string username, string password, string socialClubId, string hwid, string ipAddress);
    }
}
