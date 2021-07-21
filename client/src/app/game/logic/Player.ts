import Game from './Game';
import Projectile from './Projectile';
import Remote from '../net/Remote';
import Utils from '../utils/Utils';
import Obstacle from './Obstacle';

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

  public fire(x: number, y: number): void {
    if (this.refill === this.refillMax && !this.dead) {
      const slope: number = (y - this.y ) / (x - this.x );
      let angle: number = Math.atan(slope);
      if ( x - this.x < 0) {
        angle = angle + Math.PI;
      }
      const projectile: Projectile = new Projectile(this.x, this.y, angle, this.id);
      this.refill = 0;
      Remote.notify('fire', {
        x: projectile.x,
        y: projectile.y,
        angle: projectile.angle,
        shooter: projectile.shooter,
      });
    }
  }

  public hit(projectile: Projectile): boolean {
    const d1: number = Utils.distance(projectile.old.x, projectile.old.y, this.x, this.y) +
      Utils.distance(projectile.x, projectile.y, this.x, this.y);
    const d2: number = Utils.distance(projectile.old.x, projectile.old.y, projectile.x, projectile.y);
    return ((projectile.x < this.x + this.width &&
      projectile.x + projectile.width > this.x &&
      projectile.y < this.y + this.height &&
      projectile.height + projectile.y > this.y) || (d1 >= d2 - this.width && d1 <= d2 + this.width)) && projectile.shooter !== this.id;
  }

  public kill(shooter: string): void {
    this.dead = true;
    Remote.notify('die', {
      id: this.id,
      shooter
    });
  }
}
