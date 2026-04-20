const { cameraManager } = require('./systems/camera');
const { getPlayerHeadingOffset } = require('./utils/player');
exports.setCameraOnPlayerBody = () => {
    const player = mp.players.local;
    const playerPos = player.position;
    const heading = getPlayerHeadingOffset() * (Math.PI / 180);
    const distance = 3.5;
    const camX = playerPos.x + (Math.sin(-heading) * distance);
    const camY = playerPos.y + (Math.cos(-heading) * distance);
    const camZ = playerPos.z + 0.5;
    const cameraPointsAt = { x: playerPos.x, y: playerPos.y, z: playerPos.z + 0.5 };
    cameraManager.setCameraPosition(camX, camY, camZ);
    cameraManager.setCameraPointsAt(cameraPointsAt.x, cameraPointsAt.y, cameraPointsAt.z);
}
exports.setCameraOnPlayerFace = () => {
    const player = mp.players.local;
    const playerPos = player.position;
    const distance = 0.65;
    const heading = getPlayerHeadingOffset() * (Math.PI / 180);
    const camX = playerPos.x + (Math.sin(-heading) * distance);
    const camY = playerPos.y + (Math.cos(-heading) * distance);
    const camZ = playerPos.z + 0.65;
    cameraManager.setCameraPosition(camX, camY, camZ);
    cameraManager.setCameraPointsAt(playerPos.x, playerPos.y, playerPos.z + 0.65);
}