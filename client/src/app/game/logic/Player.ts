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
  public taunt: boolean;
  public refill: number;
  public refillMax: number;
  public score: number;

  public constructor(id: string, name: string, color: string, x: number, y: number, score: number) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 20;
    this.dead = false;
    this.refill = 50;
    this.refillMax = 50;
    this.taunt = false;
    this.score = score;
  }

  public setPosition(x, y): void {
    this.x = x;
    this.y = y;
  }
}
