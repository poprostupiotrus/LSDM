using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Application.Exceptions
{
    public class UserBannedException : Exception
    {
        public UserBannedException(string message) : base(message) { }
    }
}
