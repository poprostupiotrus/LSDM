mp.events.addCommand("car", (player, fullText, vehicleName) => {
    if (!vehicleName) {
        player.outputChatBox("Użycie: /car [nazwa pojazdu]");
        return;
    }
    const pos = player.position;
    const heading = player.heading;
    const vehicle = mp.vehicles.new(mp.joaat(vehicleName), new mp.Vector3(pos.x + 5, pos.y, pos.z), {
        heading: heading,
        numberPlate: "RAGEMP",
        dimension: player.dimension
    });
    const driverSeat = 0;
    player.putIntoVehicle(vehicle, driverSeat);
    player.outputChatBox(`Pojazd ${vehicleName} został zespawnowany!`);
});