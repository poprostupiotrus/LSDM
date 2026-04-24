const playerUtils = require('../../utils/playerUtils');
const arenaManager = require('../../systems/arena/arenaManager');
mp.events.addCommand("lobby", lobbyCommandHandler);

function lobbyCommandHandler(player) {
    if(playerUtils.isPlayerInLobby(player)) {
        const message = 'Jesteś aktualnie w poczekalni.'
        player.call('client:showWarning', [message]);
        return;
    }
    if(playerUtils.isPlayerInArena(player)) {
        arenaManager.leaveArena(player);
        return;
    }
    if(playerUtils.isPlayerInFreeroam(player)) {
        playerUtils.teleportPlayerToLobby(player);
        delete player.runtime.freeroamData;
    }
}