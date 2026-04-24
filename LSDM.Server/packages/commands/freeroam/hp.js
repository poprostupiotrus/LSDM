const playerUtils = require('../../utils/playerUtils');
const COLORS = require('../../config/colors');
const commandName = 'hp'
mp.events.addCommand(commandName, handleArmorCommand);
function handleArmorCommand(player, fullText, healthPoints) {
    if(!playerUtils.isPlayerInFreeroam(player)) {
        const message = `Komenda /${commandName} jest dostępna jedynie na trybie freeroam.`;
        player.call('client:showError', [message]);
        return;
    }
    if(!healthPoints) {
        const message = `${COLORS.BLUE}[LSDM:Freeroam] ${COLORS.WHITE}Użycie: /${commandName} [ilość punktów życia]`
        player.outputChatBox(message);
        return;
    }
    const healthPointsAmount = parseInt(healthPoints);
    if (isNaN(healthPointsAmount)) {
        player.outputChatBox(`${COLORS.BLUE}[LSDM:Freeroam] ${COLORS.WHITE} Podano nieprawidłową ilość punktów życia`);
        return;
    }
    player.health = healthPointsAmount;
    player.outputChatBox(`${COLORS.BLUE}[LSDM:Freeroam] ${COLORS.WHITE} Ustawiono ilość HP na ${healthPointsAmount}`);
}