const playerUtils = require('../../utils/playerUtils');
const COLORS = require('../../config/colors');
const teleportCommandName = 'tp';
const acceptTeleportCommandName = 'tpaccept'
const pendingTeleportRequest = new Map();
mp.events.addCommand(teleportCommandName, teleportCommandHandler);
mp.events.addCommand(acceptTeleportCommandName, teleportAcceptCommandHandler)
function teleportCommandHandler(player, fullText, id) {
    if(!playerUtils.isPlayerInFreeroam(player)) {
        const message = `Komenda /${teleportCommandName} jest dostępna jedynie na trybie freeroam.`;
        player.call('client:showError', [message]);
        return;
    }
    if(!id) {
        player.outputChatBox(`${COLORS.BLUE}[LSDM:Freeroam] ${COLORS.WHITE}Użycie /${teleportCommandName} [id gracza]`);
        return;
    }
    const playerId = parseInt(id);
    if (isNaN(playerId)) {
        player.outputChatBox(`${COLORS.BLUE}[LSDM:Freeroam] ${COLORS.WHITE}Użycie /${teleportCommandName} [id gracza]`);
        return;
    }
    const targetPlayer = playerUtils.getPlayerById(id);
    if(!targetPlayer)
    {
        player.outputChatBox(`${COLORS.BLUE}[LSDM:Freeroam] ${COLORS.WHITE}Gracz o ID: ${playerId} nie istnieje.`);
        return;
    }
    if(targetPlayer.id === player.id) {
        player.outputChatBox(`${COLORS.BLUE}[LSDM:Freeroam] ${COLORS.WHITE}Nie możesz wysłać prośby o teleportacje do samego siebie.`)
        return;
    }
    if(!playerUtils.isPlayerInFreeroam(targetPlayer)) {
        player.outputChatBox(`${COLORS.BLUE}[LSDM:Freeroam] ${COLORS.WHITE}Gracz ${targetPlayer.name} nie jest aktualnie w trybie freeroam.`)
        return;
    }
    if(pendingTeleportRequest.has(player.id)) {
        player.outputChatBox(`${COLORS.BLUE}[LSDM:Freeroam] ${COLORS.WHITE}Wysłałeś już prośbe o teleportacje do gracza. Musisz chwile odczekać.`);
        return;
    }
    player.outputChatBox(`${COLORS.BLUE}[LSDM:Freeroam] ${COLORS.WHITE}Wysłałeś prośbę o teleportacje do gracza ${targetPlayer.name}`);
    targetPlayer.outputChatBox(`${COLORS.BLUE}[LSDM:Freeroam] ${COLORS.WHITE}Dostałeś prośbę o teleportacje od gracza ${player.name}. Aby zaakceptować prośbę użyj komendy: /${acceptTeleportCommandName} ${player.id}`);
    pendingTeleportRequest.set(player.id, targetPlayer.id);
    setTimeout(() => {
        pendingTeleportRequest.delete(player.id);
    }, 8000);
}
function teleportAcceptCommandHandler(player, fullText, id) {
    if(!playerUtils.isPlayerInFreeroam(player)) {
        const message = `Komenda /${teleportCommandName} jest dostępna jedynie na trybie freeroam.`;
        player.call('client:showError', [message]);
        return;
    }
    if(!id) {
        player.outputChatBox(`${COLORS.BLUE}[LSDM:Freeroam] ${COLORS.WHITE}Użycie /${teleportCommandName} [id gracza]`);
        return;
    }
    const playerId = parseInt(id);
    if (isNaN(playerId)) {
        player.outputChatBox(`${COLORS.BLUE}[LSDM:Freeroam] ${COLORS.WHITE}Użycie /${teleportCommandName} [id gracza]`);
        return;
    }
    const targetPlayer = playerUtils.getPlayerById(id);
    if(!targetPlayer)
    {
        player.outputChatBox(`${COLORS.BLUE}[LSDM:Freeroam] ${COLORS.WHITE}Gracz o ID: ${playerId} nie istnieje.`);
        return;
    }
    if(pendingTeleportRequest.get(playerId) !== player.id) {
        player.outputChatBox(`${COLORS.BLUE}[LSDM:Freeroam] ${COLORS.WHITE}Nie otrzymałeś prośby teleportacji od gracza o ID:${playerId}`);
        return;
    }
    targetPlayer.spawn(player.position);
    player.outputChatBox(`${COLORS.BLUE}[LSDM:Freeroam] ${COLORS.WHITE}Zaakceptowałeś prośbę o teleportacje od gracza ${targetPlayer.name}`);
    targetPlayer.outputChatBox(`${COLORS.BLUE}[LSDM:Freeroam] ${COLORS.WHITE}Gracz ${player.name} zaakceptował prośbę o teleportacje.`);
    pendingTeleportRequest.delete(targetPlayer.id);
}