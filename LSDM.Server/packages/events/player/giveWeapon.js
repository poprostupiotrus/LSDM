const WEAPONS = require('../../config/weapons1');
const playerUtils = require('../../utils/playerUtils');
mp.events.add('server:giveWeapon', (player, id) => {
    if(!playerUtils.isPlayerInFreeroam(player)) return;
    const weapon = WEAPONS.find(w => w.id === id);
    if(!weapon) return;
    const ammo = 9999;
    player.giveWeapon(mp.joaat(id), ammo);
});