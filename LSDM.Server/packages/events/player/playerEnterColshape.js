const LOCATION_TYPES = require('../../config/locationTypes');
const arenaManager = require('../../systems/arena/arenaManager');
const lobbySystem = require('../../systems/lobby/lobbySystem');
mp.events.add("playerEnterColshape", (player, shape) => {
    if(player.runtime.location.type === LOCATION_TYPES.ARENA)
    {
        arenaManager.handleEnterArenaArena(player, shape);
        return;
    }
    if(player.runtime.location.type === LOCATION_TYPES.LOBBY) {
        lobbySystem.handlePlayerEnterLobbyColshape(player, shape);
    }
});