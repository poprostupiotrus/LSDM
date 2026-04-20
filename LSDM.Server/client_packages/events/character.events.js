const {setPlayerModel,setPlayerHeadBlend,setPlayerComponent,
    setPlayerProp,setPlayerHeadOverlay,setPlayerFaceFeature,
    setPlayerEyesColor, setPlayerHairColor} = require('./utils/player');
const { PLAYER_MODELS } = require('./config/playerModels');
const { setCameraOnPlayerFace, setCameraOnPlayerBody } = require('./utils/characterCreatorCamera');

mp.events.add('client:setPlayerModel', (isMale) => {
    let modelHash = PLAYER_MODELS.MALE;
    if(!isMale) modelHash = PLAYER_MODELS.FEMALE;
    setPlayerModel(modelHash);
})
mp.events.add('client:setPlayerHeadBlend', (shapeFirstID, shapeSecondID, skinFirstID, skinSecondID, shapeMix, skinMix) => {
    if(!Number.isInteger(shapeFirstID) || !Number.isInteger(shapeSecondID) || 
       !Number.isInteger(skinFirstID) || !Number.isInteger(skinSecondID) || 
       !Number.isFinite(shapeMix) || !Number.isFinite(skinMix)) return;
    setPlayerHeadBlend(shapeFirstID, shapeSecondID, skinFirstID, skinSecondID, shapeMix, skinMix);
})
mp.events.add('client:setPlayerComponent', (componentId, drawableId, textureId) => {
    if(!Number.isInteger(componentId) || !Number.isInteger(drawableId) || !Number.isInteger(textureId)) return;
    setPlayerComponent(componentId, drawableId, textureId);
})
mp.events.add('client:setPlayerProp', (propId, drawableId, textureId) => {
    if(!Number.isInteger(propId) || !Number.isInteger(drawableId) || !Number.isInteger(textureId)) return;
    setPlayerProp(propId, drawableId, textureId);
})
mp.events.add('client:setPlayerHeadOverlay', (overlayID, index, opacity, firstColor, secondColor) => {
    if(!Number.isInteger(overlayID) || !Number.isInteger(index) || !Number.isFinite(opacity) || !Number.isInteger(firstColor) || !Number.isInteger(secondColor)) return;
    setPlayerHeadOverlay(overlayID, index, opacity, firstColor, secondColor);
})
mp.events.add('client:setPlayerFaceFeature', (index, scale) => {
    if(!Number.isInteger(index) || !Number.isFinite(scale)) return;
    setPlayerFaceFeature(index, scale);
})
mp.events.add('client:setPlayerEyesColor', (colorId) => {
    if(!Number.isInteger(colorId)) return;
    setPlayerEyesColor(colorId);
})
mp.events.add('client:setPlayerHairColor', (colorId) => {
    if(!Number.isInteger(colorId)) return;
    setPlayerHairColor(colorId);
})
mp.events.add('client:setCameraOnPlayerFace', () => {
    setCameraOnPlayerFace();
});
mp.events.add('client:setCameraOnPlayerBody', () => {
    setCameraOnPlayerBody();
});
mp.events.add('client:saveAppearance', (data) => {
    const characterData = JSON.parse(data);
    mp.console.logInfo(`MODEL ${characterData.model}`);
    mp.console.logInfo(`COMPS: ${characterData.components}`);
    mp.console.logInfo(`PROPS: ${characterData.props}`);
    mp.console.logInfo(`HEAD BLEND: ${characterData.headBlend}`);
    mp.console.logInfo(`HEAD OVERLAYS: ${characterData.headOverlays}`);
    mp.console.logInfo(`EYE COLOR: ${characterData.eyeColor}`);
    mp.console.logInfo(`HAIR COLOR: ${characterData.hairColor}`);
    mp.console.logInfo(`FACE FEATURES: ${characterData.faceFeatures}`);
    Object.entries(characterData.faceFeatures).forEach(([index, scale]) => {
        mp.console.logInfo(`FACE FEATURE (INDEX: ${index}): ${scale}, TYPE: ${typeof scale}`);
    });
    mp.events.callRemote('server:saveAppearance', data);
});
mp.events.add('client:exitCharacterCreator', () => {
    mp.events.callRemote('server:exitCharacterCreator');
})