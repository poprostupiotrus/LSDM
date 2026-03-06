const apiClient = require('./api.client');
class UsersApi {
    async getAll(player, params = {})
    {
        return await apiClient.request({
            method: "GET",
            url: `/users`,
            headers: {
                Authorization: `Bearer ${player.runtime.token}`
            },
            params: params
        });
    }
}
module.exports = new UsersApi();