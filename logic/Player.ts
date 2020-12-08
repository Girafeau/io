export default class Player {

    id: string;
    name: string;
    color: string;
    dead: boolean;
    private x: number;
    private y: number;

    constructor(id: string, name: string, color: string, x: number, y: number) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.x = x;
        this.y = y;
        this.dead = false;
    }

    setPosition(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }
}
