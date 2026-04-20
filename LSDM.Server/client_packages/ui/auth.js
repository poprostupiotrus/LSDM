const { setPlayerComponent } = require('./utils/player');
const { PLAYER_MODELS } = require('./config/playerModels');
let authBrowser = null;
mp.events.add('client:openAuthForm', () => {
    authBrowser = mp.browsers.new("http://package/cef/auth/index.html");
    setTimeout(() => {
        mp.gui.cursor.show(true, true);
    }, 500);
    mp.events.call('client:showGtaUi', false);
    mp.events.call('client:freezePlayer', true);
});
mp.events.add("client:closeAuthForm", () => {
    closeAuthForm();
    mp.events.call('client:destroyCamera');
    mp.events.call('client:openHud');
    mp.events.call('client:showGtaUi', true);
    mp.events.call('client:freezePlayer', false);
    const hour = 12;
    const minute = 0;
    mp.events.call("client:setTime", hour, minute);
});
mp.events.add('client:playerLogin', (username, password) => {
    if(authBrowser)
    {
        mp.events.callRemote('server:playerLogin', username, password);
    }
});
mp.events.add('client:playerRegister', (username, password) => {
    if(authBrowser)
    {
        mp.events.callRemote('server:playerRegister', username, password);
    }
});
mp.events.add('client:loginResult', (success, message) => {
    if(authBrowser)
    {
        authBrowser.call('browser:loginResult', success, message);
    }
});
mp.events.add('client:registerResult', (success, message) => {
    if(authBrowser)
    {
        authBrowser.call('browser:registerResult', success, message);
    }
});
function closeAuthForm()
{
    if (authBrowser) {
        authBrowser.destroy();
        authBrowser = null;
    }
    mp.gui.cursor.show(false, false);
}