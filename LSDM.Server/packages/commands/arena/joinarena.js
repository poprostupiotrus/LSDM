const arenaManager = require('../../systems/arena/arenaManager');
const LOCATION_TYPES = require('../../config/locationTypes');
const playerUtils = require('../../utils/playerUtils');

mp.events.addCommand('joinarena', (player, arenaId) => {
    const id = parseInt(arenaId);
    if (isNaN(id)) {
        player.outputChatBox(`!{#ff0000} Użycie: /joinarena [id]`);
        player.outputChatBox(`!{#ffffff} Dostępne areny: /arenas`);
        return;
    }
    if(!playerUtils.isPlayerInLobby(player))
    {
        const message = 'Musisz wrócić do lobby, aby móc wejść do areny.'
        player.call('client:showError', [message]);
        return;
    }
    arenaManager.joinArena(player, id);
});