import Key from './Key';
import Self from '../logic/Self';
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
      this.game.self.fire(e.clientX, e.clientY);
    });

    addEventListener('oncontextmenu',  (e) => {
      return false;
    });

    addEventListener('contextmenu',  (e) => {
      e.preventDefault();
    });
    addEventListener('mousedown',  (e) => {
      this.pressed = true;
    });
    addEventListener('mouseup',  (e) => {
      this.pressed = false;
    });

    addEventListener('mousemove',  (e) => {
      console.log(e);
      if (this.x && this.y && this.pressed) {
        scrollBy(e.clientX - this.x, e.clientY - this.y);
      }
      this.x = e.clientX;
      this.y = e.clientY;
      e.preventDefault();
    });
  }
}
