mp.events.addCommand("pm", (player, fullText, playerId, ...message) => {
    if(!playerId || message.length === 0)
    {
        player.outputChatBox("Użycie: /pm id_gracza wiadomosc");
        return;
    }
    playerId = parseInt(playerId);
    /*
    if(player.id === playerId)
    {
        player.outputChatBox("Nie możesz wysłać wiadomości do samego siebie.");
        return;
    }
    */
    const targetPlayer = getPlayerById(playerId);
    if(!targetPlayer)
    {
        player.outputChatBox(`Gracz o ID: ${playerId} nie istnieje`);
        return;
    }
    const msg = message.join(" ").trim();
    if (!msg) {
        player.outputChatBox("Wiadomość nie może być pusta.");
        return;
    }
    targetPlayer.outputChatBox(`~o~[PM od ${player.name}]: ${msg}`);
    player.outputChatBox(`~y~[PM do ${targetPlayer.name}]: ${msg}`);
})

function getPlayerById(playerId) 
{
    return mp.players.at(playerId);
}