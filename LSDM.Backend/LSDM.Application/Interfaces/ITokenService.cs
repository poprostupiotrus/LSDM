using LSDM.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Application.Interfaces
{
    public interface ITokenService
    {
        string GenerateToken(LSDMUser user);
    }
}
