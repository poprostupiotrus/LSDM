exports.toggleHud = (toggle) => {
    mp.game.ui.displayHud(toggle);
};

exports.toggleChat = (toggle) => {
    mp.gui.chat.show(toggle);
    mp.gui.chat.activate(toggle);
};

exports.toggleRadar = (toggle) => {
    mp.game.ui.displayRadar(toggle);
};