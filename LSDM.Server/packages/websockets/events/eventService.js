const webSocketClient = require('../websocket.client');
class EventService {
    emit(event, data) {
        webSocketClient.sendEvent(event, data);
    }
}

module.exports = new EventService();