import { nanoid } from "https://deno.land/x/nanoid/mod.ts"
import Game from "../logic/Game.ts";
import Room from "../logic/Room.ts";
import Player from "../logic/Player.ts";
import { name, color } from "../utils/generator.ts";

export class Manager {

    private clients: Map<any, any>;
    private game: Game;

    constructor() {
        this.game = new Game();
        this.clients = new Map<any, any>();
    }

    init() {
        setInterval(() => {
            try {
                this.clients.forEach((value: any, socket: any) => {
                    try {
                        this.ping(socket);
                    } catch(e) {
                        console.log(e);
                    }
                });
            } catch(e) {
                console.log(e);
            }
        }, 15000);
    }

    disconnect(sock: any) {
        const values = this.clients.get(sock);
        let room = this.game.findRoom(values.room);
        this.clients.delete(sock);
        if(room) {
            room.removePlayer(values.id);
            this.clients.forEach((value: any, socket: any) => {
                socket.send(values.room + '@leaver@' + JSON.stringify({
                    id: values.id
                }));
            });
        }
    }

    handle(room: string, message: string, object: any, sock: any): void {
        if (message === 'connect') {
            let id = nanoid(10);
            this.clients.set(sock, {
                id: id,
                room: room
            });
            let existence = this.game.findRoom(room);
            const player = new Player(id, name(), color(), 0, 0);
            if(existence) {
                sock.send(room + '@enemies@' + JSON.stringify(existence.players));
            } else {
                existence = new Room(room);
                this.game.addRoom(existence);
            }
            existence.addPlayer(player);
            this.clients.forEach((value: any, socket: any) => {
                if(value.room === room && value.id !== id) {
                    socket.send(room + '@player@' + JSON.stringify(player));
                }
            });
            sock.send(room + '@self@' + JSON.stringify(player));
        }
        if (message === 'move') {
            let existence = this.game.findRoom(room);
            if(existence) {
                let player = existence.updatePlayerPosition(object.id, object.x, object.y);
                if (player) {
                    this.clients.forEach((value: any, socket: any) => {
                        if (value.room === room && value.id !== object.id) {
                            socket.send(room + '@moved@' + JSON.stringify({id: object.id,
                                x: object.x,
                                y: object.y}));
                        }
                    });
                }
            }
        }
        if (message === 'fire') {
            this.clients.forEach((value: any, socket: any) => {
                if (value.room === room) {
                    socket.send(room + '@fired@' + JSON.stringify(object));
                }
            });
        }
        if (message === 'die') {
            let existence = this.game.findRoom(room);
            if(existence) {
                existence.updatePlayerState(object.id, true);
                this.clients.forEach((value: any, socket: any) => {
                    if (value.room === room) {
                        socket.send(room + '@died@' + JSON.stringify(object));
                    }
                });
            }
        }
        if (message === 'respawn') {
            let existence = this.game.findRoom(room);
            if(existence) {
                existence.updatePlayerState(object.id, true);
                this.clients.forEach((value: any, socket: any) => {
                    if (value.room === room) {
                        socket.send(room + '@respawned@' + JSON.stringify(object));
                    }
                });
            }
        }
        if (message === 'taunt') {
            this.clients.forEach((value: any, socket: any) => {
                if (value.room === room) {
                    socket.send(room + '@taunted@' + JSON.stringify(object));
                }
            });
        }
        if (message === 'untaunt') {
            this.clients.forEach((value: any, socket: any) => {
                if (value.room === room) {
                    socket.send(room + '@untaunted@' + JSON.stringify(object));
                }
            });
        }
    }

    private ping(sock: any) {
        sock.send("2");
    }
}
