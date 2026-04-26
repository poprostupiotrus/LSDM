using System;
using System.Text;
using System.Text.Json;
using System.Net.WebSockets;
using LSDM.Application.Events;
using LSDM.Domain.Interfaces;

namespace LSDM.Infrastracture.WebSockets
{
    public class WsConnectionHandler
    {
        private readonly EventDispatcher _dispatcher;
        private readonly IProcessedEventRepository _processedEventRepository;

        public WsConnectionHandler(EventDispatcher dispatcher, IProcessedEventRepository processedEventRepository)
        {
            _dispatcher = dispatcher;
            _processedEventRepository = processedEventRepository;
        }

        public async Task Handle(WebSocket socket)
        {
            while (socket.State == WebSocketState.Open)
            {
                var message = await Receive(socket);
                if (message == null)
                {
                    await socket.CloseAsync(
                        WebSocketCloseStatus.NormalClosure,
                        "Closed",
                        CancellationToken.None
                    );
                    break;
                }

                try
                {
                    var wsMessage = JsonSerializer.Deserialize<WsMessage>(message);
                    if (wsMessage == null || string.IsNullOrWhiteSpace(wsMessage.Event))
                        continue;
                    var isFirstTime = await _processedEventRepository.TryInsertAsync(wsMessage.Id);
                    if (!isFirstTime) continue;
                    await _dispatcher.DispatchAsync(wsMessage);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"WS error: {ex.Message}");
                }
            }
        }

        private async Task<string?> Receive(WebSocket socket)
        {
            var buffer = new byte[4096];
            using var ms = new MemoryStream();

            WebSocketReceiveResult result;

            do
            {
                result = await socket.ReceiveAsync(
                    new ArraySegment<byte>(buffer),
                    CancellationToken.None
                );

                if (result.MessageType == WebSocketMessageType.Close)
                    return null;

                ms.Write(buffer, 0, result.Count);

            } while (!result.EndOfMessage);

            return Encoding.UTF8.GetString(ms.ToArray());
        }
    }
}
