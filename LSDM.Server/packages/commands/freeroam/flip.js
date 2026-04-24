const playerUtils = require('../../utils/playerUtils');
const COLORS = require('../../config/colors');
const commandName = 'flip';
mp.events.addCommand(commandName, flipCommandHandler);
function flipCommandHandler(player) {
    if(!playerUtils.isPlayerInFreeroam(player)) {
        const message = `Komenda /${commandName} jest dostępna jedynie na trybie freeroam.`;
        player.call('client:showError', [message]);
        return;
    }
    const playerVehicle = player.vehicle;
    if (!playerVehicle) {
        player.outputChatBox(`${COLORS.BLUE}[LSDM:Freeroam] ${COLORS.WHITE}Musisz być w pojeździe, aby móc użyć tej komendy`);
        return;
    }
    playerVehicle.rotation = new mp.Vector3(0, 0, playerVehicle.rotation.z);
    player.outputChatBox(`${COLORS.BLUE}[LSDM:Freeroam] ${COLORS.WHITE}Twój pojazd został obrócony.`);
}