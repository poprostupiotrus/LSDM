const playerUtils = require('../../utils/playerUtils');
const COLORS = require('../../config/colors');
const commandName = 'zapiszrespawn'
mp.events.addCommand(commandName, handleSaveRespawnCommand);
function handleSaveRespawnCommand(player) {
    if(!playerUtils.isPlayerInFreeroam(player)) {
        const message = `Komenda /${commandName} jest dostępna jedynie na trybie freeroam.`;
        player.call('client:showError', [message]);
        return;
    }
    const saveRespawnEnabled = !player.runtime.freeroamData.saveRespawn
    player.runtime.freeroamData.saveRespawn = saveRespawnEnabled;
    if(saveRespawnEnabled) {
        player.outputChatBox(`${COLORS.BLUE}[LSDM:Freeroam] ${COLORS.WHITE} Twoja pozycja śmierci będzie zapisana po respawnie`);
    } else {
        player.outputChatBox(`${COLORS.BLUE}[LSDM:Freeroam] ${COLORS.WHITE} Twoja pozycja śmierci nie będzie zapisana po respawnie`);
    }
}