import Player from './Player';
import Projectile from './Projectile';
import Self from './Self';
import Listener from '../utils/Listener';
import Remote from '../net/Remote';
import View from '../view/View';

export default class Game {

  private listener: Listener;
  public self: Self;
  public enemies: Player [];
  public projectiles: Projectile [];

  public constructor() {
    this.listener = new Listener(this);
    this.projectiles = [];
    this.enemies = [];
    this.setSelf('none', 'none', 'green', 0, 0);
  }

  public init(): void {
    this.listener.init();
  }

  public update(): void {
    if (this.self.refill < this.self.refillMax) {
      this.self.refill++;
    }
    if (this.self.timer > 0 && this.self.dead) {
      this.self.timer--;
    }
    if (this.self.timer <= 0 && this.self.dead) {
      this.self.dead = false;
      this.self.timer = this.self.respawnTime;
      Remote.notify('respawn', {
        id: this.self.id
      });
    }
    if (!this.self.dead) {
      this.self.move();
    }
    this.projectiles.forEach((projectile, index, object) => {
      projectile.move();
      const isOut: boolean = projectile.x > View.WIDTH || projectile.x < 0 || projectile.y > View.HEIGHT || projectile.y < 0;
      const isNotMoving: boolean = projectile.old.x === projectile.x && projectile.y === projectile.old.y;
      if ( isOut || isNotMoving ) {
        object.splice(index, 1);
      }
      if (this.self.hit(projectile)) {
        this.self.kill();
      }
    });
  }

  public setSelf(id: string, name: string, color: string, x: number, y: number): void {
    this.self = new Self(id, name, color, x , y);
  }

  public addEnemy(id: string, name: string, color: string, x: number, y: number): void {
    const player: Player = new Player(id, name, color, x, y);
    this.enemies.push(player);
  }

  public addProjectile(x: number, y: number, angle: number, id: string): void {
    const projectile: Projectile = new Projectile(x, y, angle, id);
    this.projectiles.push(projectile);
  }

  public removeEnemy(id: string): void {
    this.enemies = this.enemies.filter(e => e.id !== id);
  }

  public updateEnemyPosition(id: string, x: number, y: number): void {
    const enemy: Player = this.enemies.find(e => e.id === id);
    if (enemy) {
      enemy.setPosition(x, y);
    }
  }

  public updateEnemyState(id: string, dead: boolean): void {
    const enemy: Player = this.enemies.find(e => e.id === id);
    if (enemy) {
      enemy.dead = dead;
    }
  }
}
