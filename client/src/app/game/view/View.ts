import Game from '../logic/Game';

export default class View {

  public static FONT = 'Inter';
  public static HEIGHT: number;
  public static WIDTH: number;

  public constructor(game: Game, canvas, width: number, height: number) {
    View.HEIGHT = height;
    View.WIDTH = width;
    this.game = game;
    this.canvas = canvas;
    this.numStars = 10000;
    this.radius = '0.' + Math.floor(Math.random() * 9) + 1;
  }

  private readonly numStars: number;
  private game: Game;
  private canvas;
  private stars;
  private scores;
  private readonly radius: string;


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
      pixelY = (star.y - View.WIDTH / 2) * (View.WIDTH * 2 / star.z);
      pixelY += View.WIDTH / 2;
      pixelRadius = (View.WIDTH * 2 / star.z) / 2;
      this.canvas.fillRect(pixelX - this.game.camera.xView, pixelY - this.game.camera.yView, pixelRadius, pixelRadius);
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
    this.canvas.save();

    this.canvas.clearRect(0, 0, View.WIDTH, View.HEIGHT);
  }

  public drawSelf(): void {
    this.canvas.fillStyle = 'white';
    if (this.game.self.dead) {
      this.canvas.fillStyle = 'red';
    }
    this.canvas.beginPath();
    this.canvas.moveTo(this.game.self.x - this.game.self.width - this.game.camera.xView, this.game.self.y + this.game.self.width - this.game.camera.yView);
    this.canvas.lineTo(this.game.self.x + this.game.self.width - this.game.camera.xView, this.game.self.y + this.game.self.width - this.game.camera.yView);
    this.canvas.lineTo(this.game.self.x - this.game.camera.xView, this.game.self.y - this.game.self.width - this.game.camera.yView);
    this.canvas.closePath();
    this.canvas.fill();
    this.canvas.fillStyle = 'white';
    this.canvas.font = '15px ' + View.FONT;
    this.canvas.fillText(`${this.game.self.x}`, this.game.self.x - 20 - this.game.camera.xView, this.game.self.y - 45 - this.game.camera.yView);
    this.canvas.fillText(`${this.game.self.y}`, this.game.self.x - 20 - this.game.camera.xView, this.game.self.y - 25 - this.game.camera.yView);
    this.canvas.fillText(`${this.game.self.name}`, this.game.self.x - 45 - this.game.camera.xView, this.game.self.y  + 50 - this.game.camera.yView);
    this.canvas.font = '20px ' + View.FONT;
    this.canvas.fillStyle = 'grey';
    this.canvas.fillRect(this.game.self.x - 15 - this.game.camera.xView, this.game.self.y + 25 - this.game.camera.yView, 30, 5);
    this.canvas.fillStyle = 'red';
    this.canvas.fillRect(this.game.self.x - 15 - this.game.camera.xView, this.game.self.y + 25 - this.game.camera.yView, this.game.self.refill * 30 / this.game.self.refillMax, 5);
  }

  public drawEnemies(): void {
    this.game.enemies.forEach(enemy => {
      this.canvas.fillStyle = enemy.color;
      if (enemy.dead) {
        this.canvas.fillStyle = 'red';
      }
      this.canvas.beginPath();
      this.canvas.moveTo(enemy.x - enemy.width - this.game.camera.xView, enemy.y + enemy.width - this.game.camera.yView);
      this.canvas.lineTo(enemy.x + enemy.width - this.game.camera.xView, enemy.y + enemy.width - this.game.camera.yView);
      this.canvas.lineTo(enemy.x - this.game.camera.xView, enemy.y - enemy.width - this.game.camera.yView);
      this.canvas.closePath();
      this.canvas.fill();
      this.canvas.fillStyle = 'white';
      this.canvas.font = '15px ' + View.FONT;
      this.canvas.fillText(`${enemy.name}`, enemy.x - 45 - this.game.camera.xView, enemy.y  + 50 - this.game.camera.yView);
      this.canvas.font = '20px ' + View.FONT;
    });
  }

  public drawScore(): void  {
    this.canvas.font = '20px ' + View.FONT;
    this.canvas.fillStyle = 'white';
    this.canvas.fillText(`You have ${this.game.self.score} point(s).`, 200, 70);
    // this.canvas.strokeStyle = 'red';
    // this.canvas.strokeRect(175, 25, 250, 80);
    this.canvas.fillText(`Scores : `, 500, 70);
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
      this.canvas.fillText(`${i + 1}. ${e.name} : ${e.score}`, 500, 100 + i * 30);
    });
    this.canvas.lineWidth = 2;
    this.canvas.strokeStyle = 'red';
    this.canvas.strokeRect(475, 25, 300, (this.scores.length + 1) * 30 + 50);
  }

  public drawProjectiles(): void {
    this.canvas.fillStyle = 'red';
    this.game.projectiles.forEach(projectile => {

      /*
       this.canvas.arc(projectile.x, projectile.y, projectile.width, 0, Math.PI * 2);
       this.canvas.closePath();
       this.canvas.fill();
       */
      this.canvas.beginPath();
      this.canvas.lineCap = 'round';
      this.canvas.lineWidth = 4;
      this.canvas.lineTo(projectile.old.x - this.game.camera.xView, projectile.old.y - this.game.camera.yView);
      this.canvas.lineTo(projectile.x - this.game.camera.xView, projectile.y - this.game.camera.yView);
      this.canvas.stroke();
      this.canvas.closePath();
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
  }
}
