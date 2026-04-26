const WORLD_OFFSETS = require('../config/worldOffsets');
const LOCATIONS = require('../config/locations');
const LOCATION_TYPES = require('../config/locationTypes');
const ROLES = require('../config/roles');
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
        player.removeAllWeapons();
        player.spawn(LOCATIONS.LOBBY);
        player.runtime.location = {};
        player.runtime.location.type = LOCATION_TYPES.LOBBY;
        player.dimension = WORLD_OFFSETS.LOBBY;
    }
    getPlayersInDimension(dimension) {
        const result = [];
        mp.players.forEach((player) => {
            if (player.dimension === dimension) {
                result.push(player);
            }
        });
        return result;
    }
    getAdmins() {
        const admins = [];
        mp.players.forEach((player) => {
            if (player.runtime.role !== ROLES.PLAYER) {
                admins.push(player);
            }
        });
        return admins;
    }
    isPlayerInLobby(player) {
        return player.runtime.location.type === LOCATION_TYPES.LOBBY;
    }
    isPlayerInFreeroam(player) {
        return player.runtime.location.type === LOCATION_TYPES.FREEROAM
    }
    isPlayerInCharacterCreator(player) {
        return player.runtime.location.type === LOCATION_TYPES.CHARACTER_CREATOR;
    }
    isPlayerInArena(player) {
        return player.runtime.location.type === LOCATION_TYPES.ARENA;
    }
    isPlayerInGangWar(player) {
        return player.runtime.location.type === LOCATION_TYPES.GANG_WAR;
    }
    isPlayerInDuel(player) {
        return player.runtime.location.type === LOCATION_TYPES.DUEL;
    }
    IsKillDeathTracked(player) {
        return this.isPlayerInArena(player) || this.isPlayerInGangWar(player) || this.isPlayerInDuel(player);
    }
}
module.exports = new PlayerUtils();