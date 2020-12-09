import Player from "./Player.ts";

export default class Room {

    id: string;
    players: Player [];

    constructor(id: string) {
        this.id = id;
        this.players = [];
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
