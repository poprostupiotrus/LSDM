mp.events.add('client:test', () => {
    const player = mp.players.local;
    mp.console.logInfo("TEST", true, true);
    Object.entries(player).forEach(([key, value]) => {
        mp.console.logInfo(`PLAYER KEY: ${key}`, true, true);
        mp.console.logInfo(`PLAYER VALUE: ${value}`, true, true);
    })
});