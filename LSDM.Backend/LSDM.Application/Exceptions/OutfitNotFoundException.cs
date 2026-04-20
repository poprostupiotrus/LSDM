using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Application.Exceptions
{
    public class OutfitNotFoundException : Exception
    {
        public OutfitNotFoundException(string message) : base(message) { }
    }
}
