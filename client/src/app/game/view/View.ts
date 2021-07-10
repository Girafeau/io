import Game from '../logic/Game';
import {parseGIF, decompressFrames} from 'gifuct-js';

export default class View {

  public static FONT = 'Ubuntu';
  public static HEIGHT;
  public static WIDTH;

  public constructor(game: Game, canvas, width: number, height: number, nativeElement: any) {
    View.HEIGHT = height;
    View.WIDTH = width;
    this.game = game;
    this.canvas = canvas;
    this.numStars = 2000;
    this.element = nativeElement;
    this.radius = '0.' + Math.floor(Math.random() * 9) + 1  ;
  }

  private element;
  private readonly numStars: number;
  private game: Game;
  private canvas;
  private stars;
  private scores;
  private readonly radius: string;
  private mouseX: any;
  private mouseY: any;


  public render(): void {
    this.drawMap();
    this.drawBackground();
    this.drawSelf();
    this.drawText();
    this.drawEnemies();
    this.drawProjectiles();
    this.drawScore();
  }

  private drawBackground(): void {
    for (let i = 0; i < this.numStars; i++) {
      const star = this.stars[i];
      star.z--;
      if (star.z <= 0){
        star.z = View.WIDTH;
      }
    }
    let pixelX = 0;
    let pixelY = 0;
    let pixelRadius = 0;
    this.canvas.fillStyle = 'rgba(0,10,20,1)';
    this.canvas.fillRect(0, 0, View.WIDTH, View.HEIGHT);
    this.canvas.fillStyle = 'rgba(209, 255, 255, ' + this.radius + ')';
    for (let i = 0; i < this.numStars; i++) {
      const star = this.stars[i];
      pixelX = (star.x - View.WIDTH / 2) * (View.WIDTH * 2 / star.z);
      pixelX += View.WIDTH / 2;
      pixelY = (star.y - View.HEIGHT / 2) * (View.WIDTH * 2 / star.z);
      pixelY += View.HEIGHT / 2;
      pixelRadius = (View.WIDTH * 2 / star.z);
      this.canvas.fillRect(pixelX, pixelY, pixelRadius, pixelRadius);
      this.canvas.fillStyle = 'rgba(209, 255, 255, ' + star.o + ')';
    }
  }

  public drawText(): void {
    if (this.game.self.dead) {
      this.canvas.fillStyle = 'white';
      this.canvas.font = '60px ' + View.FONT;
      this.canvas.fillText('You\'ve been destroyed. 💥', 200, 300);
      this.canvas.fillText('Repair in :', 200, 400);
      this.canvas.fillText(String(this.game.self.timer), 200, 500);
      this.canvas.font = '20px ' + View.FONT;
    }
  }

  public drawMap(): void {
    this.canvas.clearRect(0, 0, View.WIDTH, View.HEIGHT);
  }

  public drawSelf(): void {
    this.canvas.fillStyle = 'white';
    if (this.game.self.dead) {
      this.canvas.fillStyle = 'red';
    }
    this.canvas.beginPath();
    this.canvas.moveTo(this.game.self.x - this.game.self.width, this.game.self.y + this.game.self.width);
    this.canvas.lineTo(this.game.self.x + this.game.self.width, this.game.self.y + this.game.self.width);
    this.canvas.lineTo(this.game.self.x, this.game.self.y - this.game.self.width);
    this.canvas.closePath();
    this.canvas.fill();
    this.canvas.fillStyle = 'white';
    this.canvas.font = '15px ' + View.FONT;
    this.canvas.fillText(`${this.game.self.x}`, this.game.self.x - 20, this.game.self.y - 45);
    this.canvas.fillText(`${this.game.self.y}`, this.game.self.x - 20, this.game.self.y - 25);
    this.canvas.fillText(`${this.game.self.name}`, this.game.self.x - 45, this.game.self.y  + 50);
    this.canvas.font = '20px ' + View.FONT;
    this.canvas.fillStyle = 'grey';
    this.canvas.fillRect(this.game.self.x - 15, this.game.self.y + 25, 30, 5);
    this.canvas.fillStyle = 'red';
    this.canvas.fillRect(this.game.self.x - 15, this.game.self.y + 25, this.game.self.refill * 30 / this.game.self.refillMax, 5);
  }

  public drawEnemies(): void {
    this.game.enemies.forEach(enemy => {
      this.canvas.fillStyle = enemy.color;
      if (enemy.dead) {
        this.canvas.fillStyle = 'red';
      }
      this.canvas.beginPath();
      this.canvas.moveTo(enemy.x - enemy.width, enemy.y + enemy.width);
      this.canvas.lineTo(enemy.x + enemy.width, enemy.y + enemy.width);
      this.canvas.lineTo(enemy.x, enemy.y - enemy.width);
      this.canvas.closePath();
      this.canvas.fill();
      this.canvas.fillStyle = 'white';
      this.canvas.font = '15px ' + View.FONT;
      this.canvas.fillText(`${enemy.name}`, enemy.x - 45, enemy.y  + 50);
      this.canvas.font = '20px ' + View.FONT;
    });
  }

  public drawScore(): void  {
    this.canvas.font = '20px ' + View.FONT;
    this.canvas.fillStyle = 'white';
    this.canvas.fillText(`You have ${this.game.self.score} point(s).`, 200, 50);
    this.canvas.fillText(`Scores : `, 500, 50);
    this.scores = this.game.enemies.map(e => {
      return {
        name: e.name,
        score: e.score
      };
    });
    this.scores.push({
      name: this.game.self.name,
      score: this.game.self.score
    });
    this.scores.sort((a, b) => b.score - a.score).forEach((e, i) => {
      this.canvas.fillText(`${i + 1}. ${e.name} : ${e.score}`, 500, 80 + i * 30);
    });
  }

  public drawProjectiles(): void {
    this.canvas.fillStyle = 'red';
    this.game.projectiles.forEach(projectile => {
      this.canvas.beginPath();
      this.canvas.arc(projectile.x, projectile.y, projectile.width, 0, Math.PI * 2);
      this.canvas.closePath();
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

    this.canvas.font = '20px ' + View.FONT;
    this.stars = [];
    for (let i = 0; i < this.numStars; i++){
      const star = {
        x: Math.random() * View.WIDTH,
        y: Math.random() *  View.HEIGHT,
        z: Math.random() * View.WIDTH,
        o: '0.' + Math.floor(Math.random() * 99) + 1
      };
      this.stars.push(star);
    }
    this.element.addEventListener('mousemove', e => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });
  }
}
