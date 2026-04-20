const CHARACTER_LIMITS = require('../../config/characterLimits');
const COMPONENTS = require('../../config/components');
const PROPS = require('../../config/props');
const HEAD_OVERLAYS = require('../../config/headOverlays');
const PLAYER_MODELS = require('../../config/playerModels');
class Character {
    constructor(player, characterData) {
        this.isMale = true;
        this.model = null;
        this.components = {};
        this.props = {};
        this.headBlend = {};
        this.headOverlays = {};
        this.eyeColor = 0;
        this.hairColor = 0;
        this.faceFeatures = {};

        if (characterData && player) {
            this.loadFromCharacterData(player, characterData);
        }
    }

    loadFromCharacterData(player, characterData) {
        this.model = characterData.model;
        this.components = characterData.components;
        this.props = characterData.props;
        this.headBlend = characterData.headBlend;
        this.headOverlays = characterData.headOverlays;
        this.eyeColor = characterData.eyeColor;
        this.hairColor = characterData.hairColor;
        this.faceFeatures = characterData.faceFeatures;
        this.setModel(player, characterData.model);
        this.setEyeColor(player, characterData.eyeColor);
        this.setHairColor(player, characterData.hairColor);
        const {
            shapeFirstID,
            shapeSecondID,
            skinFirstID,
            skinSecondID,
            shapeMix,
            skinMix
        } = characterData.headBlend;
        this.setHeadBlend(player, shapeFirstID, shapeSecondID, skinFirstID, skinSecondID, shapeMix, skinMix);
        Object.entries(characterData.components).forEach(([compid, component]) => {
            this.setComponent(player, parseInt(compid), component.drawable, component.texture);
        });
        Object.entries(characterData.props).forEach(([propId, prop]) => {
            this.setProp(player, parseInt(propId), prop.drawable, prop.texture);
        });
        Object.entries(characterData.headOverlays).forEach(([headOverlayId, overlay]) => {
            this.setHeadOverlay(player, parseInt(headOverlayId), overlay.index, overlay.opacity, overlay.firstColor);
        });
        Object.entries(characterData.faceFeatures).forEach(([index, scale]) => {
            this.setFaceFeature(player, parseInt(index), scale);
        });
    }
    setModel(player, modelHash)
    {
        const allowedModels = [PLAYER_MODELS.MALE, PLAYER_MODELS.FEMALE]
        if(!allowedModels.includes(modelHash)) return;
        this.model = modelHash;
        this.setGender();
        player.model = this.model;
    }
    
    setComponent(player, componentId, drawable, texture = 0, palette = 0) {
        if(!COMPONENTS.hasOwnProperty(componentId)) return;
        if(this.isMale) {
            if(!(drawable >= COMPONENTS[componentId].male.min && drawable <= COMPONENTS[componentId].male.max)) return;
        } else {
            if(!(drawable >= COMPONENTS[componentId].female.min && drawable <= COMPONENTS[componentId].female.max)) return;
        }
        this.components[componentId] = {drawable, texture, palette};
        let drawableId = drawable;
        if(componentId === 8 && drawableId === -1) {
            if(this.isMale) {
                drawableId = 15
            } else {
                drawableId = 14
            }
        }
        player.setClothes(componentId, drawableId, texture, palette);
    }

    setProp(player, propId, drawable, texture = 0) {
        if(!PROPS.hasOwnProperty(propId)) return;
        if(this.isMale)
        {
            if(!(drawable >= PROPS[propId].male.min && drawable <= PROPS[propId].male.max)) return;
        } else  {
            if(!(drawable >= PROPS[propId].female.min && drawable <= PROPS[propId].female.max)) return;
        }
        this.props[propId] = { drawable, texture };
        player.setProp(propId, drawable, texture);
    }
    setHeadBlend(player, shapeFirstID, shapeSecondID, skinFirstID, skinSecondID, shapeMix, skinMix) {
        if((shapeFirstID < 0 || shapeFirstID > 45) || 
           (shapeSecondID < 0 || shapeSecondID > 45) ||
           (skinFirstID < 0 || shapeFirstID > 45) ||
           (skinSecondID < 0 || skinSecondID > 45) ||
           (shapeMix < 0 || shapeMix > 1) || 
           (skinMix < 0 || shapeMix > 1)) return;
        this.headBlend = {
            shapeFirstID,
            shapeSecondID,
            skinFirstID,
            skinSecondID,
            shapeMix,
            skinMix
        }
        player.setHeadBlend(shapeFirstID, shapeSecondID, 0, skinFirstID, skinSecondID, 0, shapeMix, skinMix, 0);
    }
    setHeadOverlay(player, overlayID, index, opacity, firstColor = 0, secondColor = 0)
    {
        if(!(HEAD_OVERLAYS.hasOwnProperty(overlayID))) return;
        if(!(index >= HEAD_OVERLAYS[overlayID].min && index <= HEAD_OVERLAYS[overlayID].max)) return;
        this.headOverlays[overlayID] = {index, opacity, firstColor, secondColor}
        player.setHeadOverlay(overlayID, [index, opacity, firstColor, secondColor]);
    }
    setFaceFeature(player, index, scale)
    {
        if(index < 0 || index > CHARACTER_LIMITS.FACE_FEATURE_MAX_ID)  return;
        if(scale < -1 || scale > 1) return;
        this.faceFeatures[index] = scale;
        player.setFaceFeature(index, scale);
    }
    setEyeColor(player, eyeColor)
    {
        if(eyeColor < 0 || eyeColor > CHARACTER_LIMITS.EYE_COLORS_MAX_ID) return;
        this.eyeColor = eyeColor;
        player.eyeColor = eyeColor;
    }
    setHairColor(player, hairColor)
    {
        if(hairColor < 0 || hairColor > CHARACTER_LIMITS.HAIR_COLOR_MAX_ID) return;
        this.hairColor = hairColor;
        player.setHairColor(hairColor, 0);
    }
    setGender()
    {
        if(this.model === PLAYER_MODELS.MALE)
        {
            this.isMale = true;
            return;
        }  
        this.isMale = false;
    }
}
module.exports = Character;