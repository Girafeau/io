import Key from './Key';
import Game from '../logic/Game';
import Remote from '../net/Remote';

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
      if (e.key === ' ') {
          this.game.self.tauntEnemies();
      }
      e.preventDefault();
    });

    addEventListener('keyup',  (e) => {
      Key.KEYS[e.key] = false;
      if (e.key === ' ') {
        this.game.self.unTauntEnemies();
      }
    });

    addEventListener('click',  (e) => {
      this.game.self.fire(e.offsetX, e.offsetY);
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
