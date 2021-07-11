import Player from './Player.ts';

export default class Mob extends Player {

    public pv: number;

    constructor(id: string, name: string, color: string, x: number, y: number, pv: number) {
        super(id, name, color, x, y);
        this.pv = pv;
    }

}
