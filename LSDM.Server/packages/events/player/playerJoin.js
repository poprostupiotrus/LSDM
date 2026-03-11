const LOCATION_TYPES = require('../../config/locationTypes');
mp.events.add("playerJoin", (player) => {
    player.runtime = {
        token: null,
        logged: false,
        location: { type: LOCATION_TYPES.LOBBY }
    };
    player.outputChatBox("Zarejestruj się: /register nazwa_uzytkownika haslo");
    player.outputChatBox("Lub zaloguj się: /login nazwa_uzytkownika haslo");
});