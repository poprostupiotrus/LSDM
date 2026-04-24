const playerUtils = require('../../utils/playerUtils');
const COLORS = require('../../config/colors');
const commandName = "napraw"
mp.events.addCommand(commandName, fixCommandHandler);
function fixCommandHandler(player) {
    if(!playerUtils.isPlayerInFreeroam(player)) {
        const message = `Komenda /${commandName} jest dostępna jedynie na trybie freeroam.`;
        player.call('client:showError', [message]);
        return;
    }
    const playerVehicle = player.vehicle;
    if(!playerVehicle) {
        player.outputChatBox(`${COLORS.BLUE}[LSDM:Freeroam] ${COLORS.WHITE}Musisz być w pojeździe, aby móc użyć tej komendy`);
    }
    playerVehicle.repair();
    player.outputChatBox(`${COLORS.BLUE}[LSDM:Freeroam] ${COLORS.WHITE}Twój pojazd został naprawiony.`);
}