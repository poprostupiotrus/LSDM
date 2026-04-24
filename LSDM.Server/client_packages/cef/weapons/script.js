const weaponListElement = document.querySelector('#weaponList');
const searchInput = document.querySelector('#weaponSearch');
const clearBtn = document.querySelector('#clearSearch');

let allWeapons = [];

function loadWeapons(weapons) {
    allWeapons = Array.isArray(weapons) ? weapons : [];
    filterAndRenderWeapons('');
}

function filterAndRenderWeapons(searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    const filtered = allWeapons.filter(w => w.name.toLowerCase().includes(term));

    let html = '';
    if (filtered.length === 0) {
        weaponListElement.innerHTML = ''; // Uruchamia CSS :empty::before
        return;
    }

    filtered.forEach(weapon => {
        const safeName = escapeHtml(weapon.name);
        const safeId = escapeHtml(weapon.id);

        html += `
            <div class="weapon">
                <div class="weapon-info">
                    <span class="weapon-name">${safeName}</span>
                    <span class="weapon-hash">ID: <span>${safeId}</span></span>
                </div>
                <button class="select" onclick="giveWeapon('${safeId}')">WEŹ</button>
            </div>
        `;
    });
    weaponListElement.innerHTML = html;
}

searchInput.addEventListener('input', (e) => {
    const term = e.target.value;
    clearBtn.style.display = term.length > 0 ? 'block' : 'none';
    filterAndRenderWeapons(term);
});

function clearSearch() {
    searchInput.value = '';
    clearBtn.style.display = 'none';
    filterAndRenderWeapons('');
    searchInput.focus();
}

function giveWeapon(id) {
    if (typeof mp !== "undefined") {
        mp.trigger("client:giveWeapon", id);
    }
}

function closeMenu() {
    if (typeof mp !== "undefined") {
        mp.trigger("client:weaponMenuClose");
    }
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'k' || e.key === 'K') {
        closeMenu();
    }
});