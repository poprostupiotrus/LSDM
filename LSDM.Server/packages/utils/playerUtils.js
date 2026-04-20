const WORLD_OFFSETS = require('../config/worldOffsets');
const LOCATIONS = require('../config/locations');
const LOCATION_TYPES = require('../config/locationTypes');
class PlayerUtils
{
    getPlayerById(playerId)
    {
        return mp.players.at(playerId);
    }
    playerExists(playerId)
    {
        return mp.players.exists(playerId);
    }
    setPlayerHealthAndArmour(player, health, armour)
    {
        player.health = health;
        player.armour = armour;
    }
    teleportPlayerToLobby(player) {
        player.spawn(LOCATIONS.LOBBY);
        player.runtime.location.type = LOCATION_TYPES.LOBBY;
        player.dimension = WORLD_OFFSETS.LOBBY;
    }
}
module.exports = new PlayerUtils();