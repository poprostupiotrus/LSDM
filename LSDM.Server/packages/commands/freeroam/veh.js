const playerUtils = require('../../utils/playerUtils');
const COLORS = require('../../config/colors');
const freeroamSystem = require('../../systems/freeroam/freeroamSystem');
const commandName = "veh"
mp.events.addCommand(commandName, vehCommandHandler);
function vehCommandHandler(player, fullText, vehicleName) {
    if(!playerUtils.isPlayerInFreeroam(player)) {
        const message = `Komenda /${commandName} jest dostępna jedynie na trybie freeroam.`;
        player.call('client:showError', [message]);
        return;
    }
    if (!vehicleName) {
        player.outputChatBox(`${COLORS.BLUE}[LSDM:Freeroam] ${COLORS.WHITE}Użycie: /${commandName} [nazwa pojazdu]`);
        return;
    }
    const pos = player.position;
    const heading = player.heading;
    const vehicle = mp.vehicles.new(mp.joaat(vehicleName), new mp.Vector3(pos.x + 5, pos.y, pos.z), {
        heading: heading,
        numberPlate: "LSDM",
        dimension: player.dimension
    });
    const driverSeat = 0;
    player.putIntoVehicle(vehicle, driverSeat);
    player.outputChatBox(`${COLORS.BLUE}[LSDM:Freeroam] ${COLORS.WHITE}Pojazd ${vehicleName} został zespawnowany!`);
    freeroamSystem.addVehicle(vehicle);
}