import Game from '../logic/Game';

export default class View {
  private mouseX: any;
  private mouseY: any;
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
  public static FONT = 'Open Sans';
  public static HEIGHT;
  public static WIDTH;
  private readonly numStars: number;
  private game: Game;
  private canvas;
  private stars;
  private readonly radius: string;


  public render(): void {
    this.map();
    this.moveStars();
    this.drawStars();
    this.self();
    this.enemies();
    this.projectiles();

  }

  private moveStars(): void {
    for (let i = 0; i < this.numStars; i++){

      const star = this.stars[i];
      star.z--;

      if (star.z <= 0){
        star.z = View.WIDTH;
      }
    }
  }

  private drawStars(): void {
    let pixelX, pixelY, pixelRadius;
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
      // c.fill();
    }
  }


  public map(): void {
    this.canvas.clearRect(0, 0, View.WIDTH, View.HEIGHT);
    this.canvas.beginPath();
  }


  public self(): void {
    this.canvas.fillStyle = this.game.self.color;
    if (this.game.self.dead) {
      this.canvas.font = '60px ' + View.FONT;
      this.canvas.fillStyle = 'black';
      this.canvas.fillText('YOU\'RE DEAD', 200, 200);
      this.canvas.fillText('Respawn in :', 200, 300);
      this.canvas.fillText(String(this.game.self.timer), 200, 400);
    }


    this.canvas.beginPath();
    //this.canvas.setTransform(1, 0, 0, 1, this.game.self.x, this.game.self.y);
    //this.canvas.rotate(Math.atan2(this.mouseX, this.mouseY));
    this.canvas.moveTo(this.game.self.x - this.game.self.width, this.game.self.y + this.game.self.width);
    this.canvas.lineTo(this.game.self.x + this.game.self.width, this.game.self.y + this.game.self.width);
    this.canvas.lineTo(this.game.self.x, this.game.self.y - this.game.self.width);
   // this.canvas.setTransform(1, 0, 0, 1, 0, 0);
    this.canvas.closePath();

    this.canvas.fillStyle = 'white';
    this.canvas.fill();

  //  this.canvas.arc(this.game.self.x, this.game.self.y, this.game.self.width, 0, Math.PI * 2);
   // this.canvas.fill();
    this.canvas.fillStyle = 'grey';
    this.canvas.fillRect(this.game.self.x - 15, this.game.self.y + 20, 30, 5);
    this.canvas.fillStyle = 'red';
    this.canvas.fillRect(this.game.self.x - 15, this.game.self.y + 20, this.game.self.refill * 30 / this.game.self.refillMax, 5);
    this.canvas.beginPath();
    this.canvas.fillStyle = 'white';
    if (this.game.self.taunt) {
      this.canvas.fillText(' ̿ ̿̿\'̿̿\\̵͇̿̿\\=(•̪●)=/̵͇̿̿/\'̿̿ ̿ ̿', this.game.self.x - 50, this.game.self.y - 80, 100);
    }
    this.canvas.font = '20px ' + View.FONT;
    this.canvas.fillText(`${this.game.self.x}`, this.game.self.x - 15, this.game.self.y - 40, 30);
    this.canvas.fillText(`${this.game.self.y}`, this.game.self.x - 15, this.game.self.y - 20, 30);
    this.canvas.fillText(`${this.game.self.name}`, this.game.self.x - 50, this.game.self.y  + 50, 100);
  }

  public enemies(): void {
    this.game.enemies.forEach(enemy => {
      this.canvas.fillStyle = enemy.color;
      this.canvas.beginPath();
      if (enemy.taunt) {
        this.canvas.fillStyle = 'black';
        this.canvas.fillText(' ̿ ̿̿\'̿̿\\̵͇̿̿\\=(•̪●)=/̵͇̿̿/\'̿̿ ̿ ̿ ', enemy.x - 50, enemy.y - 40, 100);
      }
      if (enemy.dead) {
        this.canvas.fillStyle = 'black';
      }
      this.canvas.arc(enemy.x, enemy.y, enemy.width, 0, Math.PI * 2);
      this.canvas.fill();
      this.canvas.fillStyle = 'black';
      this.canvas.fillText(`${enemy.name}`, enemy.x - 50, enemy.y  + 35, 100);
    });
  }

  public projectiles(): void {
    this.canvas.fillStyle = 'red';
    this.game.projectiles.forEach(projectile => {
      this.canvas.beginPath();
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
