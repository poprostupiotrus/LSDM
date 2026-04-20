const characterCreator = require('../../systems/character_creator/characterCreator');
mp.events.add('server:exitCharacterCreator', (player) => {
    characterCreator.finish(player);
});