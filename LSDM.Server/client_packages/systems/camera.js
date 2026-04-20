class CameraManager {
    constructor() {
        this.currentCamera = null;
    }

    handleCreate(config) {
        this.destroyCamera();
        this.createCamera(config);
        if (this.currentCamera) {
            this.setActive();
        }
    }

    handleDestroy() {
        this.destroyCamera();
    }

    createCamera(config) {
        if (!config || !config?.name || !config?.position || !config?.fov) return;
        const rotation = config.rotation ?? new mp.Vector3(0, 0, 0);
        const camera = mp.cameras.new(
            config.name,
            config.position,
            rotation,
            config.fov
        );
        if (config.pointsAt) {
            camera.pointAtCoord(
                config.pointsAt.x,
                config.pointsAt.y,
                config.pointsAt.z
            );
        }
        this.currentCamera = camera;
    }

    setActive() {
        if (!this.currentCamera) return;
        this.currentCamera.setActive(true);
        mp.game.cam.renderScriptCams(true, false, 0, true, false);
    }

    destroyCamera() {
        if (!this.currentCamera) return;
        this.currentCamera.destroy();
        this.currentCamera = null;
        mp.game.cam.renderScriptCams(false, false, 0, true, false);
    }
    setFov(fov) {
        if(!(fov >= 1.0 && fov <= 130)) return;
        this.currentCamera.setFov(fov);
    }
    setCameraPosition(posX, posY, posZ)
    {
        this.currentCamera.setCoord(posX, posY, posZ);
    }
    setCameraPointsAt(posX, posY, posZ)
    {
        this.currentCamera.pointAtCoord(posX, posY, posZ);
    }
}

const cameraManager = new CameraManager();

mp.events.add("client:createCamera", (config) => {
    cameraManager.handleCreate(config);
});

mp.events.add("client:destroyCamera", () => {
    cameraManager.handleDestroy();
});
mp.events.add("client:updateCameraFov", (fov) => {
    if(!Number.isFinite(fov)) return;
    cameraManager.setFov(fov);
})

exports.cameraManager = cameraManager;