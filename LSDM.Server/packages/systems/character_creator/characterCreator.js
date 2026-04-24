const Character = require('./character');
const LOCATIONS = require('../../config/locations');
const characterMapper = require('../../api/mappers/characterMapper');
const outfitApi = require('../../api/outfit.api');
const playerUtils = require('../../utils/playerUtils');
const WORLD_OFFSETS = require('../../config/worldOffsets');
const LOCATION_TYPES = require('../../config/locationTypes');

class CharacterCreator {
    constructor() {
        this.creatorLocation = {
            position: LOCATIONS.CHARACTER_CREATOR,
            rotation: { x: 0.0, y: 0.0, z: 88.96357727050781 },
            cameraDistance: 3.5,
            cameraFov: 50.0
        };
    }
    start(player) {
        const character = player.runtime.character;
        const characterData = {
            isMale: character.isMale,
            model: character.model,
            components: character.components,
            props: character.props,
            headBlend: character.headBlend,
            headOverlays: character.headOverlays,
            eyeColor: character.eyeColor,
            hairColor: character.hairColor,
            faceFeatures: character.faceFeatures
        };
        player.runtime.location = {};
        player.runtime.location.type = LOCATION_TYPES.CHARACTER_CREATOR;
        player.dimension = WORLD_OFFSETS.CHARACTER_CREATOR + player.id;
        player.spawn(this.creatorLocation.position);
        player.rotation = this.creatorLocation.rotation;
        player.heading = this.creatorLocation.rotation.z;
        player.call('client:freezePlayer', [true]);
        player.call('client:setPlayerRagdoll', [false]);
        player.call('client:showGtaUi', [false]);
        player.call('client:openCharacterCreatorMenu', [characterData]);
        player.call('client:setPlayerHeadingOffset');
        player.call('client:closeHud')
        this.setupCamera(player);
    }
    finish(player) {
        player.call('client:destroyCamera');
        player.call('client:freezePlayer', [false]);
        player.call('client:setPlayerRagdoll', [true]);
        player.call('client:closeCharacterCreatorMenu');
        player.call('client:showGtaUi', [true]);
        player.call('client:openHud');
        playerUtils.teleportPlayerToLobby(player);
    }
    updateAppearance(player, type, data) {
        try {
            switch (type) {
                case 'model':
                    if (!this.validateType(data.model, 'integer')) throw new Error('Invalid model name type');
                    player.runtime.character.setModel(player, data.model);
                    break;

                case 'component':
                    if (!this.validateType(data.componentId, 'integer')) throw new Error('Invalid componentId');
                    if (!this.validateType(data.drawable, 'integer')) throw new Error('Invalid drawable');
                    if (!this.validateType(data.texture, 'integer', true)) throw new Error('Invalid texture');
                    if (!this.validateType(data.palette, 'integer', true)) throw new Error('Invalid palette');
                    
                    player.runtime.character.setComponent(
                        player, 
                        data.componentId, 
                        data.drawable, 
                        data.texture ?? 0, 
                        data.palette ?? 0
                    );
                    break;

                case 'prop':
                    if (!this.validateType(data.propId, 'integer')) throw new Error('Invalid propId');
                    if (!this.validateType(data.drawable, 'integer')) throw new Error('Invalid drawable');
                    if (!this.validateType(data.texture, 'integer', true)) throw new Error('Invalid texture');

                    player.runtime.character.setProp(
                        player, 
                        data.propId, 
                        data.drawable, 
                        data.texture ?? 0
                    );
                    break;

                case 'headBlend':
                    const hb = data;
                    if (!this.validateType(hb.shapeFirstID, 'integer')) throw new Error('Invalid shapeFirstID');
                    if (!this.validateType(hb.shapeSecondID, 'integer')) throw new Error('Invalid shapeSecondID');
                    if (!this.validateType(hb.skinFirstID, 'integer')) throw new Error('Invalid skinFirstID');
                    if (!this.validateType(hb.skinSecondID, 'integer')) throw new Error('Invalid skinSecondID');
                    if (!this.validateType(hb.shapeMix, 'float')) throw new Error('Invalid shapeMix');
                    if (!this.validateType(hb.skinMix, 'float')) throw new Error('Invalid skinMix');

                    player.runtime.character.setHeadBlend(
                        player,
                        hb.shapeFirstID, hb.shapeSecondID,
                        hb.skinFirstID, hb.skinSecondID,
                        hb.shapeMix, hb.skinMix
                    );
                    break;

                case 'faceFeature':
                    if (!this.validateType(data.index, 'integer')) throw new Error('Invalid index');
                    if (!this.validateType(data.scale, 'float')) throw new Error('Invalid scale');

                    player.runtime.character.setFaceFeature(player, data.index, data.scale);
                    break;

                case 'eyeColor':
                    if (!this.validateType(data.eyeColor, 'integer')) throw new Error('Invalid eyeColor');
                    player.runtime.character.setEyeColor(player, data.eyeColor);
                    break;
                
                case 'headOverlay':
                    if (!this.validateType(data.overlayID, 'integer')) throw new Error('Invalid overlayID');
                    if (!this.validateType(data.index, 'integer')) throw new Error('Invalid index');
                    if (!this.validateType(data.opacity, 'float')) throw new Error('Invalid opacity');
                    if (!this.validateType(data.firstColor, 'integer', true)) throw new Error('Invalid firstColor');
                    if (!this.validateType(data.secondColor, 'integer', true)) throw new Error('Invalid secondColor');
                    player.runtime.character.setHeadOverlay(
                        player,
                        data.overlayID,
                        data.index,
                        data.opacity,
                        data.firstColor ?? 0,
                        data.secondColor ?? 0
                    );
                    break;
                case 'hairColor':
                    if(!this.validateType(data.hairColor, 'integer')) throw new Error('Invalid hairColor');
                    player.runtime.character.setHairColor(player, data.hairColor);
                    break;

                default:
                    console.log(`Unknown character update type: ${type}`);
            }
        } catch (error) {
            console.warn(`[CharacterCreator] Validation error for player ${player.id}: ${error.message}`);
        }
    }
    setupCamera(player) {
        const pos = this.creatorLocation.position;
        const heading = player.heading * (Math.PI / 180);
        
        const camX = pos.x + (Math.sin(-heading) * this.creatorLocation.cameraDistance);
        const camY = pos.y + (Math.cos(-heading) * this.creatorLocation.cameraDistance);
        const camZ = pos.z + 0.5;

        const config = {
            name: 'characterCreatorCam',
            position: { x: camX, y: camY, z: camZ },
            rotation: { x: 0, y: 0, z: 0 },
            fov: this.creatorLocation.cameraFov,
            pointsAt: { x: pos.x, y: pos.y, z: pos.z + 0.5 }
        };
        player.call('client:createCamera', [config]);
    }
    validateType(value, type, optional = false) {
        if (value === undefined || value === null) {
            return optional;
        }

        switch (type) {
            case 'string':
                return typeof value === 'string';
            case 'boolean':
                return typeof value === 'boolean';
            case 'integer':
                return typeof value === 'number' && Number.isInteger(value);
            case 'float':
                return typeof value === 'number' && !Number.isInteger(value) || (typeof value === 'number' && Number.isFinite(value));
            default:
                return false;
        }
    }
    async saveOutfit(player) {
        const character = player.runtime.character;
        const characterData = {
            model: character.model,
            components: character.components,
            props: character.props,
            headBlend: character.headBlend,
            headOverlays: character.headOverlays,
            eyeColor: character.eyeColor,
            hairColor: character.hairColor,
            faceFeatures: character.faceFeatures
        };
        const characterDataDto = characterMapper.characterDataToDto(characterData);
        if(player.runtime.hasOutfit) {
            outfitApi.updateOutfit(player, characterDataDto);
        } else {
            outfitApi.createOutfit(player, characterDataDto);
            player.runtime.hasOutfit = true;
        }
    }
}

module.exports = new CharacterCreator();