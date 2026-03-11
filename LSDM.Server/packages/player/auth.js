const authApi = require('../api/auth.api');
mp.events.add("playerJoin", (player) => {

    player.runtime = {
        token: null,
        logged: false
    };
    player.outputChatBox("Zarejestruj się: /register nazwa_uzytkownika haslo");
    player.outputChatBox("Lub zaloguj się: /login nazwa_uzytkownika haslo");
});

mp.events.addCommand("register", async (player, fullText, name, password) => {
    if (player.runtime.logged)
        return player.outputChatBox("Jesteś już zalogowany");
    if (!name || !password)
        return player.outputChatBox("Użycie: /register nazwa_uzytkownika haslo");
    try {
        const data = await authApi.register(player, name, password);
        player.runtime.token = data.token;
        player.runtime.uid = data.id;
        player.runtime.role = data.role;
        player.runtime.logged = true;
        player.outputChatBox("Zarejestrowano i zalogowano!");

    } catch (error) {
        player.outputChatBox(`~r~${error.message}`);
        if (error.errors?.length)
            error.errors.forEach(e => player.outputChatBox(`~r~${e}`));
    }
});

mp.events.addCommand("login", async (player, fullText, name, password) => {

    if (player.runtime.logged)
        return player.outputChatBox("Jesteś już zalogowany");
    if (!name || !password)
        return player.outputChatBox("Użycie: /login nazwa_uzytkownika haslo");
    try {

        const data = await authApi.login(player, name, password);
        player.runtime.token = data.token;
        player.runtime.uid = data.id;
        player.runtime.role = data.role;
        player.runtime.logged = true;
        player.runtime.kills = data.kills;
        player.runtime.deaths = data.deaths;
        player.outputChatBox("Zalogowano!");

    } catch (error) {
        player.outputChatBox(`~r~${error.message}`);
        if (error.errors?.length)
            error.errors.forEach(e => player.outputChatBox(`~r~${e}`));
    }
});