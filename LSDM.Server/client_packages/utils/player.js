const { CHARACTER_LIMITS } = require('./config/characterLimits');
const { COMPONENTS } = require('./config/components');
const { HEAD_OVERLAYS } = require('./config/headOverlays');
const { PLAYER_MODELS } = require('./config/playerModels');
const { PROPS } = require('./config/props');

let playerHeadingOffset = 0;

exports.freezePlayerPosition = (toggle) => {
    const player = mp.players.local;
    player.freezePosition(toggle);
};
exports.setPlayerRagdoll = (enabled) => {
    const player = mp.players.local;
    player.setCanRagdoll(enabled);
}
exports.setCollision = (enabled) => {
    mp.players.local.setCollision(enabled, enabled);
}
exports.setPlayerModel = (modelHash) => {
    const player = mp.players.local;
    const allowedModels = [PLAYER_MODELS.MALE, PLAYER_MODELS.FEMALE];
    if(!allowedModels.includes(modelHash)) return;
    player.model = modelHash;
}
exports.setPlayerHeadBlend = (shapeFirstID, shapeSecondID, skinFirstID, skinSecondID, shapeMix, skinMix) => {
    const player = mp.players.local;
    if((shapeFirstID < 0 || shapeFirstID > 45) || 
       (shapeSecondID < 0 || shapeSecondID > 45) ||
       (skinFirstID < 0 || shapeFirstID > 45) ||
       (skinSecondID < 0 || skinSecondID > 45) ||
       (shapeMix < 0 || shapeMix > 1) || 
       (skinMix < 0 || shapeMix > 1)) return;
    player.setHeadBlendData(shapeFirstID, shapeSecondID, 0, skinFirstID, skinSecondID, 0, shapeMix, skinMix, 0, false);
}
exports.setPlayerComponent = (componentId, drawableId, textureId) => {
    const player = mp.players.local;
    const isMale = player.isMale();
    if(!COMPONENTS.hasOwnProperty(componentId)) return;
    if(isMale) {
        if(!(drawableId >= COMPONENTS[componentId].male.min && drawableId <= COMPONENTS[componentId].male.max)) return;
    } else {
        if(!(drawableId >= COMPONENTS[componentId].female.min && drawableId <= COMPONENTS[componentId].female.max)) return;
    }
    player.setComponentVariation(componentId, drawableId, textureId, 0);
}
exports.setPlayerProp = (propId, drawableId, textureId) => {
    const player = mp.players.local;
    const isMale = player.isMale();
    if(!PROPS.hasOwnProperty(propId)) return;
    if(isMale) {
        if(!(drawableId >= PROPS[propId].male.min && drawableId <= PROPS[propId].male.max)) return;
    }
    else {
        if(!(drawableId >= PROPS[propId].female.min && drawableId <= PROPS[propId].female.max)) return;
    }
    if(drawableId === -1)
    {
        player.clearProp(propId);
        return;
    }
    player.setPropIndex(propId, drawableId, textureId, true);
}
exports.setPlayerHeadOverlay = (overlayID, index, opacity, firstColor, secondColor) => {
    const player = mp.players.local;
    if(!HEAD_OVERLAYS.hasOwnProperty(overlayID)) return;
    if(!(index >= HEAD_OVERLAYS[overlayID].min && index <= HEAD_OVERLAYS[overlayID].max)) return;
    if(!(opacity >= 0 && opacity <= 1)) return;
    if(!(firstColor >= 0 && firstColor <= CHARACTER_LIMITS.HEAD_OVERLAY_COLOR_MAX_ID)) return;
    if(!(secondColor >= 0 && secondColor <= CHARACTER_LIMITS.HEAD_OVERLAY_COLOR_MAX_ID)) return;
    player.setHeadOverlay(overlayID, index, opacity, firstColor, secondColor);
}
exports.setPlayerFaceFeature = (index, scale) => {
    const player = mp.players.local;
    if(!(index >= 0 && index <= CHARACTER_LIMITS.FACE_FEATURE_MAX_ID)) return;
    if(!(scale >= -1 && scale <= 1)) return;
    player.setFaceFeature(index, scale);
}
exports.setPlayerEyesColor = (colorId) => {
    const player = mp.players.local;
    if(!(colorId >= 0 && colorId <= CHARACTER_LIMITS.EYE_COLORS_MAX_ID)) return;
    player.setEyeColor(colorId);
};
exports.setPlayerHairColor = (colorId) => {
    const player = mp.players.local;
    if(!(colorId >= 0 && colorId <= CHARACTER_LIMITS.HAIR_COLOR_MAX_ID)) return;
    player.setHairColor(colorId, 0);
};
exports.getNumberOfTextureVariations = (componentId, drawableId) => {
    const player = mp.players.local;
    return player.getNumberOfTextureVariations(componentId, drawableId);
};
exports.getNumberOfPropTextureVariations = (propId, drawableId) => {
    const player = mp.players.local;
    return player.getNumberOfPropTextureVariations(propId, drawableId);
};
exports.setPlayerHeadingOffset = () => {
    const player = mp.players.local;
    const rotZ = player.getHeading();
    playerHeadingOffset = rotZ;
};
exports.getPlayerHeadingOffset = () => {
    return playerHeadingOffset;
}
exports.setPlayerHeading = (rotZ) => {
    const player = mp.players.local;
    player.setHeading(playerHeadingOffset + rotZ);
};