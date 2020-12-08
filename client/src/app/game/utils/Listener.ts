import Key from './Key';
import Self from '../logic/Self';
import Game from '../logic/Game';

export default class Listener {

  private game: Game;

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
  }
}
