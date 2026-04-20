const LOCATION_TYPES = require('../../config/locationTypes');
class Arena {
    constructor(config) {
        this.id = config.id;
        this.name = config.name;
        this.virtualWorld = config.virtualWorld;
        this.spawnPoints = config.spawnPoints;
        this.weaponLoadout = config.weaponLoadout;
        this.position = config.position;
        this.arenaSize = config.arenaSize;
        this.colShape = mp.colshapes.newRectangle(this.position.x, this.position.y, this.arenaSize.width, this.arenaSize.height, this.virtualWorld);  
        this.players = [];
        this.maxPlayers = config.maxPlayers;
        this.deathTimeouts = new Map();
    }

    addPlayer(player) {
        if (this.players.length >= this.maxPlayers) {
            return false;
        }
        this.players.push(player);
        player.dimension = this.virtualWorld;
        player.runtime.location = { type: LOCATION_TYPES.ARENA, arenaId: this.id };
        this.respawnPlayer(player);
        this.giveLoadout(player);
        return true;
    }

    removePlayer(player) {
        const index = this.players.indexOf(player);
        if (index > -1) {
            this.players.splice(index, 1);
        }
        if(this.deathTimeouts.has(player.id)) {
            clearTimeout(this.deathTimeouts.get(player.id));
            this.deathTimeouts.delete(player.id);
        }
        player.removeAllWeapons();
        player.runtime.location = { type: LOCATION_TYPES.LOBBY };
        player.dimension = 0;
    }

    respawnPlayer(player) {
        const randomSpawn = this.getRandomSpawnPoint();
        player.spawn(randomSpawn);
        player.health = 100;
        player.armour = 100;
    }

    getRandomSpawnPoint() {
        const spawn = this.spawnPoints[Math.floor(Math.random() * this.spawnPoints.length)];
        return new mp.Vector3(spawn.x, spawn.y, spawn.z);
    }
    giveLoadout(player) {
        player.removeAllWeapons();
        this.weaponLoadout.forEach(weapon => {
            player.giveWeapon(Number(weapon.weapon), weapon.ammo);
        });
    }
    isFull() {
        return this.players.length >= this.maxPlayers;
    }
    onPlayerDeath(player) {
        setTimeout(() => {
            if (this.players.includes(player)) {
                this.respawnPlayer(player);
                this.giveLoadout(player);
            }
        }, 2500);
    }
    onPlayerExitArenaArea(player, shape)
    {
        if(shape !== this.colShape) return;
        if(!this.players.includes(player)) return;
        if(this.deathTimeouts.has(player.id)) return;
        player.outputChatBox("Opuściłeś obszar areny. Masz 5 sekund, żeby na nią wrócić.");
        const timeoutId = setTimeout(() => {
            if(this.players.includes(player)) {
                this.deathTimeouts.delete(player.id);
                player.health = 0;
                player.outputChatBox("Nie wróciłeś na czas! Zginąłeś.");
            }
        }, 5000);
        this.deathTimeouts.set(player.id, timeoutId);
    }
    onPlayerEnterArenaArea(player, shape)
    {
        if(shape !== this.colShape) return;
        if(!this.players.includes(player)) return;
        if(this.deathTimeouts.has(player.id)) {
            clearTimeout(this.deathTimeouts.get(player.id));
            this.deathTimeouts.delete(player.id);
            player.outputChatBox("Wróciłeś na arenę! Timeout anulowany.");
        }
    }
    onPlayerQuit(player) {
        if(this.deathTimeouts.has(player.id)) {
            clearTimeout(this.deathTimeouts.get(player.id));
            this.deathTimeouts.delete(player.id);
        }
        const index = this.players.indexOf(player);
        if (index > -1) {
            this.players.splice(index, 1);
        }
    }
}
module.exports = Arena;