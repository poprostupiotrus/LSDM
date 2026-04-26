const arenaManager = require('../../systems/arena/arenaManager');
const LOCATIONS = require('../../config/locations');
const playerUtils = require('../../utils/playerUtils');
const gameEvents = require('../../websockets/events/gameEvents');
mp.events.add('playerDeath', (player, reason, killer) => {
    if(playerUtils.isPlayerInArena(player))
    {
        handlePlayerDeathInArena(player);
    }
    if(playerUtils.isPlayerInFreeroam(player)) {
        handlePlayerDeathInFreeroam(player);
    }
    if(playerUtils.IsKillDeathTracked(player)) {
        if(killer == null) {
            gameEvents.playerDeath(player.runtime.uid);
        } else {
            gameEvents.playerKill(killer.runtime.uid, player.runtime.uid);
        }
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