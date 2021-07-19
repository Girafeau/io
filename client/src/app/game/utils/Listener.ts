import Key from './Key';
import Game from '../logic/Game';

export default class Listener {

  private game: Game;
  x: number;
  y: number;
  pressed: boolean;
  private mouseX: any;
  private mouseY: any;
  private context: any;

  public constructor(game: Game, context: any) {
    this.game = game;
    this.context = context;
  }

  public init(): void {
    addEventListener('keydown', (e) => {
      Key.push(e.key);
      e.preventDefault();
    });

    addEventListener('keyup',  (e) => {
      Key.pop(e.key);
      if (e.key === ' ') {
        this.game.self.unTauntEnemies();
      }
    });

    this.context.addEventListener('click',  (e) => {
        this.game.self.fire(e.clientX + this.game.camera.xView, e.clientY + this.game.camera.yView);
    });

    addEventListener('mousemove', e => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });

    /*
    ------------------------
    SCROLL : NOT IMPLEMENTED
    ------------------------
    addEventListener('contextmenu',  (e) => {
      e.preventDefault();
    });
    addEventListener('mousedown',  (e) => {
      if (e.buttons === 2) {
        this.pressed = true;
      }
    });
    addEventListener('mouseup',  (e) => {
      this.pressed = false;
    });
    addEventListener('mousemove',  (e) => {
      if (this.x && this.y && this.pressed) {
        const xb = -(e.clientX - this.x);
        const yb =  -(e.clientY - this.y);
        scrollBy(xb, yb);
      }
      this.x = e.clientX;
      this.y = e.clientY;
      e.preventDefault();
    });
     */
  }
}
