import Player from './Player';
import Key from '../utils/Key';
import Projectile from './Projectile';
import Physic from './Physic';
import Remote from '../net/Remote';
import Utils from '../utils/Utils';
import View from '../view/View';

export default class Self extends Player {

  public v: {
    x: number;
    y: number;
  };
  public old: {
    x: number;
    y: number;
  };
  public readonly speed: number;
  public respawnTime: number;
  public timer: number;

  public constructor(id: string, name: string, color: string, x: number, y: number) {
    super(id, name, color, x, y);
    this.v = {
      x: 5,
      y: 5
    };
    this.old = {
      x: super.x,
      y: super.y
    };
    this.speed = 10;
    this.respawnTime = 500;
    this.timer = 500;
  }

  public move(): void {
    if (Key.KEYS[Key.KEY_UP]) {
      if (this.v.y > -this.speed) {
        this.v.y--;
      }
    }

    if (Key.KEYS[Key.KEY_DOWN]) {
      if (this.v.y < this.speed) {
        this.v.y++;
      }
    }
    if (Key.KEYS[Key.KEY_RIGHT]) {
      if (this.v.x < this.speed) {
        this.v.x++;
      }
    }
    if (Key.KEYS[Key.KEY_LEFT]) {
      if (this.v.x > -this.speed) {
        this.v.x--;
      }
    }

    this.v.y *= Physic.FRICTION;
    this.y += this.v.y;
    this.v.x *= Physic.FRICTION;
    this.x += this.v.x;

    if (this.x >= View.WIDTH - 5) {
      this.x = View.WIDTH;
    } else if (this.x <= 5) {
      this.x = 5;
    }

    if (this.y > View.HEIGHT - 5) {
      this.y = View.HEIGHT - 5;
    } else if (this.y <= 5) {
      this.y = 5;
    }

    this.x = Math.round(this.x * 10) / 10;
    this.y = Math.round(this.y * 10) / 10;

    if (this.x !== this.old.x || this.y !== this.old.y) {
      Remote.notify('move', {
        id: this.id,
        x: this.x,
        y: this.y
      });
    }

    this.old = {
      x: this.x,
      y: this.y
    };
  }

  public fire(x: number, y: number): void {
    if (this.refill === this.refillMax && !this.dead) {
      const slope: number = (y - this.y ) / (x - this.x );
      let angle: number = Math.atan(slope);
      if ( x - this.x < 0){
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
      projectile.x + this.width > this.x &&
      projectile.y < this.y + this.height &&
      projectile.height + projectile.y > this.y) || (d1 >= d2 - this.width && d1 <= d2 + this.width)) && projectile.shooter !== this.id;
  }

  public kill(): void {
    this.dead = true;
    Remote.notify('die', {
      id: this.id
    });
  }
}
