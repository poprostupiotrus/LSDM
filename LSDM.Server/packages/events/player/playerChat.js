const COLORS = require('../../config/colors');
mp.events.add("playerChat", (player, message) => {
    mp.players.broadcast(`${COLORS.ORANGE}[LSDM:Chat] ${COLORS.WHITE}${player.name} [ID: ${player.id}]: ${message}`);
});