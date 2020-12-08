import Game from './Game';
import View from '../view/View';

export default class Logic {

  private static FPS = 60;
  private delta: number;
  private last: number;
  private now: number;
  private game: Game;
  private view: View;

  public constructor(game: Game, view: View) {
    this.delta = 0;
    this.last = Date.now();
    this.now = Date.now();
    this.game = game;
    this.view = view;
  }

  public init(): void {
    this.game.init();
  }

  public start(): void {
    this.render();
  }

  public update(): void {
    this.game.update();
  }

  public render(): void {
    requestAnimationFrame(this.render.bind(this));
    this.view.render();
    this.now = Date.now();
    this.delta = this.delta + this.now - this.last;
    this.update();
    this.delta =  this.delta - 1 / Logic.FPS;
    this.last = this.now;
  }

  public stop(): void {

  }

}
