const COLORS = require('../../config/colors');
const playerUtils = require('../../utils/playerUtils');
mp.events.addCommand("pm", privateMessageHandler);

function privateMessageHandler(player, fullText, playerId, ...message) {
    if(!playerId || message.length === 0)
    {
        player.outputChatBox("Użycie: /pm id_gracza wiadomosc.");
        return;
    }
    const id = parseInt(playerId);
    if (isNaN(id)) {
        player.outputChatBox("Podano nieprawidłowe ID gracza.");
        return;
    }
    if(player.id === id)
    {
        player.outputChatBox("Nie możesz wysłać wiadomości do samego siebie.");
        return;
    }
    const targetPlayer = playerUtils.getPlayerById(id);
    if(!targetPlayer)
    {
        player.outputChatBox(`Gracz o ID: ${id} nie istnieje.`);
        return;
    }
    const msg = message.join(" ").trim();
    if (!msg) {
        player.outputChatBox("Wiadomość nie może być pusta.");
        return;
    }
    targetPlayer.outputChatBox(`${COLORS.ORANGE}[PM od ${player.name}(${player.id})]: ${msg}`);
    player.outputChatBox(`${COLORS.YELLOW}[PM do ${targetPlayer.name}(${targetPlayer.id})]: ${msg}`);
}
