const apiClient = require('./api.client');
class AuthApi {
    async login(player, username, password)
    {
        return await apiClient.request({
            method: "POST",
            url: "/auth/login",
            data: {
                username: username,
                password: password,
                socialClubId: player.rgscId,
                hwid: player.serial,
                ipAddress: player.ip
            }
        });
    }
    async register(player, username, password)
    {
        return await apiClient.request({
            method: "POST",
            url: "/auth/register",
            data: {
                username: username,
                password: password,
                socialClubId: player.rgscId,
                hwid: player.serial,
                ipAddress: player.ip
            }
        });
    }
}
module.exports = new AuthApi();