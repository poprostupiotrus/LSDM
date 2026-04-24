const playerUtils = require('../../utils/playerUtils');
const COLORS = require('../../config/colors');
const commandName = 'spadochron';
mp.events.addCommand(commandName, parachuteCommandHandler);
function parachuteCommandHandler(player) {
    if(!playerUtils.isPlayerInFreeroam(player)) {
        const message = `Komenda /${commandName} jest dostępna jedynie na trybie freeroam.`;
        player.call('client:showError', [message]);
        return;
    }
    player.giveWeapon(mp.joaat("GADGET_PARACHUTE"), 1);
    player.outputChatBox(`${COLORS.BLUE}[LSDM:Freeroam] ${COLORS.WHITE}Dostałeś spadochron.`);
}