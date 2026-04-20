const {toggleHud, toggleChat, toggleRadar} = require('./utils/ui');
mp.events.add("client:showGtaUi", (toggle) => {
    toggleHud(toggle);
    toggleChat(toggle);
    toggleRadar(toggle);
});