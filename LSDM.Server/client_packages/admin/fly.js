let flyMode = false;

function getForwardVector(rotZ) {
    const rad = rotZ * Math.PI / 180;
    return {
        x: -Math.sin(rad),
        y: Math.cos(rad)
    };
}

function getRightVector(rotZ) {
    const rad = rotZ * Math.PI / 180;
    return {
        x: Math.cos(rad),
        y: Math.sin(rad)
    };
}

exports.enableFlyMode = (enabled) => {
    flyMode = enabled;
}

setInterval(() => {
    if (!flyMode) return;
    const camRot = mp.game.cam.getGameplayCamRot(2);
    const player = mp.players.local;
    mp.players.local.setHeading(camRot.z);
    let speed = mp.keys.isDown(0x10) ? 2 : 1; // SHIFT
    const rot = player.getRotation(2);
    const forward = getForwardVector(rot.z);
    const right = getRightVector(rot.z);
    const velocityVector = {x: 0, y: 0, z: 0};

    if (mp.keys.isDown(0x57)) { // W
        velocityVector.x += forward.x * speed;
        velocityVector.y += forward.y * speed;
    }
    if (mp.keys.isDown(0x53)) { // S
        velocityVector.x -= forward.x * speed;
        velocityVector.y -= forward.y * speed;
    }

    // A / D → lewo / prawo
    if (mp.keys.isDown(0x41)) { // A
        velocityVector.x -= right.x * speed;
        velocityVector.y -= right.y * speed;
    }
    if (mp.keys.isDown(0x44)) { // D
        velocityVector.x += right.x * speed;
        velocityVector.y += right.y * speed;
    }
    
    // Z osobno (góra/dół)
    if (mp.keys.isDown(0x20)) velocityVector.z += speed; // SPACE
    if (mp.keys.isDown(0x11)) velocityVector.z -= speed; // CTRL

    mp.events.callRemote('server:movePlayerInFlyMode', velocityVector);
}, 20);
