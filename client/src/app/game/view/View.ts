import Game from '../logic/Game';

export default class View {

  public constructor(game: Game, canvas, width: number, height: number) {
    View.HEIGHT = height;
    View.WIDTH = width;
    this.game = game;
    this.canvas = canvas;
  }
  public static HEIGHT;
  public static WIDTH;
  private game: Game;
  private canvas;

  public render(): void {
    this.canvas.fillStyle = 'rgba(255,255,255,0.3)';

    this.canvas.clearRect(0, 0, View.WIDTH, View.HEIGHT);
    this.canvas.beginPath();
    if (this.game.self.dead) {
      this.canvas.font = '60px Indie Flower';
      this.canvas.fillStyle = 'black';
      this.canvas.fillText('YOU\'RE DEAD', 200, 200);
      this.canvas.fillText('Respawn in :', 200, 300);
      this.canvas.fillText(this.game.self.timer, 200, 400);
    }
    this.canvas.font = '20px Indie Flower';
    this.game.enemies.forEach(enemy => {
      this.canvas.beginPath();
      this.canvas.beginPath();
      this.canvas.fillStyle = enemy.color;
      if (enemy.dead) {
        this.canvas.fillStyle = 'black';
      }
      if (enemy.taunt) {
        this.canvas.fillText(' ̿ ̿̿\'̿̿\\̵͇̿̿\\=(•̪●)=/̵͇̿̿/\'̿̿ ̿ ̿ ', enemy.x - 50, enemy.y - 40, 100);
      }
      this.canvas.arc(enemy.x, enemy.y, enemy.width, 0, Math.PI * 2);
      this.canvas.fill();
      this.canvas.fillStyle = 'black';
      this.canvas.fillText(`${enemy.name}`, enemy.x - 50, enemy.y  + 35, 100);
    });
    this.canvas.beginPath();
    this.canvas.fillStyle = 'black';
    this.canvas.fillText(`${this.game.self.x}`, this.game.self.x - 15, this.game.self.y - 40, 30);
    this.canvas.fillText(`${this.game.self.y}`, this.game.self.x - 15, this.game.self.y - 20, 30);
    this.canvas.fillText(`${this.game.self.name}`, this.game.self.x - 50, this.game.self.y  + 50, 100);
    this.canvas.fillStyle = this.game.self.color;
    if (this.game.self.taunt) {
      this.canvas.fillStyle = 'black';
      this.canvas.fillText(' ̿ ̿̿\'̿̿\\̵͇̿̿\\=(•̪●)=/̵͇̿̿/\'̿̿ ̿ ̿', this.game.self.x - 50, this.game.self.y - 80, 100);
    }
    this.canvas.arc(this.game.self.x, this.game.self.y, this.game.self.width, 0, Math.PI * 2);
    this.canvas.fill();
    this.canvas.fillStyle = 'grey';
    this.canvas.fillRect(this.game.self.x - 15, this.game.self.y + 20, 30, 5);
    this.canvas.fillStyle = 'red';
    this.canvas.fillRect(this.game.self.x - 15, this.game.self.y + 20, this.game.self.refill * 30 / this.game.self.refillMax, 5);
    this.game.projectiles.forEach(projectile => {
      this.canvas.beginPath();
      this.canvas.fillStyle = 'black';
      this.canvas.arc(projectile.x, projectile.y, projectile.width, 0, Math.PI * 2);
      this.canvas.fill();
/*
      this.canvas.lineCap = 'round';
      this.canvas.lineWidth = 4;
      this.canvas.setLineDash([5, 20]);
      this.canvas.lineTo(projectile.old.x, projectile.old.y);
      this.canvas.lineTo(projectile.x, projectile.y);
      this.canvas.stroke();
*/
    });
  }

  public init(): void {

  }
}
