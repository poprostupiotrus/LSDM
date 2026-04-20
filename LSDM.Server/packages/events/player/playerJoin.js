const LOCATION_TYPES = require('../../config/locationTypes');
const WORLD_OFFSETS = require('../../config/worldOffsets');
const playerUtils = require('../../utils/playerUtils');
const characterUtils = require('../../utils/characterUtils');
const Character = require('../../systems/character_creator/character');
mp.events.add("playerJoin", (player) => {
    const characterData = characterUtils.getDefaultCharacterData();
    player.runtime = {
        token: null,
        logged: false,
        location: { type: LOCATION_TYPES.NONE },
        character: new Character(player, characterData),
        flyMode: false
    };
    player.dimension = WORLD_OFFSETS.AUTH + player.id;
    const camPos = new mp.Vector3(-485, 1095.75, 323.85)
    const camRotation = new mp.Vector3(0, 0, 0);
    const camPointsAt = new mp.Vector3(402.8664, -996.4108, -98.5);
    const camFov = 40;
    const camName = 'AUTH_CAMERA'
    const cameraConfig = {
        name: camName,
        position: camPos,
        fov: camFov,
        rotation: camRotation,
        pointsAt: camPointsAt
    }
    const distance = 2;
    const rad = camRotation.z * Math.PI / 180;
    player.position = new mp.Vector3(
        camPos.x - Math.sin(rad) * distance,
        camPos.y + Math.cos(rad) * distance,
        camPos.z);
    const hour = 23;
    const minute = 0;
    player.call('client:createCamera', [cameraConfig]);
    player.call("client:setTime", [hour,minute]);
    player.call('client:openAuthForm');
});