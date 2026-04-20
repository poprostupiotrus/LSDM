import { HEAD_BLEND_PARENTS } from "./config/headBlendParents.js";
import { FACE_FEATURES } from "./config/faceFeatures.js";
import { DEFAULT_VALUES } from "./config/defaultValues.js";


let characterData = {};
let configuration = {};
let textureLimits = {};
let cameraState = {
    rotation: 0,
    fov: 50,
    position: 'BODY'
};


document.addEventListener('DOMContentLoaded', () => {
    initializeTabs();
    initializeGenderSelector();
    initializeSliders();
    initializeArrowControls();
    initializeVariantControls();
    initializeOverlayControls();
    initializeCameraControls();
    initializeButtons();
});

function loadData(data, config) {
    characterData = data;
    configuration = config;
    console.log(characterData);
    console.log(configuration);
    updateUIFromData();
    updateGenderVisibility();
}

window.loadData = loadData;

function updateUIFromData() {
    if (!characterData.headBlend) return;
    
    const hb = characterData.headBlend;

    updateParentDisplay('shape-first', hb.shapeFirstID);
    updateParentDisplay('shape-second', hb.shapeSecondID);
    updateParentDisplay('skin-first', hb.skinFirstID);
    updateParentDisplay('skin-second', hb.skinSecondID);
    
    const shapeMixSlider = document.getElementById('shape-mix');
    const skinMixSlider = document.getElementById('skin-mix');
    
    if (shapeMixSlider) {
        shapeMixSlider.value = hb.shapeMix;
        const display = shapeMixSlider.parentElement.querySelector('.slider-value');
        if (display) display.textContent = parseFloat(hb.shapeMix).toFixed(2);
    }
    
    if (skinMixSlider) {
        skinMixSlider.value = hb.skinMix;
        const display = skinMixSlider.parentElement.querySelector('.slider-value');
        if (display) display.textContent = parseFloat(hb.skinMix).toFixed(2);
    }
    
    // Eye Color
    const eyeColorInput = document.getElementById('eye-color');
    if (eyeColorInput && characterData.eyeColor !== undefined) {
        eyeColorInput.value = characterData.eyeColor;
    }
    
    // Hair Color
    const hairColorInput = document.getElementById('hair-color');
    if (hairColorInput && characterData.hairColor !== undefined) {
        hairColorInput.value = characterData.hairColor;
    }
    
    // Components
    if (characterData.components) {
        Object.entries(characterData.components).forEach(([compId, data]) => {
            const input = document.getElementById(`comp-${compId}`);
            if (input) input.value = data.drawable;
            
            const texInput = document.getElementById(`comp-${compId}-tex`);
            const texDisplay = document.getElementById(`comp-${compId}-tex-display`);
            if (texInput && data.texture !== undefined) {
                texInput.value = data.texture;
                if (texDisplay) texDisplay.textContent = data.texture;
            }
        });
    }
    
    // Props
    if (characterData.props) {
        Object.entries(characterData.props).forEach(([propId, data]) => {
            const input = document.getElementById(`prop-${propId}`);
            if (input) input.value = data.drawable;
            
            const texInput = document.getElementById(`prop-${propId}-tex`);
            const texDisplay = document.getElementById(`prop-${propId}-tex-display`);
            if (texInput && data.texture !== undefined) {
                texInput.value = data.texture;
                if (texDisplay) texDisplay.textContent = data.texture;
            }
            if(data.drawable == -1)
            {
                const arrowBtns = texDisplay.parentElement.querySelectorAll('.variant-btn');
                arrowBtns.forEach(arrowBtn => {
                    arrowBtn.disabled = true;
                })
            }
        });
    }
    
    // Head Overlays
    if (characterData.headOverlays) {
        Object.entries(characterData.headOverlays).forEach(([overlayId, data]) => {
            const input = document.getElementById(`overlay-${overlayId}`);
            if (input && data.index !== undefined) {
                input.value = data.index;
            }
            
            const opacitySlider = document.getElementById(`overlay-${overlayId}-opacity`);
            if (opacitySlider && data.opacity !== undefined) {
                opacitySlider.value = data.opacity;
                const display = opacitySlider.parentElement.querySelector('.slider-value');
                if (display) display.textContent = parseFloat(data.opacity).toFixed(2);
            }
            
            const color1Input = document.getElementById(`overlay-${overlayId}-color1`);
            if (color1Input && data.firstColor !== undefined) {
                color1Input.value = data.firstColor;
            }
            if(data.index == -1)
            {
                opacitySlider.classList.add('slider-inactive');
                if(color1Input)
                {
                    const arrowBtns = color1Input.parentElement.querySelectorAll('.arrow-btn');
                    arrowBtns.forEach(arrowBtn => {
                        arrowBtn.disabled = true;
                    });
                }
            }
        });
    }
    
    // Face Features
    if (characterData.faceFeatures) {
        Object.entries(characterData.faceFeatures).forEach(([index, scale]) => {
            const featureId = Object.keys(FACE_FEATURES).find(key => FACE_FEATURES[key] == index);
            if (featureId) {
                const slider = document.getElementById(featureId);
                if (slider) {
                    slider.value = scale;
                    const display = slider.parentElement.querySelector('.slider-value');
                    if (display) display.textContent = parseFloat(scale).toFixed(2);
                }
            }
        });
    }
    
    // Gender
    if (characterData.isMale !== undefined) {
        const maleBtn = document.querySelector('.gender-btn[data-gender="male"]');
        const femaleBtn = document.querySelector('.gender-btn[data-gender="female"]');
        
        if (maleBtn && femaleBtn) {
            maleBtn.classList.toggle('active', characterData.isMale);
            femaleBtn.classList.toggle('active', !characterData.isMale);
        }
    }
}

// ===== UPDATE GENDER VISIBILITY =====
function updateGenderVisibility() {
    const isMale = characterData.isMale ?? true;
    
    document.querySelectorAll('.male-only').forEach(el => {
        el.classList.toggle('visible', isMale);
    });
    
    document.querySelectorAll('.female-only').forEach(el => {
        el.classList.toggle('visible', !isMale);
    });
}

// ===== PARENT DISPLAY =====
function updateParentDisplay(targetId, parentId) {
    const display = document.getElementById(`${targetId}-display`);
    if (!display) return;
    const parent = HEAD_BLEND_PARENTS.find(p => p.id === parentId);
    if(!parent) return;
    const parentName = parent.name;
    display.textContent = `${parentId} - ${parentName}`;
    if (targetId === 'shape-first') characterData.headBlend.shapeFirstID = parentId;
    if (targetId === 'shape-second') characterData.headBlend.shapeSecondID = parentId;
    if (targetId === 'skin-first') characterData.headBlend.skinFirstID = parentId;
    if (targetId === 'skin-second') characterData.headBlend.skinSecondID = parentId;
    const targetIds = ['shape-first', 'shape-second', 'skin-first', 'skin-second'];
    if(targetIds.includes(targetId)) updateParentInput(targetId, parentId);
}
function updateParentInput(targetId, parentId)
{
    const input = document.getElementById(targetId)
    input.value = parentId;
}

function initializeTabs() {
    const tabs = document.querySelectorAll('.nav-tab');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.dataset.tab;
            
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(`tab-${tabId}`).classList.add('active');
        });
    });
}

// ===== GENDER SELECTOR =====
function initializeGenderSelector() {
    const genderBtns = document.querySelectorAll('.gender-btn');
    
    genderBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const isMale = btn.dataset.gender === 'male';
            let modelHash = configuration.PLAYER_MODELS.MALE;
            if(!isMale)
            {
                modelHash = configuration.PLAYER_MODELS.FEMALE;
            }
            genderBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            resetCharacterData(isMale, modelHash);
        
            updateUIFromData();
            updateGenderVisibility();

            if (typeof mp !== 'undefined') {
                mp.trigger('client:setPlayerModel', characterData.isMale);
                syncAllDataToClient();
            }
        });
    });
}

// ===== RESET CHARACTER DATA =====
function resetCharacterData(isMale, modelHash) {
    characterData = {
        isMale: isMale,
        model: modelHash,
        components: JSON.parse(JSON.stringify(DEFAULT_VALUES.components)),
        props: JSON.parse(JSON.stringify(DEFAULT_VALUES.props)),
        headOverlays: JSON.parse(JSON.stringify(DEFAULT_VALUES.headOverlays)),
        faceFeatures: {},
        headBlend: JSON.parse(JSON.stringify(DEFAULT_VALUES.headBlend)),
        eyeColor: 0,
        hairColor: 0
    };
    
    // Initialize face features
    for (let i = 0; i <= 19; i++) {
        characterData.faceFeatures[i] = 0;
    }
}

// ===== HEAD BLEND =====
function handleHeadBlendChange() {
    if (typeof mp === 'undefined') return;
    
    const hb = characterData.headBlend;
    mp.trigger('client:setPlayerHeadBlend', 
        hb.shapeFirstID, hb.shapeSecondID, 
        hb.skinFirstID, hb.skinSecondID, 
        hb.shapeMix, hb.skinMix
    );
}

// ===== SLIDERS =====
function initializeSliders() {
    
    ['shape-mix', 'skin-mix'].forEach(sliderId => {
        const slider = document.getElementById(sliderId);
        if (!slider) return;
        
        const valueDisplay = slider.parentElement.querySelector('.slider-value');
        
        slider.addEventListener('input', () => {
            const value = parseFloat(slider.value);
            if (valueDisplay) valueDisplay.textContent = value.toFixed(2);
            
            if (sliderId === 'shape-mix') characterData.headBlend.shapeMix = value;
            if (sliderId === 'skin-mix') characterData.headBlend.skinMix = value;
            
            handleHeadBlendChange();
        });
    });
    
    // Face Features
    Object.entries(FACE_FEATURES).forEach(([featureId, index]) => {
        const slider = document.getElementById(featureId);
        if (!slider) return;
        
        const valueDisplay = slider.parentElement.querySelector('.slider-value');
        
        slider.addEventListener('input', () => {
            const value = parseFloat(slider.value);
            if (valueDisplay) valueDisplay.textContent = value.toFixed(2);
            
            characterData.faceFeatures[index] = value;
            
            if (typeof mp !== 'undefined') {
                mp.trigger('client:setPlayerFaceFeature', index, value);
            }
        });
    });
}

// ===== ARROW CONTROLS =====
function initializeArrowControls() {
    const arrowBtns = document.querySelectorAll('.arrow-btn:not(.variant-btn)');
    
    arrowBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;
            const targetId = btn.dataset.target;
            const input = document.getElementById(targetId);
            
            if (!input) return;
            
            const currentValue = parseInt(input.value);
            const limits = getLimitsForTarget(targetId);
            let newValue = currentValue;
            
            if (action === 'increment') {
                newValue = Math.min(currentValue + (limits.step || 1), limits.max);
            } else {
                newValue = Math.max(currentValue - (limits.step || 1), limits.min);
            }
            
            input.value = newValue;
            
            // Update characterData
            updateCharacterDataFromInput(targetId, newValue);
            
            // Request texture variations for components/props
            if (targetId.startsWith('comp-') && !targetId.includes('-tex')) {
                const compId = parseInt(targetId.replace('comp-', ''));
                if (typeof mp !== 'undefined') {
                    mp.trigger('client:loadNumberOfTextureVariations', compId, newValue);
                }
            }
            
            if (targetId.startsWith('prop-') && !targetId.includes('-tex')) {
                const propId = parseInt(targetId.replace('prop-', ''));
                if (typeof mp !== 'undefined') {
                    mp.trigger('client:loadNumberOfPropTextureVariations', propId, newValue);
                }
            }
        });
    });
}

function initializeVariantControls() {
    const variantBtns = document.querySelectorAll('.variant-btn');
    
    variantBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;
            const targetId = btn.dataset.target;
            const input = document.getElementById(targetId);
            const display = document.getElementById(`${targetId}-display`);
            
            if (!input || !display) return;
            
            const currentValue = parseInt(input.value) || 0;
            const limits = getVariantLimits(targetId);
            let newValue = currentValue;
            
            if (action === 'increment') {
                newValue = Math.min(currentValue + limits.step, limits.max);
            } else {
                newValue = Math.max(currentValue - limits.step, limits.min);
            }
            
            input.value = newValue;
            display.textContent = newValue;
            
            updateCharacterDataFromInput(targetId, newValue);
        });
    });
    
    // Initialize variant displays
    const variantInputs = document.querySelectorAll('input[id$="-tex"]');
    variantInputs.forEach(input => {
        const display = document.getElementById(`${input.id}-display`);
        if (display) {
            display.textContent = input.value;
        }
    });
}

// ===== OVERLAY CONTROLS =====
function initializeOverlayControls() {
    // Opacity sliders
    document.querySelectorAll('.overlay-control input[type="range"]').forEach(slider => {
        const valueDisplay = slider.parentElement.querySelector('.slider-value');
        
        slider.addEventListener('input', () => {
            const value = parseFloat(slider.value);
            if (valueDisplay) valueDisplay.textContent = value.toFixed(2);
            
            const overlayId = parseInt(slider.id.replace('overlay-', '').replace('-opacity', ''));
            if (characterData.headOverlays[overlayId]) {
                characterData.headOverlays[overlayId].opacity = value;
            }
            
            sendOverlayUpdate(overlayId);
        });
    });
    
    // Color inputs
    document.querySelectorAll('.overlay-control input[type="number"]').forEach(input => {
        input.addEventListener('change', () => {
            const value = parseInt(input.value) || 0;
            const parts = input.id.replace('overlay-', '').split('-');
            const overlayId = parseInt(parts[0]);
            const colorType = parts[1];
            console.log(colorType, value, typeof value);
            if (characterData.headOverlays[overlayId]) {
                if (colorType === 'color1') {
                    characterData.headOverlays[overlayId].firstColor = parseInt(value);
                } else if (colorType === 'color2') {
                    characterData.headOverlays[overlayId].secondColor = parseInt(value);
                }
            }
            
            sendOverlayUpdate(overlayId);
        });
    });
}

// ===== CAMERA CONTROLS =====
function initializeCameraControls() {
    // Rotation
    const rotationSlider = document.getElementById('camera-rotation');
    const rotationValue = document.getElementById('camera-rotation-value');
    
    if (rotationSlider && rotationValue) {
        rotationSlider.addEventListener('input', () => {
            const value = parseInt(rotationSlider.value);
            rotationValue.textContent = `${value}°`;
            cameraState.rotation = value;
            
            if (typeof mp !== 'undefined') {
                mp.trigger('client:setPlayerHeading', value);
            }
        });
    }
    
    
    const fovSlider = document.getElementById('camera-fov');
    const fovValue = document.getElementById('camera-fov-value');
    
    if (fovSlider && fovValue) {
        fovSlider.addEventListener('input', () => {
            const value = parseInt(fovSlider.value);
            fovValue.textContent = `${value}°`;
            cameraState.fov = value;
            
            if (typeof mp !== 'undefined') {
                mp.trigger('client:updateCameraFov', value);
            }
        });
    }
    

    document.querySelectorAll('.camera-btn').forEach(btn => {
        if(btn.dataset.position == cameraState.position) {
            btn.classList.add('active');
        }
        btn.addEventListener('click', () => {
            const position = btn.dataset.position;
            cameraState.position = position;
            
            document.querySelectorAll('.camera-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            if (typeof mp !== 'undefined') {
                if(position === "BODY") {
                    mp.trigger('client:setCameraOnPlayerBody');
                } else {
                    mp.trigger('client:setCameraOnPlayerFace');
                }
            }
        });
    });
}


function getLimitsForTarget(targetId) {
    const isMale = characterData.isMale ?? true;
    const genderKey = isMale ? 'male' : 'female';
    

    if (['shape-first', 'shape-second', 'skin-first', 'skin-second'].includes(targetId)) {
        return { min: 0, max: 45, step: 1 };
    }
    

    if (targetId.startsWith('comp-') && !targetId.includes('-tex')) {
        const compId = parseInt(targetId.replace('comp-', ''));
        const compConfig = configuration.COMPONENTS[compId];
        return { 
            min: compConfig[genderKey].min, 
            max: compConfig[genderKey].max, 
            step: 1 
        };
    }
    

    if (targetId.startsWith('comp-') && targetId.includes('-tex')) {
        const compId = parseInt(targetId.replace('comp-', '').replace('-tex', ''));
        const drawableId = characterData.components[compId].drawable;
        const textureLimit = textureLimits[`comp-${compId}-${drawableId}`];
        return { 
            min: 0, 
            max: textureLimit - 1,
            step: 1 
        };
    }
    
    // Props
    if (targetId.startsWith('prop-') && !targetId.includes('-tex')) {
        const propId = parseInt(targetId.replace('prop-', ''));
        const propConfig = configuration.PROPS[propId];
        return { 
            min: propConfig[genderKey].min, 
            max: propConfig[genderKey].max, 
            step: 1 
        };
    }
    
    // Prop textures - dynamic from server
    if (targetId.startsWith('prop-') && targetId.includes('-tex')) {
        const propId = parseInt(targetId.replace('prop-', '').replace('-tex', ''));
        const drawableId = characterData.props[propId].drawable;
        const textureLimit = textureLimits[`prop-${propId}-${drawableId}`];
        return { 
            min: 0, 
            max: textureLimit - 1,
            step: 1 
        };
    }
    
    // Overlays
    if (targetId.startsWith('overlay-') && !targetId.includes('-color') && !targetId.includes('-opacity')) {
        const overlayId = parseInt(targetId.replace('overlay-', ''));
        const overlayConfig = configuration.HEAD_OVERLAYS[overlayId];
        return { min: overlayConfig.min, max: overlayConfig.max, step: 1 };
    }
    
    if(targetId.startsWith('overlay-') && targetId.includes('-color'))
    {
        return {
            min: 0,
            max: configuration.CHARACTER_LIMITS.HEAD_OVERLAY_COLOR_MAX_ID,
            step: 1
        }
    }
    // Hair Color
    if (targetId === 'hair-color') {
        return { 
            min: 0, 
            max: configuration.CHARACTER_LIMITS.HAIR_COLOR_MAX_ID, 
            step: 1 
        };
    }
    
    // Eye Color
    if (targetId === 'eye-color') {
        return { 
            min: 0, 
            max: configuration.CHARACTER_LIMITS.EYE_COLORS_MAX_ID, 
            step: 1 
        };
    }
    
    return { min: 0, max: 100, step: 1 };
}

// ===== GET VARIANT LIMITS =====
function getVariantLimits(targetId) {
    const isMale = characterData.isMale ?? true;
    const genderKey = isMale ? 'male' : 'female';
    
    // Component textures
    if (targetId.startsWith('comp-') && targetId.includes('-tex')) {
        const compId = parseInt(targetId.replace('comp-', '').replace('-tex', ''));
        const drawableId = characterData.components?.[compId]?.drawable ?? 0;
        const textureLimit = textureLimits[`comp-${compId}-${drawableId}`];
        return { 
            min: 0, 
            max: textureLimit !== undefined ? textureLimit - 1 : 50, 
            step: 1 
        };
    }
    
    // Prop textures
    if (targetId.startsWith('prop-') && targetId.includes('-tex')) {
        const propId = parseInt(targetId.replace('prop-', '').replace('-tex', ''));
        const drawableId = characterData.props?.[propId]?.drawable ?? -1;
        const textureLimit = textureLimits[`prop-${propId}-${drawableId}`];
        return { 
            min: 0, 
            max: textureLimit !== undefined ? textureLimit - 1 : 50, 
            step: 1 
        };
    }
    
    return { min: 0, max: 50, step: 1 };
}

// ===== UPDATE characterData FROM INPUT =====
function updateCharacterDataFromInput(targetId, value) {
    // Head Blend
    if (targetId === 'shape-first') {
        characterData.headBlend.shapeFirstID = value;
        updateParentDisplay('shape-first', value);
        handleHeadBlendChange();
        return;
    }
    if (targetId === 'shape-second') {
        characterData.headBlend.shapeSecondID = value;
        updateParentDisplay('shape-second', value);
        handleHeadBlendChange();
        return;
    }
    if (targetId === 'skin-first') {
        characterData.headBlend.skinFirstID = value;
        updateParentDisplay('skin-first', value);
        handleHeadBlendChange();
        return;
    }
    if (targetId === 'skin-second') {
        characterData.headBlend.skinSecondID = value;
        updateParentDisplay('skin-second', value);
        handleHeadBlendChange();
        return;
    }
    
    // Components - RESET TEXTURE TO 0 WHEN CHANGING DRAWABLE
    if (targetId.startsWith('comp-') && !targetId.includes('-tex')) {
        const compId = parseInt(targetId.replace('comp-', ''));
        if (!characterData.components[compId]) {
            characterData.components[compId] = { drawable: 0, texture: 0 };
        }
        characterData.components[compId].drawable = value;
        characterData.components[compId].texture = 0; // RESET TEXTURE TO 0
        
        // Update UI for texture
        const texInput = document.getElementById(`comp-${compId}-tex`);
        const texDisplay = document.getElementById(`comp-${compId}-tex-display`);
        if (texInput) texInput.value = 0;
        if (texDisplay) texDisplay.textContent = '0';
        
        if(texDisplay && texInput)
        {
            if(characterData.components[compId].drawable == -1) {
                const arrowBtns = texDisplay.parentElement.querySelectorAll('.variant-btn');
                arrowBtns.forEach(arrowBtn => {
                arrowBtn.disabled = true;
            });
            } else {
                const arrowBtns = texDisplay.parentElement.querySelectorAll('.variant-btn');
                arrowBtns.forEach(arrowBtn => {
                    arrowBtn.disabled = false;
                });
            }
        }
        if (typeof mp !== 'undefined') {
            mp.trigger('client:setPlayerComponent', compId, value, 0);
        }
        return;
    }
    
    // Component textures
    if (targetId.startsWith('comp-') && targetId.includes('-tex')) {
        const compId = parseInt(targetId.replace('comp-', '').replace('-tex', ''));
        if (!characterData.components[compId]) {
            characterData.components[compId] = { drawable: 0, texture: 0 };
        }
        characterData.components[compId].texture = value;
        
        // Call client event
        const drawable = characterData.components[compId].drawable ?? 0;
        if (typeof mp !== 'undefined') {
            mp.trigger('client:setPlayerComponent', compId, drawable, value);
        }
        return;
    }
    
    // Props - RESET TEXTURE TO 0 WHEN CHANGING DRAWABLE
    if (targetId.startsWith('prop-') && !targetId.includes('-tex')) {
        const propId = parseInt(targetId.replace('prop-', ''));
        if (!characterData.props[propId]) {
            characterData.props[propId] = { drawable: -1, texture: 0 };
        }
        characterData.props[propId].drawable = value;
        characterData.props[propId].texture = 0; // RESET TEXTURE TO 0
        
        // Update UI for texture
        const texInput = document.getElementById(`prop-${propId}-tex`);
        const texDisplay = document.getElementById(`prop-${propId}-tex-display`);
        if (texInput) texInput.value = 0;
        if (texDisplay) texDisplay.textContent = '0';
        
        if(characterData.props[propId].drawable == -1) {
            const arrowBtns = texDisplay.parentElement.querySelectorAll('.variant-btn');
            arrowBtns.forEach(arrowBtn => {
                arrowBtn.disabled = true;
            });
        } else {
            const arrowBtns = texDisplay.parentElement.querySelectorAll('.variant-btn');
            arrowBtns.forEach(arrowBtn => {
                arrowBtn.disabled = false;
            });
        }
        if (typeof mp !== 'undefined') {
            mp.trigger('client:setPlayerProp', propId, value, 0);
        }
        return;
    }
    
    // Prop textures
    if (targetId.startsWith('prop-') && targetId.includes('-tex')) {
        const propId = parseInt(targetId.replace('prop-', '').replace('-tex', ''));
        if (!characterData.props[propId]) {
            characterData.props[propId] = { drawable: -1, texture: 0 };
        }
        characterData.props[propId].texture = value;
        
        // Call client event
        const drawable = characterData.props[propId].drawable ?? -1;
        if (typeof mp !== 'undefined') {
            mp.trigger('client:setPlayerProp', propId, drawable, value);
        }
        return;
    }
    
    // Overlays - RESET OPACITY/COLORS WHEN CHANGING INDEX
    if (targetId.startsWith('overlay-') && !targetId.includes('-color') && !targetId.includes('-opacity')) {
        const overlayId = parseInt(targetId.replace('overlay-', ''));
        if (!characterData.headOverlays[overlayId]) {
            characterData.headOverlays[overlayId] = { index: 0, opacity: 1, firstColor: 0, secondColor: 0 };
        }
        characterData.headOverlays[overlayId].index = value;
        
        // RESET opacity and colors to defaults
        characterData.headOverlays[overlayId].firstColor = 0;
        characterData.headOverlays[overlayId].secondColor = 0;
        
        // Update UI for opacity
        const opacitySlider = document.getElementById(`overlay-${overlayId}-opacity`);
        const opacityDisplay = opacitySlider?.parentElement.querySelector('.slider-value');
        if (opacitySlider) {
            if(characterData.headOverlays[overlayId].index >= 0) {
                characterData.headOverlays[overlayId].opacity = 1;
                opacitySlider.value = characterData.headOverlays[overlayId].opacity;
                if (opacityDisplay) opacityDisplay.textContent = characterData.headOverlays[overlayId].opacity.toFixed(2);
            } else {
                characterData.headOverlays[overlayId].opacity = 0;
                opacitySlider.value = characterData.headOverlays[overlayId].opacity;
                if (opacityDisplay) opacityDisplay.textContent = characterData.headOverlays[overlayId].opacity.toFixed(2);
            }
        }
        
        const color1Input = document.getElementById(`overlay-${overlayId}-color1`);
        if (color1Input) color1Input.value = 0;
        
        if(characterData.headOverlays[overlayId].index == -1) {
            opacitySlider.classList.add('slider-inactive');
            if(color1Input) {
                const arrowBtns = color1Input.parentElement.querySelectorAll('.arrow-btn');
                arrowBtns.forEach(arrowBtn => {
                    arrowBtn.disabled = true;
                });
            }
        } else {
            opacitySlider.classList.remove('slider-inactive');
            if(color1Input) {
                const arrowBtns = color1Input.parentElement.querySelectorAll('.arrow-btn');
                arrowBtns.forEach(arrowBtn => {
                    arrowBtn.disabled = false;
                });
            }
        }
        sendOverlayUpdate(overlayId);
        return;
    }
    if (targetId.startsWith('overlay-') && targetId.includes('-color'))
    {
        const colorInput = document.getElementById(targetId);
        const event = new Event("change");
        colorInput.dispatchEvent(event);
        colorInput.value = value;
    }
    
    // Hair Color
    if (targetId === 'hair-color') {
        characterData.hairColor = value;
        if (typeof mp !== 'undefined') {
            mp.trigger('client:setPlayerHairColor', value);
        }
        return;
    }
    
    // Eye Color
    if (targetId === 'eye-color') {
        characterData.eyeColor = value;
        if (typeof mp !== 'undefined') {
            mp.trigger('client:setPlayerEyesColor', value);
        }
        return;
    }
}

// ===== SEND OVERLAY UPDATE =====
function sendOverlayUpdate(overlayId) {
    if (typeof mp === 'undefined') return;
    
    const overlay = characterData.headOverlays[overlayId];
    if (!overlay) return;
    
    mp.trigger('client:setPlayerHeadOverlay', 
        overlayId, 
        overlay.index ?? 0, 
        overlay.opacity ?? 1, 
        overlay.firstColor ?? 0, 
        overlay.secondColor ?? 0
    );
}

// ===== SYNC ALL DATA TO CLIENT =====
function syncAllDataToClient() {
    if (typeof mp === 'undefined') return;
    handleHeadBlendChange();
    Object.entries(characterData.components || {}).forEach(([compId, data]) => {
        mp.trigger('client:setPlayerComponent', parseInt(compId), data.drawable, data.texture);
    });
    Object.entries(characterData.props || {}).forEach(([propId, data]) => {
        mp.trigger('client:setPlayerProp', parseInt(propId), data.drawable, data.texture);
    });
    Object.entries(characterData.headOverlays || {}).forEach(([overlayId, data]) => {
        sendOverlayUpdate(parseInt(overlayId));
    });
    Object.entries(characterData.faceFeatures || {}).forEach(([index, scale]) => {
        mp.trigger('client:setPlayerFaceFeature', parseInt(index), scale);
    });
    mp.trigger('client:setPlayerEyesColor', characterData.eyeColor);
    mp.trigger('client:setPlayerHairColor', characterData.hairColor);
}

function initializeButtons() {
    const btnClose = document.getElementById('btn-close');
    const btnCreate = document.getElementById('btn-create');
    
    if (btnClose) {
        btnClose.addEventListener('click', () => {
            if (typeof mp !== 'undefined') {
                mp.trigger('client:exitCharacterCreator');
            }
        });
    }
    
    if (btnCreate) {
        btnCreate.addEventListener('click', () => {
            if (typeof mp !== 'undefined') {
                mp.trigger('client:saveAppearance', JSON.stringify(characterData));
            }
        });
    }
}

if (typeof mp !== 'undefined') {
    mp.events.add('browser:loadCharacterCreatorData', (data, config) => {
        loadData(data, config);
    });

    mp.events.add('browser:setNumberOfTextureVariations', (componentId, drawableId, numberOfTextures) => {
        textureLimits[`comp-${componentId}-${drawableId}`] = numberOfTextures;
    });
    
    mp.events.add('browser:setNumberOfPropTextureVariations', (propId, drawableId, numberOfTextures) => {
        textureLimits[`prop-${propId}-${drawableId}`] = numberOfTextures;
    });
}