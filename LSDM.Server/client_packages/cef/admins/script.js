const adminListElement = document.querySelector('#adminList');
let allAdmins = [];
function loadAdmins(admins) {
    allAdmins = Array.isArray(admins) ? admins : [];
    renderAdmins();
}

function renderAdmins() {
    if (allAdmins.length === 0) {
        adminListElement.innerHTML = '';
        return;
    }

    let html = '';
    allAdmins.forEach(admin => {
        const safeName = admin.name
        const safeRole = admin.role
        const safeId = admin.id

        html += `
            <div class="admin-item">
                <div class="admin-name">${safeName}</div>
                <div class="admin-role">${safeRole}</div>
                <div class="admin-id"><span>${safeId}</span></div>
            </div>
        `;
    });
    adminListElement.innerHTML = html;
}

function closeMenu() {
    if (typeof mp !== "undefined") {
        mp.trigger("client:adminsMenuClose");
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'k' || e.key === 'K') {
        closeMenu();
    }
});