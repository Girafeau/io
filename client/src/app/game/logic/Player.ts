import Game from './Game';

export default class Player {

  public id: string;
  public name: string;
  public color: string;
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public dead: boolean;
  public refill: number;
  public refillMax: number;

  public constructor(id: string, name: string, color: string, x: number, y: number) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 10;
    this.dead = false;
    this.refill = 100;
    this.refillMax = 100;
  }

  public setPosition(x, y): void {
    this.x = x;
    this.y = y;
  }
}
