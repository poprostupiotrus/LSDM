const LOCATION_TYPES = require('../../config/locationTypes');
const arenaManager = require('../../systems/arena/arenaManager');
mp.events.add("playerExitColshape", (player, shape) => {
    if(player.runtime.location.type === LOCATION_TYPES.ARENA)
    {
        arenaManager.handleExitArenaArena(player, shape);
    }
});