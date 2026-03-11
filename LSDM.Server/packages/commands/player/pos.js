mp.events.addCommand("pos", (player) => {
    const x = player.position.x;
    const y = player.position.y;
    const z = player.position.z;
    console.log(`{ x: ${x}, y: ${y}, z: ${z} },`);
})