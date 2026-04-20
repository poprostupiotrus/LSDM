const Character = require('../../systems/character_creator/character');
const characterCreator = require('../../systems/character_creator/characterCreator');
const { playerExists } = require('../../utils/playerUtils');
mp.events.addCommand("test", (player) => {
    const character = new Character(player);
    console.log(`IS_MALE: ${character.isMale}`);
    for (const [compId, data] of Object.entries(character.components)) {
        const {drawable, texture, palette} = data;
        console.log(`COMPONENT (ID: ${compId}): drawable: ${drawable}, texture: ${texture}, palette: ${palette}`);
    }
    for(const [propId, data] of Object.entries(character.props))
    {
        const {drawable, texture} = data;
        console.log(`PROP (ID: ${propId}): drawable: ${drawable}, texture: ${texture}`);
    }
    console.log(`Kolor oczu ${character.eyeColor}`);
    for(const [id, value] of Object.entries(character.faceFeatures))
    {
        console.log(`FACE FEATURE (ID: ${id}): ${value}`);
    }
    for(const [id, overlay] of Object.entries(character.headOverlays))
    {
        console.log(`HEAD OVERLAY (ID: ${id}): ${overlay}`);
    }
    const {shapeFirstID, shapeSecondID, skinFirstID, skinSecondID, shapeMix, skinMix} = character.headBlend
    console.log("HEAD BLEND:", shapeFirstID, shapeSecondID, skinFirstID, skinSecondID, shapeMix, skinMix);
});
mp.events.addCommand("clothes", (player, fullText, compId, drawable, texture, palette) => {
    const componentId = parseInt(compId);
    const drawableId = parseInt(drawable);
    const textureId = parseInt(texture);
    const paletteId = parseInt(palette);
    const character = new Character(player);
    character.setComponent(player, componentId, drawableId, textureId, paletteId);
    player.outputChatBox(`COMPONENT (ID: ${componentId}): drawable: ${drawableId}, texture: ${textureId}, palette: ${paletteId}`);
})
mp.events.addCommand("props", (player, fullText, id, drawable, texture) => {
    const propId = parseInt(id);
    const drawableId = parseInt(drawable);
    const textureId = parseInt(texture);
    const character = new Character(player);
    character.setProp(player, propId, drawableId, textureId);
    player.outputChatBox(`PROP (ID: ${propId}): drawable: ${drawableId}, texture: ${textureId}`);
});
mp.events.addCommand("eyecolor", (player, fullText, color) => {
    const eyeColor = parseInt(color);
    const character = new Character(player);
    character.setEyeColor(player, eyeColor);
    player.outputChatBox(`EYE COLOR: ${eyeColor}`);
})
mp.events.addCommand("model", (player, fullText, model) => {
    let modelHash;
    if(parseInt(model) === 0)
    {
        modelHash = 0x705E61F2;
    } else if(parseInt(model) === 1)
    {
        modelHash = 0x9C9EFFD8;
    }
    const character = new Character(player);
    character.setModel(player, modelHash);
    player.outputChatBox(`Model: ${modelHash}`);
})
mp.events.addCommand("headblend", (player, fullText, shapeFirstID, shapeSecondID, skinFirstID, skinSecondID, shapeMix, skinMix) => {
    const character = new Character(player);
    character.setHeadBlend(player, parseInt(shapeFirstID), parseInt(shapeSecondID), parseInt(skinFirstID), parseInt(skinSecondID), parseFloat(shapeMix), parseFloat(skinMix));
})
mp.events.addCommand("headoverlay", (player, fullText, overlayID, index, opacity, firstColor, secondColor) => {
    const character = new Character(player);
    character.setHeadOverlay(player, parseInt(overlayID), parseInt(index), parseInt(opacity), parseInt(firstColor), parseInt(secondColor));
})
mp.events.addCommand("haircolor", (player, fullText, hairColor) => {
    const character = new Character(player);
    character.setHairColor(player, parseInt(hairColor));
})
mp.events.addCommand("ff", (player, fullText, index, scale) => {
    const character = new Character(player);
    character.setFaceFeature(player, parseInt(index), parseFloat(scale));
})
mp.events.addCommand("character", (player) => {
    characterCreator.start(player);
})
mp.events.addCommand("lcharacter", (player) => {
    characterCreator.finish(player);
})
mp.events.addCommand("rot", (player) => {
    console.log(player.heading);
})
mp.events.add('server:log', (player, message) => {
    console.log(message);
})