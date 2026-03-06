const apiClient = require('./api.client');
class BanApi
{
    async banUser(player, bannedByPlayer, reason, dateTime)
    {
        return await apiClient.request({
            method: "POST",
            url: `/users/${player.uid}/ban`,
            headers: {
                Authorization: `Bearer ${bannedByPlayer.runtime.token}`
            },
            data: {
                reason: reason,
                bannedUntil: dateTime
            }
        });
    }
}
module.exports = new BanApi();
