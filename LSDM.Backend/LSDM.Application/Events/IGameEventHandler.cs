using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Application.Events
{
    public interface IGameEventHandler
    {
        string EventName { get; }
        Task Handle(WsMessage message);
    }
}
