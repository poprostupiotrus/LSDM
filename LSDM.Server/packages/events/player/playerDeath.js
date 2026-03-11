const arenaManager = require('../../systems/arena/arenaManager');
const LOCATION_TYPES = require('../../config/locationTypes');
mp.events.add('playerDeath', (player, reason, killer) => {
    if(player.runtime.location.type === LOCATION_TYPES.ARENA)
    {
        arenaManager.handlePlayerDeath(player);
    }
});