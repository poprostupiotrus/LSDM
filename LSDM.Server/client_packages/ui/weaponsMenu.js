const { WEAPONS } = require('./config/weapons');
let weaponsMenuBrowser = null;
mp.events.add("client:openWeaponsMenu", () => {
    weaponsMenuBrowser = mp.browsers.new("http://package/cef/weapons/index.html");
    weaponsMenuBrowser.execute(`loadWeapons(${JSON.stringify(WEAPONS)});`);
    mp.gui.cursor.show(true, true);
});

mp.events.add("client:giveWeapon", (id) => {
    mp.events.callRemote('server:giveWeapon', id);
});

mp.events.add("client:weaponMenuClose", () => {
    if(weaponsMenuBrowser) {
        weaponsMenuBrowser.destroy();
        weaponsMenuBrowser = null;
    }
    mp.gui.cursor.show(false, false);
});