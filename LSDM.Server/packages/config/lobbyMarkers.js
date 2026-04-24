const { handleOpenArenaMenu } = require('../commands/arena/arenas');
const { handleOpenCharacterCreator } = require('../commands/characterCreator/characterCreator');
const { handleEnterFreeroam } = require('../commands/player/freeroam');
const LOBBY_MARKERS = [
    {
        position: new mp.Vector3(-1370.2939453125, 344.4664306640625, 63),
        handledBy: handleOpenArenaMenu,
        text: "/arenas"
    }, 
    {
        position: new mp.Vector3(-1366.92724609375, 331.8669128417969, 63),
        handledBy: handleOpenCharacterCreator,
        text: "/characterCreator"
    },
    {
        position: new mp.Vector3(-1363.865966796875, 343.2648010253906, 63),
        handledBy: handleEnterFreeroam,
        text: "/freeroam"
    }
];
module.exports = LOBBY_MARKERS;