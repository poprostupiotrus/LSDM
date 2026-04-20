const authManager = require('../../systems/auth/authManager');
const WORLD_OFFSETS = require('../../config/worldOffsets');
const LOCATION_TYPES = require('../../config/locationTypes');
const LOCATIONS = require('../../config/locations');
const characterCreator = require('../../systems/character_creator/characterCreator');
mp.events.add('server:playerRegister', async (player, username, password) => {
    if (player.runtime.logged)
        return;
    const result = await authManager.register(player, username, password);
    const success = result.success;
    if(success)
    {
        player.dimension = WORLD_OFFSETS.LOBBY;
        player.runtime.location.type = LOCATION_TYPES.LOBBY;
        player.position = LOCATIONS.LOBBY;
    }
    let message = result.message;
    if (result.errors?.length) {
        message += '\n' + result.errors.join('\n');
    }
    player.call('client:registerResult', [success, message])
});