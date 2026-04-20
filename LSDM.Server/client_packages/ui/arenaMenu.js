let arenaBrowser = null;
let arenaArray = []
mp.events.add("client:openArenaMenu", (arenas) => {
    arenaBrowser = mp.browsers.new("http://package/cef/arena/index.html");
    arenaBrowser.execute(`loadArenas(${JSON.stringify(arenas)});`);
    mp.gui.cursor.show(true, true);
});

mp.events.add("client:arenaJoin", (arenaId) => {
    mp.events.callRemote('server:joinArena', arenaId);
});

mp.events.add("client:arenaMenuClose", () => {
    closeArenaMenu();
});

mp.events.add("client:playerJoinedArena", () => {
    closeArenaMenu();
});
function closeArenaMenu()
{
    if (arenaBrowser) {
        arenaBrowser.destroy();
        arenaBrowser = null;
    }
    mp.gui.cursor.show(false, false);
}