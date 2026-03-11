const WEAPONS = require('../../config/weapons');
const ArenaConfig = {
    ARENAS: [
        {
            id: 1,
            name: "Stadium Arena",
            maxPlayers: 10,
            virtualWorld: 1,
            arenaSize: {
                width: 100,
                height: 100,
            },
            spawnPoints: [
                { x: 238.75924682617188, y: 290.7768859863281, z: 105.59376525878906 },
                { x: 235.1074676513672, y: 304.95709228515625, z: 105.57577514648438 },
                { x: 246.3370819091797, y: 318.24639892578125, z: 105.58406829833984 },
                { x: 251.5864715576172, y: 306.9671936035156, z: 105.48509216308594 }
            ],
            weaponLoadout: [
                { weapon: WEAPONS.HANDGUNS.COMBATPISTOL, ammo: 10000 },
                { weapon: WEAPONS.SMG.MICROSMG, ammo: 10000}
            ],
            position: { x: 245, y: 300, z: 105.5}
        },
                {
            id: 2,
            name: "Stadium Arena",
            maxPlayers: 10,
            virtualWorld: 2,
            arenaSize: {
                width: 100,
                height: 100,
            },
            spawnPoints: [
                { x: 238.75924682617188, y: 290.7768859863281, z: 105.59376525878906 },
                { x: 235.1074676513672, y: 304.95709228515625, z: 105.57577514648438 },
                { x: 246.3370819091797, y: 318.24639892578125, z: 105.58406829833984 },
                { x: 251.5864715576172, y: 306.9671936035156, z: 105.48509216308594 }
            ],
            weaponLoadout: [
                { weapon: WEAPONS.HANDGUNS.COMBATPISTOL, ammo: 10000 },
                { weapon: WEAPONS.SMG.MICROSMG, ammo: 10000}
            ],
            position: { x: 245, y: 300, z: 105.5}
        },
                {
            id: 3,
            name: "Stadium Arena",
            maxPlayers: 10,
            virtualWorld: 3,
            arenaSize: {
                width: 100,
                height: 100,
            },
            spawnPoints: [
                { x: 238.75924682617188, y: 290.7768859863281, z: 105.59376525878906 },
                { x: 235.1074676513672, y: 304.95709228515625, z: 105.57577514648438 },
                { x: 246.3370819091797, y: 318.24639892578125, z: 105.58406829833984 },
                { x: 251.5864715576172, y: 306.9671936035156, z: 105.48509216308594 }
            ],
            weaponLoadout: [
                { weapon: WEAPONS.HANDGUNS.COMBATPISTOL, ammo: 10000 },
                { weapon: WEAPONS.SMG.MICROSMG, ammo: 10000}
            ],
            position: { x: 245, y: 300, z: 105.5}
        },
                {
            id: 4,
            name: "Stadium Arena",
            maxPlayers: 10,
            virtualWorld: 4,
            arenaSize: {
                width: 100,
                height: 100,
            },
            spawnPoints: [
                { x: 238.75924682617188, y: 290.7768859863281, z: 105.59376525878906 },
                { x: 235.1074676513672, y: 304.95709228515625, z: 105.57577514648438 },
                { x: 246.3370819091797, y: 318.24639892578125, z: 105.58406829833984 },
                { x: 251.5864715576172, y: 306.9671936035156, z: 105.48509216308594 }
            ],
            weaponLoadout: [
                { weapon: WEAPONS.HANDGUNS.COMBATPISTOL, ammo: 10000 },
                { weapon: WEAPONS.SMG.MICROSMG, ammo: 10000}
            ],
            position: { x: 245, y: 300, z: 105.5}
        },
        {
            id: 5,
            name: "Desert Arena",
            maxPlayers: 10,
            virtualWorld: 5,
            arenaSize: {
                width: 100,
                height: 100
            },
            spawnPoints: [
                { x: -469.5072937011719, y: 791.1483764648438, z: 177.62461853027344 },
                { x: -477.3636779785156, y: 796.2869262695312, z: 179.64187622070312 },
                { x: -476.2273864746094, y: 801.870849609375, z: 181.060302734375 },
                { x: -469.8952331542969, y: 800.4884033203125, z: 179.8509063720703 }
            ],
            weaponLoadout: [
                { weapon: WEAPONS.HANDGUNS.COMBATPISTOL, ammo: 10000 },
                { weapon: WEAPONS.SMG.MICROSMG, ammo: 10000}
            ],
            position: { x: -470, y: 800, z: 180 }
        },
        {
            id: 6,
            name: "Desert Arena",
            maxPlayers: 10,
            virtualWorld: 6,
            arenaSize: {
                width: 100,
                height: 100
            },
            spawnPoints: [
                { x: -469.5072937011719, y: 791.1483764648438, z: 177.62461853027344 },
                { x: -477.3636779785156, y: 796.2869262695312, z: 179.64187622070312 },
                { x: -476.2273864746094, y: 801.870849609375, z: 181.060302734375 },
                { x: -469.8952331542969, y: 800.4884033203125, z: 179.8509063720703 }
            ],
            weaponLoadout: [
                { weapon: WEAPONS.HANDGUNS.COMBATPISTOL, ammo: 10000 },
                { weapon: WEAPONS.SMG.MICROSMG, ammo: 10000}
            ],
            position: { x: -470, y: 800, z: 180 }
        },
        {
            id: 7,
            name: "Desert Arena",
            maxPlayers: 10,
            virtualWorld: 7,
            arenaSize: {
                width: 100,
                height: 100
            },
            spawnPoints: [
                { x: -469.5072937011719, y: 791.1483764648438, z: 177.62461853027344 },
                { x: -477.3636779785156, y: 796.2869262695312, z: 179.64187622070312 },
                { x: -476.2273864746094, y: 801.870849609375, z: 181.060302734375 },
                { x: -469.8952331542969, y: 800.4884033203125, z: 179.8509063720703 }
            ],
            weaponLoadout: [
                { weapon: WEAPONS.HANDGUNS.COMBATPISTOL, ammo: 10000 },
                { weapon: WEAPONS.SMG.MICROSMG, ammo: 10000}
            ],
            position: { x: -470, y: 800, z: 180 }
        },
        {
            id: 8,
            name: "Desert Arena",
            maxPlayers: 10,
            virtualWorld: 8,
            arenaSize: {
                width: 100,
                height: 100
            },
            spawnPoints: [
                { x: -469.5072937011719, y: 791.1483764648438, z: 177.62461853027344 },
                { x: -477.3636779785156, y: 796.2869262695312, z: 179.64187622070312 },
                { x: -476.2273864746094, y: 801.870849609375, z: 181.060302734375 },
                { x: -469.8952331542969, y: 800.4884033203125, z: 179.8509063720703 }
            ],
            weaponLoadout: [
                { weapon: WEAPONS.HANDGUNS.COMBATPISTOL, ammo: 10000 },
                { weapon: WEAPONS.SMG.MICROSMG, ammo: 10000}
            ],
            position: { x: -470, y: 800, z: 180 }
        }
    ]
};
module.exports = ArenaConfig;