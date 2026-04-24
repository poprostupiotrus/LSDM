const arenaManager = require('../../systems/arena/arenaManager');
mp.events.addCommand('leavearena', (player) => {
    if (arenaManager.leaveArena(player)) {
        return;
    }
    const message = 'Musisz być na arenie, aby móc z niej wyjść.'
    player.call('client:showError', [message]);
});