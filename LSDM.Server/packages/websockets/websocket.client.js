const WebSocket = require("ws");
const { v4: uuid } = require("uuid");

class WebSocketClient {
    constructor(url) {
        this.url = url;
        this.connect();
    }
    connect() {
        this.ws = new WebSocket(this.url);
        this.ws.on("open", () => {
            console.log("[WS] connected");
        });
        this.ws.on("close", () => {
            console.log("[WS] reconnecting...");
            setInterval(() => this.connect(), 2000);
        });
    }

    sendEvent(event, data) {
        const payload = {
            id: uuid(),
            event,
            data
        };
        if (this.ws.readyState === 1) {
            this.ws.send(JSON.stringify(payload));
        }
    }
}

module.exports = new WebSocketClient(process.env.WEBSOCKET_URL);