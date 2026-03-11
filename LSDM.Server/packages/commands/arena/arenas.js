const arenaManager = require('../../systems/arena/arenaManager');
mp.events.addCommand('arenas', (player) => {
    const arenas = arenaManager.getStats();
    player.call('client:openArenaMenu', [arenas]);
});