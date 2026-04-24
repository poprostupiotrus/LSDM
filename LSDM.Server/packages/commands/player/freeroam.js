const LOCATION_TYPES = require('../../config/locationTypes');
const LOCATIONS = require('../../config/locations');
const WORLD_OFFSETS = require('../../config/worldOffsets');
const playerUtils = require('../../utils/playerUtils');
const COLORS = require('../../config/colors');

mp.events.addCommand("freeroam", handleEnterFreeroam);

function handleEnterFreeroam(player) {
    if(!playerUtils.isPlayerInLobby(player)) {
        const message = "Musisz być w poczekalni, aby wejść do trybu freeroam."
        player.call('client:showError', [message]);
        return;
    }
    player.runtime.freeroamData = {
        saveRespawn: false
    };
    player.runtime.location = {};
    player.runtime.location.type = LOCATION_TYPES.FREEROAM;
    player.spawn(LOCATIONS.FREEROAM);
    player.dimension = WORLD_OFFSETS.FREEROAM;
    player.outputChatBox(`${COLORS.BLUE}[LSDM:Freeroam] ${COLORS.WHITE}Wszedłeś do trybu freeroam, aby zobaczyć wszystkie dostępne komendy użyj komendy /pomoc`);
}

module.exports = { handleEnterFreeroam }