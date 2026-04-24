const LOBBY_MARKERS = require('../../config/lobbyMarkers');
const WORLD_OFFSETS = require('../../config/worldOffsets');
const LOBBY_PEDS = require('../../config/lobbyPeds');
const { teleportPlayerToLobby } = require('../../utils/playerUtils');
class LobbySystem {
    constructor() {
        const lobbyAreaRadius = 50;
        const lobbyAreaCenterPoint = { x: -1371.7989501953125, y: 337.769287109375 }
        this.lobbyAreaColShape = mp.colshapes.newCircle(lobbyAreaCenterPoint.x, lobbyAreaCenterPoint.y, lobbyAreaRadius, WORLD_OFFSETS.LOBBY);
        const lobbyMarkerRadius = 1;
        const markerType = 1;
        const markerColor = [0, 0, 255, 255];
        this.colshapes = new Map();
        LOBBY_MARKERS.forEach((lobbyMarker) => {
            const colshape = mp.colshapes.newCircle(lobbyMarker.position.x, lobbyMarker.position.y, lobbyMarkerRadius, WORLD_OFFSETS.LOBBY);
            mp.markers.new(markerType, lobbyMarker.position, lobbyMarkerRadius,
            {
                direction: new mp.Vector3(0, 0, 0),
                rotation: new mp.Vector3(0, 0, 0),
                color: markerColor,
                visible: true,
                dimension: WORLD_OFFSETS.LOBBY
            });
            this.colshapes.set(colshape.id, lobbyMarker.handledBy);
            const labelPos = new mp.Vector3(lobbyMarker.position.x, lobbyMarker.position.y, lobbyMarker.position.z + 1);
            const labelFontId = 0;
            const labelDrawDistance = 10;
            const labelColor = [255, 255, 255, 255];
            mp.labels.new(lobbyMarker.text, labelPos,
            {
                los: false,
                font: labelFontId,
                drawDistance: labelDrawDistance,
                color: labelColor,
                dimension: WORLD_OFFSETS.LOBBY
            });
        });
        this.createLobbyPeds();
    }
    createLobbyPeds() {
        LOBBY_PEDS.forEach((lobbyPed) => {
            const ped = mp.peds.new(
                lobbyPed.modelHash, 
                lobbyPed.position,
                {    
                    dynamic: false, 
                    frozen: true,
                    invincible: true
                }
            );
            ped.heading = lobbyPed.heading;
            ped.dimension = WORLD_OFFSETS.LOBBY;
            const labelPos = lobbyPed.position;
            const labelFontId = 0;
            const labelDrawDistance = 10;
            const labelColor = [255, 255, 255, 255];
            mp.labels.new(lobbyPed.text, labelPos,
            {
                los: false,
                font: labelFontId,
                drawDistance: labelDrawDistance,
                color: labelColor,
                dimension: WORLD_OFFSETS.LOBBY
            });
        });
    }
    handlePlayerEnterLobbyColshape(player, colshape) {
        if(!this.colshapes.has(colshape.id)) return;
        const handleEnter = this.colshapes.get(colshape.id);
        handleEnter(player);
    }
    handlePlayerExitLobbyArea(player) {
        teleportPlayerToLobby(player);
    }
}
module.exports = new LobbySystem();