const {freezePlayerPosition} = require('./utils/player');
mp.events.add("client:freezePlayer", (toggle) => {
    freezePlayerPosition(toggle);
});