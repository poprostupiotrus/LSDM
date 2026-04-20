const { enableFlyMode } = require('./admin/fly');
mp.events.add('client:enableFlyMode', (enabled) => {
    enableFlyMode(enabled);
})