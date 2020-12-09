import Key from './Key';
import Game from '../logic/Game';

export default class Listener {

  private game: Game;
  x: number;
  y: number;
  pressed: boolean;

  public constructor(game: Game) {
    this.game = game;
  }

  public init(): void {

    addEventListener('keydown', (e) => {
      Key.KEYS[e.key] = true;
      e.preventDefault();
    });

    addEventListener('keyup',  (e) => {
      Key.KEYS[e.key] = false;
    });

    addEventListener('click',  (e) => {
      this.game.self.fire(e.offsetX, e.offsetY);
    });

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
  }
}
