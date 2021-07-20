import Game from './Game';
import View from '../view/View';

export default class Logic {

  private static FPS = 60;
  private game: Game;
  private view: View;
  private stop: boolean;
  private readonly interval: number;
  private delta: number;
  private then: number;
  private now: number;

  public constructor(game: Game, view: View) {
    this.stop = false;
    this.interval = 1000 / 60;
    this.delta = 0;
    this.now = Date.now();
    this.game = game;
    this.view = view;
  }

  public init(): void {
    this.game.init();
    this.view.init();
  }

  public start(): void {
    this.then = Date.now();
    this.render();
  }

  public update(): void {
      this.game.update();
  }

  public render(): void {
    requestAnimationFrame(this.render.bind(this));
    this.now = Date.now();
    this.delta = this.now - this.then;
    if (this.delta > this.interval && !this.stop) {
      this.then = this.now - (this.delta % this.interval);
      this.view.render();
      this.update();
    }
  }

  public pause(): void {
    this.stop = true;
  }

  public unpause(): void {
    this.stop = false;
  }

}
