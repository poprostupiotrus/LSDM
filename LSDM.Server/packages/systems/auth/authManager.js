const authApi = require('../../api/auth.api');
class AuthManager {

    async register(player, username, password) 
    {
        try {
            const data = await authApi.register(player, username, password);
            player.runtime.token = data.token;
            player.runtime.uid = data.id;
            player.runtime.role = data.role;
            player.runtime.logged = true;
            player.name = username;
            player.runtime.kills = data.kills;
            player.runtime.deaths = data.deaths;
            return { success: true, message: "Udało ci się pomyślnie zarejestrować."}
    
        } catch (error) {
            return { success: false, message: error.message, errors: error.errors}
        }    
    }

    async login(player, username, password) 
    {
        try {
    
            const data = await authApi.login(player, username, password);
            player.runtime.token = data.token;
            player.runtime.uid = data.id;
            player.runtime.role = data.role;
            player.runtime.logged = true;
            player.name = username;
            player.runtime.kills = data.kills;
            player.runtime.deaths = data.deaths;
            return { success: true, message: "Udało ci się pomyślnie zalogować."}
    
        } catch (error) {
            return { success: false, message: error.message, errors: error.errors}
        }
    }
}

module.exports = new AuthManager();