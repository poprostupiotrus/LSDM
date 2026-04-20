class CharacterMapper {
    characterDataToDto(characterData) {
        const characterDataDto = {}
        characterDataDto.model = characterData.model;
        characterDataDto.eyeColor = characterData.eyeColor;
        characterDataDto.hairColor = characterData.hairColor;
        characterDataDto.headBlend = characterData.headBlend;
        characterDataDto.components = [];
        Object.keys(characterData.components).forEach((compId) => {
            const id = parseInt(compId);
            const component = {
                componentId: id,
                drawable: characterData.components[id].drawable,
                texture: characterData.components[id].texture
            };
            characterDataDto.components.push(component);
        });
        characterDataDto.props = [];
        Object.keys(characterData.props).forEach((propId) => {
            const id = parseInt(propId);
            const prop = {
                propId: id,
                drawable: characterData.props[id].drawable,
                texture: characterData.props[id].texture
            }
            characterDataDto.props.push(prop);
        });
        characterDataDto.headOverlays = [];
        Object.keys(characterData.headOverlays).forEach((headOverlayId) => {
            const id = parseInt(headOverlayId);
            const headOverlay = {
                headOverlayId: id,
                index: characterData.headOverlays[id].index,
                opacity: characterData.headOverlays[id].opacity,
                firstColor: characterData.headOverlays[id].firstColor
            }
            characterDataDto.headOverlays.push(headOverlay);
        });
        characterDataDto.faceFeatures = [];
        Object.keys(characterData.faceFeatures).forEach((idx) => {
            const index = parseInt(idx);
            const faceFeature = {
                index: index,
                scale: characterData.faceFeatures[index]
            }
            characterDataDto.faceFeatures.push(faceFeature);
        });
        return characterDataDto;
    }
    DtoToCharacterData(characterDataDto) {
        const characterData = {};
        characterData.model = characterDataDto.model;
        characterData.eyeColor = characterDataDto.eyeColor;
        characterData.hairColor = characterDataDto.hairColor;

        characterData.headBlend = { 
            shapeFirstID: characterDataDto.headBlend.shapeFirstId,
            shapeSecondID: characterDataDto.headBlend.shapeSecondId,
            skinFirstID: characterDataDto.headBlend.skinFirstId,
            skinSecondID: characterDataDto.headBlend.skinSecondId,
            shapeMix: characterDataDto.headBlend.shapeMix,
            skinMix: characterDataDto.headBlend.skinMix
        };

        characterData.components = {};
        characterDataDto.components.forEach(component => {
            characterData.components[component.componentId] = {
                drawable: component.drawable,
                texture: component.texture
            }
        });
        characterData.props = {};
        characterDataDto.props.forEach(prop => {
            characterData.props[prop.propId] = {
                drawable: prop.drawable,
                texture: prop.texture
            };
        });
        characterData.headOverlays = {};
        characterDataDto.headOverlays.forEach(headOverlay => {
            characterData.headOverlays[headOverlay.headOverlayId] = {
                index: headOverlay.index,
                opacity: headOverlay.opacity,
                firstColor: headOverlay.firstColor
            };
        });
        characterData.faceFeatures = {};
        characterDataDto.faceFeatures.forEach(faceFeature => {
            characterData.faceFeatures[faceFeature.index] = faceFeature.scale;
        });
        return characterData;
    }
}
module.exports = new CharacterMapper();