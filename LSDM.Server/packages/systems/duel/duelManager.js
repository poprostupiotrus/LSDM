const playerUtils = require('../../utils/playerUtils');

class DuelManager {
    constructor() {
        this.pendingRequests = new Map();
        this.duels = new Map();
    }

    createRequest(player, challengedPlayerId) {
        if (challengedPlayerId === player.id) {
            player.outputChatBox("!{#ff0000} Nie możesz wyzwania samego siebie!");
            return;
        }
        if (this.pendingRequests.has(player.id)) {
            player.outputChatBox("!{#ff0000} Masz już aktywne wyzwanie!");
            return;
        }
        const challengedPlayer = playerUtils.getPlayerById(challengedPlayerId);
        if (!challengedPlayer) {
            player.outputChatBox(`!{#ff0000} Gracz o ID: ${challengedPlayerId} nie istnieje`);
            return;
        }
        const timeoutId = setTimeout(() => {
            this.pendingRequests.delete(player.id);
            player.outputChatBox("!{#ffaa00} Wyzwanie wygasło!");
            challengedPlayer.outputChatBox(`!{#ffaa00} Wyzwanie od ${player.name} wygasło!`);
        }, 8000);
        this.pendingRequests.set(player.id, {
            challengedPlayerId,
            timeoutId
        });
        player.outputChatBox(`!{#FFD000} Wysłano wyzwanie do ${challengedPlayer.name}!`);
        challengedPlayer.outputChatBox(`!{#FFD000} ${player.name} wyzwania cię do duela!`);
        challengedPlayer.outputChatBox(`!{#ffffff} Napisz /acceptduel ${player.id} aby przyjąć`);
    }

    acceptRequest(player, challengerPlayerId) {
        const challengerPlayer = playerUtils.getPlayerById(challengerPlayerId);
        if (!challengerPlayer) {
            player.outputChatBox(`!{#ff0000} Gracz o ID: ${challengerPlayerId} nie istnieje`);
            return;
        }
        const request = this.pendingRequests.get(challengerPlayerId);
        if (!request || request.challengedPlayerId !== player.id) {
            player.outputChatBox(`!{#ff0000} Gracz o ID: ${challengerPlayerId} nie wysłał ci zaproszenia!`);
            return;
        }
        clearTimeout(request.timeoutId);
        this.pendingRequests.delete(challengerPlayerId);
        player.outputChatBox(`!{#00ff00} Przyjąłeś wyzwanie od ${challengerPlayer.name}!`);
        challengerPlayer.outputChatBox(`!{#00ff00} ${player.name} przyjął wyzwanie!`);
        this.createDuel(player, challengerPlayer);
    }

    createDuel(player1, player2, config = {}) {
        if (this.duels.has(`${player1.id}-${player2.id}`)) {
            return null;
        }
        const duel = new Duel({
            challengerPlayer: player1,
            challengedPlayer: player2,
            spawnPositions: config.spawnPositions || [
                new mp.Vector3(200, 300, 100),
                new mp.Vector3(200, 300, 100)
            ],
            maxScore: config.maxScore || 5
        });
        duel.startRound();
        this.duels.set(duel.id, duel);
    }

    cleanupDuel(duelId) {
        const duel = this.duels.get(duelId);
        if (duel) {
            this.duels.delete(duelId);
        }
    }

    getDuelByPlayer(playerId) 
    {
        for (const duel of this.duels.values()) {
            if (duel.hasPlayer(playerId)) {
                return duel;
            }
        }
        return null;
    }
    
    handlePlayerQuit(player) {
        const duel = this.getDuelByPlayer(player.id);
        if (duel) {
            duel.endDuel(null);
        }
        if (this.pendingRequests.has(player.id)) {
            const request = this.pendingRequests.get(player.id);
            if (request.timeoutId) {
                clearTimeout(request.timeoutId);
            }
            this.pendingRequests.delete(player.id);
        }
        for (const [challengerId, request] of this.pendingRequests) {
            if (request.challengedPlayerId === player.id) {
                if (request.timeoutId) {
                    clearTimeout(request.timeoutId);
                }
                this.pendingRequests.delete(challengerId);
                
                const challenger = playerUtils.getPlayerById(challengerId);
                if (challenger) {
                    challenger.outputChatBox(`!{#ffaa00} ${player.name} rozłączył się!`);
                }
            }
        }
    }
}

module.exports = new DuelManager();