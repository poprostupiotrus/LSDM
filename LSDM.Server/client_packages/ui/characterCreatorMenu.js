const { getNumberOfTextureVariations, getNumberOfPropTextureVariations } = require('./utils/player');
const { CHARACTER_LIMITS } = require('./config/characterLimits');
const { COMPONENTS } = require('./config/components');
const { HEAD_OVERLAYS } = require('./config/headOverlays');
const { PLAYER_MODELS } = require('./config/playerModels');
const { PROPS } = require('./config/props');
let characterCreatorMenuBrowser = null;
const configuration = {
    CHARACTER_LIMITS,
    COMPONENTS,
    HEAD_OVERLAYS,
    PLAYER_MODELS,
    PROPS
};
mp.events.add('client:openCharacterCreatorMenu', (characterData) => {
    characterCreatorMenuBrowser = mp.browsers.new("http://package/cef/character_creator/index.html");
    characterCreatorMenuBrowser.execute(`loadData(${JSON.stringify(characterData)},${JSON.stringify(configuration)})`);
    setTimeout(() => {
        mp.gui.cursor.show(true, true);
    }, 500);
});
mp.events.add('client:closeCharacterCreatorMenu', () => {
    if(characterCreatorMenuBrowser)
    {
        characterCreatorMenuBrowser.destroy();
        characterCreatorMenuBrowser = null;
    }
    mp.gui.cursor.show(false, false);
})
mp.events.add('client:loadNumberOfTextureVariations', (componentId, drawableId) => {
    const numberOfTextures = getNumberOfTextureVariations(componentId, drawableId);
    if(characterCreatorMenuBrowser)
    {
        characterCreatorMenuBrowser.call('browser:setNumberOfTextureVariations', componentId, drawableId, numberOfTextures);
    }
});
mp.events.add('client:loadNumberOfPropTextureVariations', (propId, drawableId) => {
    const numberOfTextures = getNumberOfPropTextureVariations(propId, drawableId);
    if(characterCreatorMenuBrowser)
    {
        characterCreatorMenuBrowser.call('browser:setNumberOfPropTextureVariations', propId, drawableId, numberOfTextures);
    }
});