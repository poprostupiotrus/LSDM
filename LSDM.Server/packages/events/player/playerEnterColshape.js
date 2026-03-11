const LOCATION_TYPES = require('../../config/locationTypes');
const arenaManager = require('../../systems/arena/arenaManager');
mp.events.add("playerEnterColshape", (player, shape) => {
    if(player.runtime.location.type === LOCATION_TYPES.ARENA)
    {
        arenaManager.handleEnterArenaArena(player, shape);
    }
});