const playerUtils = require('../../utils/playerUtils');
const duelManager = require('./duelManager');
const WORLD_OFFSETS = require('../../config/worldOffsets');
class Duel {
    constructor(config) {
        this.id = `${config.challengerPlayer.id}-${config.challengedPlayer.id}`;
        this.challengerPlayer = config.challengerPlayer;
        this.challengedPlayer = config.challengedPlayer;
        this.virtualWorld = WORLD_OFFSETS.DUEL + config.challengerPlayer.id;
        this.spawnPositions = config.spawnPositions;
        this.scores = {
            [config.challengerPlayer.id]: 0,
            [config.challengedPlayer.id]: 0
        };
        this.maxScore = config.maxScore;
        this.challengerPlayer.dimension = this.virtualWorld;
        this.challengedPlayer.dimension = this.virtualWorld;
    }
    startRound() {
        const randomPositions = this.spawnPositions
            .sort(() => Math.random() - 0.5)
            .slice(0, 2);
        this.challengerPlayer.spawn(randomPositions[0]);
        this.challengedPlayer.spawn(randomPositions[1]);
        const health = 100;
        const armour = 100;
        playerUtils.setPlayerHealthAndArmour(this.challengerPlayer, health, armour);
        playerUtils.setPlayerHealthAndArmour(this.challengedPlayer, health, armour);
        this.giveWeapons(this.challengerPlayer);
        this.giveWeapons(this.challengedPlayer);
    }

    giveWeapons(player) {
        player.removeAllWeapons();
        player.giveWeapon(0x5EF9FEC4, 100);
        player.giveWeapon(0x2BE6766B, 200);
    }

    addScore(player) {
        this.scores[player.id]++;
        this.challengerPlayer.outputChatBox(`!{#ffffff} Wynik: ${this.scores[this.challengerPlayer.id]} - ${this.scores[this.challengedPlayer.id]}`);
        this.challengedPlayer.outputChatBox(`!{#ffffff} Wynik: ${this.scores[this.challengerPlayer.id]} - ${this.scores[this.challengedPlayer.id]}`);
    }

    hasPlayer(playerId) {
        return this.challengerPlayer.id === playerId || 
               this.challengedPlayer.id === playerId;
    }

    onPlayerDeath(victim, killer) {
        this.addScore(killer);
        if (this.scores[killer.id] >= this.maxScore) {
            this.endDuel(killer);
            return;
        }
        setTimeout(() => { this.startRound(); }, 3000);
    }
    endDuel(winner) {
        this.winner = winner;
        if (winner) {
            this.challengerPlayer.outputChatBox(`!{#00ff00} ${winner.name} wygrał duel!`);
            this.challengedPlayer.outputChatBox(`!{#00ff00} ${winner.name} wygrał duel!`);
        } else {
            this.challengerPlayer.outputChatBox(`!{#ffaa00} Duel zakończony (rozłączenie)`);
            this.challengedPlayer.outputChatBox(`!{#ffaa00} Duel zakończony rozłączenie)`);
        }
        if (playerUtils.playerExists(this.challengerPlayer.id)) {
            this.challengerPlayer.dimension = worldConfig.WORLD_OFFSETS.LOBBY;
        }
        if (playerUtils.playerExists(this.challengedPlayer.id)) {
            this.challengedPlayer.dimension = worldConfig.WORLD_OFFSETS.LOBBY;
        }
        duelManager.cleanupDuel(this.id);
    }
}

module.exports = Duel;