export default class Player {

    public id: string;
    public name: string;
    color: string;
    dead: boolean;
    x: number;
    y: number;
    score: number;

    constructor(id: string, name: string, color: string, x: number, y: number) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.x = x;
        this.y = y;
        this.dead = false;
        this.score = 0;
    }

    setPosition(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }
}
