const WORLD_OFFSETS = require("../../config/worldOffsets");
const vehicleUtils = require('../../utils/vehicleUtils');
const timeUtils = require('../../utils/timeUtils');
const COLORS = require('../../config/colors');
const playerUtils = require('../../utils/playerUtils');

class FreeroamSystem {
    constructor() {
        this.vehicles = new Map();
        this.VEHICLE_LIFETIME = timeUtils.minutesToMiliseconds(5);
        this.CHECK_INTERVAL = timeUtils.minutesToMiliseconds(10);
        setInterval(() => {
            this.removeUnusedVehicles();
        }, this.CHECK_INTERVAL);
    }

    addVehicle(vehicle) {
        this.vehicles.set(vehicle.id, {
            vehicle,
            lastUsed: Date.now()
        });
    }

    markUsed(vehicle) {
        const data = this.vehicles.get(vehicle.id);
        if (data) {
            data.lastUsed = Date.now();
        }
    }

    removeUnusedVehicles() {
        const now = Date.now();

        for (const [id, data] of this.vehicles) {
            const veh = data.vehicle;

            if (!veh || !mp.vehicles.exists(veh)) {
                this.vehicles.delete(id);
                continue;
            }

            if (veh.getOccupants().length > 0) {
                data.lastUsed = now;
                continue;
            }

            if (now - data.lastUsed > this.VEHICLE_LIFETIME) {
                veh.destroy();
                this.vehicles.delete(id);
            }
        }
        const message = `${COLORS.BLUE}[LSDM:Freeroam] ${COLORS.WHITE}Wszystkie nieużywane pojazdy zostały usunięte.`;
        this.sendMessageToAllPlayersInFreeroam(message);
    }
    sendMessageToAllPlayersInFreeroam(message) {
        const players = playerUtils.getPlayersInDimension(WORLD_OFFSETS.FREEROAM);
        players.forEach((player) => {
            player.outputChatBox(message);
        });
    }
}

module.exports = new FreeroamSystem();