const arenaManager = require('../../systems/arena/arenaManager');
const LOCATIONS = require('../../config/locations');
const playerUtils = require('../../utils/playerUtils');
mp.events.add('playerDeath', (player, reason, killer) => {
    if(playerUtils.isPlayerInArena(player))
    {
        handlePlayerDeathInArena(player);
        return;
    }
    if(playerUtils.isPlayerInFreeroam(player)) {
        handlePlayerDeathInFreeroam(player);
    }
});

function handlePlayerDeathInArena(player) {
    arenaManager.handlePlayerDeath(player);
}
function handlePlayerDeathInFreeroam(player) {
    const saveRespawnEnabled = player.runtime.freeroamData.saveRespawn
    const respawnTimeout = 2000;
    if(saveRespawnEnabled) {
        setTimeout(() => { player.spawn(player.position); }, respawnTimeout);
        return;
    }
    setTimeout(() => { player.spawn(LOCATIONS.FREEROAM); }, respawnTimeout);
}