const freeroamSystem = require('../../systems/freeroam/freeroamSystem');
const playerUtils = require('../../utils/playerUtils');
mp.events.add("playerStartEnterVehicle", (player, vehicle) => {
    if(playerUtils.isPlayerInFreeroam(player))
    {
        freeroamSystem.markUsed(vehicle);
    }
});