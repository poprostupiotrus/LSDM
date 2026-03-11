const arenaManager = require('../../systems/arena/arenaManager');
const LOCATION_TYPES = require('../../config/locationTypes');

mp.events.addCommand('joinarena', (player, arenaId) => {
    const id = parseInt(arenaId);
    if (isNaN(id)) {
        player.outputChatBox(`!{#ff0000} Użycie: /joinarena [id]`);
        player.outputChatBox(`!{#ffffff} Dostępne areny: /arenas`);
        return;
    }
    if(player.runtime.location.type === LOCATION_TYPES.ARENA)
    {
        player.outputChatBox(`Musisz wrócić do lobby, aby móc wejść do areny.`)
        return;
    }
    arenaManager.joinArena(player, id);
});