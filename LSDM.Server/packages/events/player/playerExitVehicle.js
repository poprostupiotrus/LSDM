const freeroamSystem = require('../../systems/freeroam/freeroamSystem');
const playerUtils = require('../../utils/playerUtils');
mp.events.add("playerExitVehicle", (player, vehicle) => {
    if(playerUtils.isPlayerInFreeroam(player))
    {
        freeroamSystem.markUsed(vehicle);
    }
});