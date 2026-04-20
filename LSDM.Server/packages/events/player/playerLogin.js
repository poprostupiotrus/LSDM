const authManager = require('../../systems/auth/authManager');
const WORLD_OFFSETS = require('../../config/worldOffsets');
const LOCATION_TYPES = require('../../config/locationTypes');
const LOCATIONS = require('../../config/locations');
const characterMapper = require('../../api/mappers/characterMapper');
const Character = require('../../systems/character_creator/character');
const outfitApi = require('../../api/outfit.api');
mp.events.add('server:playerLogin', async (player, username, password) => {
    if (player.runtime.logged)
        return;
    const result = await authManager.login(player, username, password);
    const success = result.success;
    if(success)
    {
        player.dimension = WORLD_OFFSETS.LOBBY;
        player.runtime.location.type = LOCATION_TYPES.LOBBY;
        player.position = LOCATIONS.LOBBY;
        if(player.runtime.hasOutfit) {
            const characterDataDto = await outfitApi.getUserOutfit(player);
            const characterData = characterMapper.DtoToCharacterData(characterDataDto);
            player.runtime.character = new Character(player, characterData);
        }
    }
    let message = result.message;
    if (result.errors?.length) {
        message += '\n' + result.errors.join('\n');
    }
    player.call('client:loginResult', [success, message])
});