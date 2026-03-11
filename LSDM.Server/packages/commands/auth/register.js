const authManager = require('../../systems/auth/authManager');
const COLORS = require('../../config/colors');
mp.events.addCommand("register", async (player, fullText, username, password) => {
    if (player.runtime.logged)
        return player.outputChatBox("Jesteś już zalogowany");
    if (!username || !password)
        return player.outputChatBox("Użycie: /register nazwa_uzytkownika haslo");
    const result = await authManager.register(player, username, password);
    if(result.success)
    {
        player.outputChatBox(result.message);
    } else {
        player.outputChatBox(result.message);
        if (result.errors?.length)
            result.errors.forEach(e => player.outputChatBox(`${COLORS.RED}${e}`));
    }
});