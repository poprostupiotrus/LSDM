const characterCreator = require('../../systems/character_creator/characterCreator');
const playerUtils = require('../../utils/playerUtils');
mp.events.addCommand("characterCreator", handleOpenCharacterCreator);
function handleOpenCharacterCreator(player) {
    if(!playerUtils.isPlayerInLobby(player)) {
        const message = "Musisz być w poczekalni, aby wejść do kreatora postaci."
        player.call('client:showError', [message]);
        return;
    }
    characterCreator.start(player);
}
module.exports = { handleOpenCharacterCreator };