using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Application.Events
{
    public class EventDispatcher
    {
        private readonly Dictionary<string, IGameEventHandler> _handlers;

        public EventDispatcher(IEnumerable<IGameEventHandler> handlers)
        {
            _handlers = handlers.ToDictionary(h => h.EventName);
        }

        public async Task DispatchAsync(WsMessage message)
        {
            Console.WriteLine("DispatchAsync");
            if (_handlers.TryGetValue(message.Event, out var handler))
            {
                Console.WriteLine("Handler");
                await handler.Handle(message);
            }
            else
            {
                Console.WriteLine($"No handler for event: {message.Event}");
            }
        }
    }
}
