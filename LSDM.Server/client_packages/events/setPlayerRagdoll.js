const { setPlayerRagdoll } = require('./utils/player');
mp.events.add('client:setPlayerRagdoll', (enabled) => {
    setPlayerRagdoll(enabled);
});