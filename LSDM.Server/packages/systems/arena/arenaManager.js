const Arena = require('./arena.js');
const ArenaConfig = require('./config.js');
const LOCATION_TYPES = require('../../config/locationTypes.js');

class ArenaManager {
    constructor() {
        this.arenas = new Map();
        this.initializeArenas();
    }
    initializeArenas() {
        ArenaConfig.ARENAS.forEach(arenaConfig => {
            const arena = new Arena(arenaConfig);
            this.arenas.set(arena.id, arena);
        });
        
        console.log(`[ArenaManager] Zainicjalizowano ${this.arenas.size} aren`);
    }
    getArena(arenaId) {
        return this.arenas.get(arenaId);
    }
    getArenas() {
        return Array.from(this.arenas.values());
    }
    joinArena(player, arenaId) {
        const arena = this.getArena(arenaId);

        if(player.runtime.location.type !== LOCATION_TYPES.LOBBY)
        {
            player.outputChatBox(`!{#ff0000} Musisz być w lobby, aby móc wejść na arene.`);
            return false;
        }
        
        if (!arena) {
            player.outputChatBox(`!{#ff0000} Arena nie istnieje!`);
            return false;
        }

        if (arena.isFull()) {
            player.outputChatBox(`!{#ff0000} Arena jest pełna!`);
            return false;
        }

        if (arena.addPlayer(player)) {
            player.outputChatBox(`!{#00ff00} Dołączono do areny: ${arena.name}`);
            player.outputChatBox(`!{#00ffff} Gracze: ${arena.players.length}/${arena.maxPlayers}`);
            return true;
        }
        
        return false;
    }
    leaveArena(player) {
        if (!player.runtime.location || player.runtime.location.type !== LOCATION_TYPES.ARENA) {
            return false;
        }
        const arena = this.getArena(player.runtime.location.arenaId);
        if (arena) {
            arena.removePlayer(player);
            player.outputChatBox(`!{#ffaa00} Opuszczono arenę`);
            this.teleportToLobby(player);
            return true;
        }
        return false;
    }
    handlePlayerDeath(player) {
        if (player.runtime.location && player.runtime.location.type === LOCATION_TYPES.ARENA) {
            const arena = this.getArena(player.runtime.location.arenaId);
            if (arena) {
                arena.onPlayerDeath(player);
            }
        }
    }
    handleExitArenaArena(player, shape)
    {
        const arena = this.getArena(player.runtime.location.arenaId);
        if(arena)
        {
            arena.onPlayerExitArenaArea(player, shape);
        }
    }
    handleEnterArenaArena(player, shape)
    {
        const arena = this.getArena(player.runtime.location.arenaId);
        if(arena)
        {
            arena.onPlayerEnterArenaArea(player, shape);
        }
    }
    handlePlayerQuit(player)
    {
        const arena = this.getArena(player.runtime.location.arenaId);
        if(arena)
        {
            arena.onPlayerQuit(player);
        }
    }
    teleportToLobby(player) {
        const lobbySpawn = new mp.Vector3(200, 300, 100);
        player.spawn(lobbySpawn);
        player.dimension = 0;
        player.runtime.location = { type: LOCATION_TYPES.LOBBY };
    }
    getStats() {
        const stats = [];
        this.arenas.forEach(arena => {
            stats.push({
                id: arena.id,
                name: arena.name,
                players: arena.players.length,
                maxPlayers: arena.maxPlayers
            });
        });
        return stats;
    }
}
module.exports = new ArenaManager();