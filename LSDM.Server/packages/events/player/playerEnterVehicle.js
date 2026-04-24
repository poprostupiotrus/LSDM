const freeroamSystem = require('../../systems/freeroam/freeroamSystem');
const playerUtils = require('../../utils/playerUtils');
mp.events.add("playerEnterVehicle", (player, vehicle) => {
    if(playerUtils.isPlayerInFreeroam(player))
    {
        freeroamSystem.markUsed(vehicle);
    }
});