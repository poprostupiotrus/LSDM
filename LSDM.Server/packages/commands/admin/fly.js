mp.events.addCommand("fly", (player) => {

    player.runtime.flyMode = !player.runtime.flyMode;
    if(player.runtime.flyMode) {
        player.call('client:setCollision', [false]);
        player.call('client:enableFlyMode', [true]);
    } else {
        player.call('client:setCollision', [true]);
        player.call('client:enableFlyMode', [false]);
    }
})