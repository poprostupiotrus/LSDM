const COLORS = require('../../config/colors');
const playerUtils = require('../../utils/playerUtils');
mp.events.addCommand("admins", adminsCommandHandler);
function adminsCommandHandler(player) {
    const admins = playerUtils.getAdmins();
    const adminsDto = admins.map((admin) => {
        console.log(admin.id);
        return { name: admin.name, role: admin.runtime.role, id: admin.id} ;
    });
    player.call("client:openAdminsMenu", [adminsDto]);
}