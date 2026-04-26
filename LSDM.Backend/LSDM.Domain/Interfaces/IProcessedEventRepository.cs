using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Domain.Interfaces
{
    public interface IProcessedEventRepository
    {
        public Task<bool> TryInsertAsync(string eventId);
        public Task RemoveOlderThanAsync(DateTime date);
    }
}
