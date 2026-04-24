const playerUtils = require('../../utils/playerUtils');
const COLORS = require('../../config/colors');
const commandName = 'cw';
mp.events.addCommand("cw", clearWeaponsCommandHandler);
function clearWeaponsCommandHandler(player) {
    if(!playerUtils.isPlayerInFreeroam(player)) {
        const message = `Komenda /${commandName} jest dostępna jedynie na trybie freeroam.`;
        player.call('client:showError', [message]);
        return;
    }
    player.removeAllWeapons();
    player.outputChatBox(`${COLORS.BLUE}[LSDM:Freeroam] ${COLORS.WHITE}Usunięto wszystkie twoje bronie.`);
}