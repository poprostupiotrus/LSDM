const authApi = require('../../api/auth.api');
class AuthManager {

    async register(player, username, password) 
    {
        try {
            const data = await authApi.register(player, username, password);
            player.runtime.token = data.token;
            player.runtime.uid = data.id;
            player.runtime.role = data.role;
            player.runtime.loggedIn = true;
            player.name = username;
            player.runtime.kills = data.kills;
            player.runtime.deaths = data.deaths;
            player.runtime.hasOutfit = false;
            return { success: true, message: "Udało ci się pomyślnie zarejestrować."}
    
        } catch (error) {
            return { success: false, message: error.message, errors: error.errors}
        }    
    }

    async login(player, username, password) 
    {
        const playerWithUsername = mp.players.toArray().find(p => p.name === username);
        if(playerWithUsername && playerWithUsername.runtime.loggedIn) {
            return { success: false, message: "Użytkownik o tej nazwie jest już zalogowany."}
        }
        try {
    
            const data = await authApi.login(player, username, password);
            player.runtime.token = data.token;
            player.runtime.uid = data.id;
            player.runtime.role = data.role;
            player.runtime.loggedIn = true;
            player.name = username;
            player.runtime.kills = data.kills;
            player.runtime.deaths = data.deaths;
            player.runtime.hasOutfit = data.hasOutfit;
            return { success: true, message: "Udało ci się pomyślnie zalogować."}
    
        } catch (error) {
            return { success: false, message: error.message, errors: error.errors}
        }
    }
}

module.exports = new AuthManager();