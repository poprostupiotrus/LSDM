const apiClient = require('./api.client');
class OutfitApi {
    async createOutfit(player, characterData)
    {
        return await apiClient.request({
            method: "POST",
            url: "/outfit",
            data: characterData,
            headers: {
                Authorization: `Bearer ${player.runtime.token}`
            }
        });
    }
    async updateOutfit(player, characterData)
    {
        return await apiClient.request({
            method: "PUT",
            url: "/outfit",
            data: characterData,
            headers: {
                Authorization: `Bearer ${player.runtime.token}`
            }
        });
    }
    async getUserOutfit(player)
    {
        return await apiClient.request({
            method: "GET",
            url: "/outfit",
            headers: {
                Authorization: `Bearer ${player.runtime.token}`
            }
        });
    }
}
module.exports = new OutfitApi();