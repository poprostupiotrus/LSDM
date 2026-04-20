const authManager = require('../../systems/auth/authManager');
const COLORS = require('../../config/colors');
const outfitApi = require('../../api/outfit.api');
const characterMapper = require('../../api/mappers/characterMapper');
const Character = require('../../systems/character_creator/character');
mp.events.addCommand("login", async (player, fullText, username, password) => {
    if (player.runtime.logged)
        return player.outputChatBox("Jesteś już zalogowany");
    if (!username || !password)
        return player.outputChatBox("Użycie: /login nazwa_uzytkownika haslo");
    const result = await authManager.login(player, username, password);
    if(result.success)
    {
        player.outputChatBox(result.message);
    } else {
        player.outputChatBox(result.message);
        if (result.errors?.length)
            result.errors.forEach(e => player.outputChatBox(`${COLORS.RED}${e}`));
    }
});