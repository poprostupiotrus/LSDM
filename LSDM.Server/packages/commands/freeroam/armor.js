const playerUtils = require('../../utils/playerUtils');
const COLORS = require('../../config/colors');
const commandName = 'armor'
mp.events.addCommand(commandName, handleHealthPointsCommand)
function handleHealthPointsCommand(player, fullText, armorPoints) {
    if(!playerUtils.isPlayerInFreeroam(player)) {
        const message = `Komenda /${commandName} jest dostępna jedynie na trybie freeroam.`;
        player.call('client:showError', [message]);
        return;
    }
    if(!armorPoints) {
        const message = `${COLORS.BLUE}[LSDM:Freeroam] ${COLORS.WHITE}Użycie: /${commandName} [ilość punktów]`
        player.outputChatBox(message);
        return;
    }
    const armorPointsAmount = parseInt(armorPoints);
    if (isNaN(armorPointsAmount)) {
        player.outputChatBox(`${COLORS.BLUE}[LSDM:Freeroam] ${COLORS.WHITE} Podano nieprawidłową ilość punktów`);
        return;
    }
    player.armour = armorPointsAmount;
    player.outputChatBox(`${COLORS.BLUE}[LSDM:Freeroam] ${COLORS.WHITE} Ustawiono ilość armor na ${armorPointsAmount}`);
}