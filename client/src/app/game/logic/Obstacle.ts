import Projectile from './Projectile';
import Utils from '../utils/Utils';

export default class Obstacle {
  public x: number;
  public y: number;
  public width: number;
  public height: number;

  public constructor(x: number, y: number, width: number, height: number) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
  }

  public hit(projectile: Projectile): boolean {
    return (projectile.x < this.x + this.width &&
      projectile.x + projectile.width > this.x &&
      projectile.y < this.y + this.height &&
      projectile.height + projectile.y > this.y);
  }
}
