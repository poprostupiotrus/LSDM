const arenaManager = require('../../systems/arena/arenaManager');
const playerUtils = require('../../utils/playerUtils');
mp.events.addCommand('arenas', handleOpenArenaMenu);
function handleOpenArenaMenu(player) {
    if(!playerUtils.isPlayerInLobby(player)) {
        const message = 'Musisz być w lobby, aby móc wyświetlić liste aren.'
        player.call('client:showError', [message]);
        return;
    }
    const arenas = arenaManager.getStats();
    player.call('client:openArenaMenu', [arenas]);
}
module.exports = { handleOpenArenaMenu };
