const EVENTS = require('./events');
const eventService = require('./eventService');
class GameEvents {
    playerKill(killerId, victimId) {
        eventService.emit(EVENTS.PLAYER_KILL, {
            killerId,
            victimId
        });
    }
    playerDeath(playerId) {
        eventService.emit(EVENTS.PLAYER_DEATH, {
            playerId
        });
    }
}

module.exports = new GameEvents();