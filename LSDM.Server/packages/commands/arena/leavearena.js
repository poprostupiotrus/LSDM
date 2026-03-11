const arenaManager = require('../../systems/arena/arenaManager');
mp.events.addCommand('leavearena', (player) => {
    if (arenaManager.leaveArena(player)) {
        return;
    }
    player.outputChatBox(`!{#ff0000} Nie jesteś w arenie!`);
});