const LOCATIONS = require('../../config/locations');
mp.events.addCommand("spawn", spawnCommandHandler);
function spawnCommandHandler(player, fullText, x, y, z) {
    const cordX = parseFloat(x);
    const cordY = parseFloat(y);
    const cordZ = parseFloat(z);
    player.outputChatBox(`X:${cordX}, Y:${cordY}, Z:${cordZ}`);
    player.spawn(mp.Vector3(cordX, cordY, cordZ));
}