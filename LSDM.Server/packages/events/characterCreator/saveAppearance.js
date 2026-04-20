const characterCreator = require('../../systems/character_creator/characterCreator');
mp.events.add('server:saveAppearance', (player, data) => {
    const characterData = JSON.parse(data);
    if(characterData.model === undefined || characterData.components === undefined || characterData.props === undefined 
       || characterData.headBlend === undefined || characterData.headOverlays === undefined || characterData.eyeColor === undefined 
       || characterData.hairColor === undefined || characterData.faceFeatures === undefined) return;
    const modelType = 'model';
    const componentType = 'component';
    const propType = 'prop';
    const headBlendType = 'headBlend';
    const headOverlayType = 'headOverlay';
    const eyeColorType = 'eyeColor';
    const hairColorType = 'hairColor';
    const faceFeatureType = 'faceFeature';
    characterCreator.updateAppearance(player, modelType, { model: characterData.model });
    characterCreator.updateAppearance(player, headBlendType, characterData.headBlend);
    Object.entries(characterData.faceFeatures).forEach(([index, scale]) => {
        characterCreator.updateAppearance(player, faceFeatureType, {index: parseInt(index), scale: scale});
    });
    characterCreator.updateAppearance(player, eyeColorType, { eyeColor: characterData.eyeColor });
    characterCreator.updateAppearance(player, hairColorType, { hairColor: characterData.hairColor });
    Object.entries(characterData.headOverlays).forEach(([overlayID, overlay]) => {
        characterCreator.updateAppearance(player, headOverlayType, {overlayID: parseInt(overlayID), ...overlay});
    });
    Object.entries(characterData.components).forEach(([compId, component]) => {
        characterCreator.updateAppearance(player, componentType, {componentId: parseInt(compId), ...component})
    });
    Object.entries(characterData.props).forEach(([propId, prop]) => {
        characterCreator.updateAppearance(player, propType, {propId: parseInt(propId), ...prop});
    });
    characterCreator.saveOutfit(player);
    characterCreator.finish(player);
    player.outputChatBox('ZAPISANO POSTAĆ!');
});