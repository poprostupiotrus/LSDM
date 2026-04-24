class VehicleUtils {
    getVehicleById(vehicleId) {
        return mp.vehicles.at(vehicleId);
    }
}
module.exports = new VehicleUtils();