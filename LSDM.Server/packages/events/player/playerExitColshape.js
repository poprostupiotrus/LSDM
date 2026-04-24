const LOCATION_TYPES = require('../../config/locationTypes');
const arenaManager = require('../../systems/arena/arenaManager');
const lobbySystem = require('../../systems/lobby/lobbySystem');
mp.events.add("playerExitColshape", (player, shape) => {
    if(player.runtime.location.type === LOCATION_TYPES.ARENA)
    {
        arenaManager.handleExitArenaArena(player, shape);
    }
    if(shape === lobbySystem.lobbyAreaColShape && player.runtime.location.type === LOCATION_TYPES.LOBBY) {
        lobbySystem.handlePlayerExitLobbyArea(player);
    }
});