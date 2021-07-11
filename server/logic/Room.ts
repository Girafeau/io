import Player from "./Player.ts";
import Mob from './Mob.ts';

export default class Room {

    id: string;
    players: Player [];
    mobs: Mob [];

    constructor(id: string) {
        this.id = id;
        this.players = [];
        this.mobs = [];
    }

    updateScore(shooter: string) {
        const player = this.players.find(player => player.id === shooter);
        if (player) {
            player.score += 1;
        }
    }

    addPlayer(player: Player) {
        this.players.push(player);
    }

    removePlayer(id: string) {
        this.players = this.players.filter(player => player.id !== id);
    }

    updatePlayerPosition(id: string, x: number, y: number): Player | undefined {
        const player = this.players.find((player: Player) => player.id === id);
        if(player) {
            player.setPosition(x, y);
        }
        return player;
    }

    updatePlayerState(id: string, dead: boolean): Player | undefined {
        const player = this.players.find((player: Player) => player.id === id);
        if(player) {
            player.dead = dead;
        }
        return player;
    }
}
