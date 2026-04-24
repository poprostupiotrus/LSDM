let adminsMenuBrowser = null;
mp.events.add("client:openAdminsMenu", (admins) => {
    adminsMenuBrowser = mp.browsers.new("http://package/cef/admins/index.html");
    adminsMenuBrowser.execute(`loadAdmins(${JSON.stringify(admins)});`);
    mp.gui.cursor.show(true, true);
});

mp.events.add("client:adminsMenuClose", () => {
    if(adminsMenuBrowser) {
        adminsMenuBrowser.destroy();
        adminsMenuBrowser = null;
    }
    mp.gui.cursor.show(false, false);
});