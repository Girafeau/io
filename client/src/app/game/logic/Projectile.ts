import Physic from './Physic';

export default class Projectile {

  public x: number;
  public y: number;
  readonly angle: number;
  private readonly speed: number;
  public width: number;
  public height: number;
  private readonly mass: number;
  private v: { x: number; y: number };
  public old: { x: number; y: number };
  public shooter: string;

  public constructor(x: number, y: number, angle: number, shooter: string) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = 50;
    this.width = 4;
    this.height = 4;
    this.mass = 5;
    this.v = {
      x: this.speed * Math.cos(this.angle),
      y: this.speed * Math.sin(this.angle)
    };
    this.old = {
      x: this.x,
      y: this.y
    };
    this.shooter = shooter;
  }

  public move(): void {
    this.old.x = this.x;
    this.old.y = this.y;
    const a = {
      x: (-Physic.WIND.FRICTION * this.v.x + Physic.WIND.FRICTION * Physic.WIND.V.X) / this.mass,
      y: (-Physic.WIND.FRICTION * this.v.y + Physic.WIND.FRICTION * Physic.WIND.V.Y) / this.mass
    };
    this.v.x = a.x * Physic.DELTA + this.v.x;
    this.v.y = a.y * Physic.DELTA + this.v.y;
    this.x = 1 / 2 * a.x * Math.pow(Physic.DELTA, 2) + this.v.x * Physic.DELTA + this.x;
    this.y = 1 / 2 * a.y * Math.pow(Physic.DELTA, 2) + this.v.y * Physic.DELTA + this.y;
  }


}
