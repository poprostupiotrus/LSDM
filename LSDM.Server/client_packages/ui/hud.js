let hudBrowser = null;
mp.events.add("client:openHud", () => {
    hudBrowser = mp.browsers.new("http://package/cef/hud/index.html");
});

mp.events.add("client:closeHud", () => {
    if(hudBrowser)
    {
        hudBrowser.destroy();
        hudBrowser = null;
    }
})

mp.events.add('client:showInfo', (message) => {
    if(hudBrowser)
    {
        hudBrowser.call("browser:showInfo", message);
    }
});
    
mp.events.add('client:showSuccess', (message) => {
    if(hudBrowser)
    {
        hudBrowser.call("browser:showSuccess", message);
    }
});
    
mp.events.add('client:showWarning', (message) => {
    if(hudBrowser)
    {
        hudBrowser.call("browser:showWarning", message);
    }
});
    
mp.events.add('client:showError', (message) => {
    if(hudBrowser)
    {
        hudBrowser.call("browser:showError", message);
    }
});