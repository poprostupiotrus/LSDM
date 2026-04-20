const LOCATIONS = require('../../config/locations');
mp.events.addCommand("spawn", (player, fullText, x, y, z) => {
    player.spawn(LOCATIONS.CHARACTER_CREATOR);
});
mp.events.addCommand("setpos", (player, fullText, x, y, z) => {
    const cordX = parseFloat(x);
    const cordY = parseFloat(y);
    const cordZ = parseFloat(z);
    player.outputChatBox(`${cordX}, ${cordY}, ${cordZ}`);
    player.position = new mp.Vector3(cordX, cordY, cordZ);
});