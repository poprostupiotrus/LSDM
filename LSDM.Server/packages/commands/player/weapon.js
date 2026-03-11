const WEAPONS = require('../../config/weapons');
mp.events.addCommand("weapon", (player, fullText, weaponName, ammo) => {
    if (!weaponName || !ammo) {
        player.outputChatBox("Użycie: /weapon [nazwa broni] [ilość amunicji]");
        return;
    }
    const ammountAmmo = parseInt(ammo);
    if (isNaN(ammountAmmo)) {
        player.outputChatBox("Podano nieprawidłową ilość amunicji");
        return;
    }
    if(ammountAmmo <= 0)
    {
        player.outputChatBox("Podano nieprawidłową ilość amunicji");
        return;
    }
    player.giveWeapon(mp.joaat(weaponName), ammountAmmo);
    player.outputChatBox(`Otrzymałeś broń ${weaponName}.`);
});