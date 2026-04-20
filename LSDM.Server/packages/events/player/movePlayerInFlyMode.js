mp.events.add('server:movePlayerInFlyMode', (player, velocity) => {
    if(!player.runtime.flyMode) return;
    const pos = player.position;
    player.position = new mp.Vector3(
        pos.x + velocity.x,
        pos.y + velocity.y,
        pos.z + velocity.z
    );
});