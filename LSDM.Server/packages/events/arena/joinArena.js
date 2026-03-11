const arenaManager = require('../../systems/arena/arenaManager');
mp.events.add('server:joinArena', (player, arenaId) => {
    const playerJoined = arenaManager.joinArena(player, arenaId);
    if(playerJoined) {
        player.call("client:playerJoinedArena");
    }
});