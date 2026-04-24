const WEAPONS = require('../../config/weapons');
const playerUtils = require('../../utils/playerUtils');
const commandName = "weapons";
mp.events.addCommand(commandName, weaponCommandHandler);

function weaponCommandHandler(player) {
    if(!playerUtils.isPlayerInFreeroam(player)) {
        const message = `Komenda /${commandName} jest dostępna jedynie na trybie freeroam.`;
        player.call('client:showError', [message]);
        return;
    }
    player.call('client:openWeaponsMenu');
}