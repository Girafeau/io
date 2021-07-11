import Player from './Player';


export default class Mob extends Player {

  public pv: number;

  public constructor(id: string, name: string, color: string, x: number, y: number, score: number, pv: number) {
    super(id, name, color, x, y, score);
    this.pv = pv;
  }

}
