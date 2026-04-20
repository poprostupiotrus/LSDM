const CHARACTER_LIMITS = require('../config/characterLimits');
const COMPONENTS = require('../config/components');
const PROPS = require('../config/props');
const HEAD_OVERLAYS = require('../config/headOverlays');
const PLAYER_MODELS = require('../config/playerModels');
class CharacterUtils {
        getDeafultComponent()
    {
        const drawable = 0;
        const texture = 0;
        const palette = 0;
        return { drawable: drawable, texture: texture, palette: palette};
    }
    getDeafultProp()
    {
        const drawable = -1;
        const texture = 0;
        return { drawable: drawable, texture: texture};
    }
    getDeafultEyeColor()
    {
        const eyeColor = 0;
        return eyeColor;
    }
    getDeafultHairColor()
    {
        const hairColor = 0;
        return hairColor;
    }
    getDeafultFaceFeatureScale()
    {
        const scale = 0;
        return scale;
    }
    getDeafultHeadOverlay()
    {
        const index = -1;
        const opacity = 0;
        const firstColor = 0;
        const secondColor = 0;
        return { index: index, opacity: opacity, firstColor: firstColor, secondColor: secondColor};
    }
    getDefaultHeadBlend()
    {
        const shapeFirstID = 0, shapeSecondID = 0, skinFirstID = 0, skinSecondID = 0, shapeMix = 0, skinMix = 0;
        return { shapeFirstID: shapeFirstID, shapeSecondID: shapeSecondID, skinFirstID: skinFirstID, 
                 skinSecondID: skinSecondID, shapeMix: shapeMix, skinMix: skinMix }
    }
    getDefaultCharacterData()
    {
        const characterData = {};
        characterData.model = PLAYER_MODELS.MALE;
        characterData.components = {};
        Object.keys(COMPONENTS).forEach(compIdStr => {
            const compId = parseInt(compIdStr);
            characterData.components[compId] = this.getDeafultComponent();
        });
        characterData.props = {};
        Object.keys(PROPS).forEach(propIdStr => {
            const propId = parseInt(propIdStr);
            characterData.props[propId] = this.getDeafultProp();
        })
        characterData.headBlend = this.getDefaultHeadBlend();
        characterData.headOverlays = {};
        Object.keys(HEAD_OVERLAYS).forEach(overlayIdStr => {
            const overlayId = parseInt(overlayIdStr);
            characterData.headOverlays[overlayId] = this.getDeafultHeadOverlay();
        })
        characterData.eyeColor = this.getDeafultEyeColor();
        characterData.hairColor = this.getDeafultHairColor();
        characterData.faceFeatures = {};
        for(let i = 0; i <= CHARACTER_LIMITS.FACE_FEATURE_MAX_ID; i++)
        {
            characterData.faceFeatures[i] = this.getDeafultFaceFeatureScale();
        }
        return characterData;
    }
}
module.exports = new CharacterUtils();