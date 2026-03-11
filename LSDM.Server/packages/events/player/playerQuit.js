const LOCATION_TYPES = require('../../config/locationTypes');
const arenaManager = require('../../systems/arena/arenaManager');
mp.events.add("playerQuit", (player) => {
    console.log(player.runtime.location.type);
    if(player.runtime.location.type === LOCATION_TYPES.ARENA)
    {
        arenaManager.handlePlayerQuit(player);
    }
});