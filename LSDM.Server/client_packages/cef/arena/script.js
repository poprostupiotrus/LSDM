const arenaListElement = document.querySelector('#arenaList');

function loadArenas(arenas) {
    let html = '';
    arenas.forEach(arena => {
        const isFull = arena.players >= arena.maxPlayers;
        const playerColor = isFull ? 'rgba(255, 80, 80, 0.9)' : 'rgba(255, 208, 0, 0.9)';
        
        html += `
            <div class="arena ${isFull ? 'arena-full' : ''}">
                <div class="arena-info">
                    <span class="arena-name">${escapeHtml(arena.name)}</span>
                    <span class="arena-players">
                        Gracze: <span style="color: ${playerColor}">${arena.players}</span> / ${arena.maxPlayers}
                        ${isFull ? ' <span style="color: rgba(255,80,80,0.8); font-size: 0.75rem;">(PEŁNA)</span>' : ''}
                    </span>
                </div>
                <button class="join" onclick="joinArena(${arena.id})">
                    <img src="./img/join.png" class="icon" alt="Join">
                </button>
            </div>
        `;
    });
    arenaListElement.innerHTML = html;
}

function joinArena(id) {
    if (typeof mp !== "undefined") {
        mp.trigger("client:arenaJoin", id);
    }
}

function closeMenu() {
    if (typeof mp !== "undefined") {
        mp.trigger("client:arenaMenuClose");
    }
}
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'k') {
        closeMenu();
    }
});