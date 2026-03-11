class PlayerUtils
{
    getPlayerById(playerId)
    {
        return mp.players.at(playerId);
    }
}
module.exports = new PlayerUtils();