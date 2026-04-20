const {setPlayerHeadingOffset, setPlayerHeading} = require('./utils/player');

mp.events.add('client:setPlayerHeadingOffset', () => {
    setPlayerHeadingOffset();
});
mp.events.add('client:setPlayerHeading', (rotZ) => {
    if(!Number.isFinite(rotZ)) return;
    setPlayerHeading(rotZ);
});