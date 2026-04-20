const { setCollision } = require('./utils/player');
mp.events.add('client:setCollision', (enabled) => {
    setCollision(enabled);
});