import Room from "./Room.ts";

export default class Game {

    rooms: Room [];

    constructor() {
        this.rooms = [];
    }

    addRoom(room : Room): void {
        this.rooms.push(room);
    }

    findRoom(id: string): Room | undefined {
        return this.rooms.find((room: Room) => room.id === id);
    }
}
