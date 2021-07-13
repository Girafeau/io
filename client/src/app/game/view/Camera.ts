import Player from '../logic/Player';

export default class Camera {
  private xView: number;
  private yView: number;
  private wView: number;
  private hView: number;
  private xDeadZone: number;
  private yDeadZone: number;
  private player: Player;

  constructor(xView: number, yView: number, viewportWidth: number, viewportHeight: number) {
    this.xView = xView;
    this.yView = yView;
    this.xDeadZone = 0;
    this.yDeadZone = 0;
    this.wView = viewportWidth;
    this.hView = viewportHeight;
  }

  public follow(player: Player, xDeadZone: number, yDeadZone: number): void {
    this.player = player;
    this.xDeadZone = xDeadZone;
    this.yDeadZone = yDeadZone;
  }

  public update(): void {
    if (this.player.x - this.xView + this.xDeadZone > this.wView) {
      this.xView = this.player.x - (this.wView - this.xDeadZone);
    }
    else if (this.player.x - this.xDeadZone < this.xView) {
      this.xView = this.player.x - this.xDeadZone;
    }

    if (this.player.y - this.yView + this.yDeadZone > this.hView) {
      this.yView = this.player.y - (this.hView - this.yDeadZone);
    }
    else if (this.player.y - this.yDeadZone < this.yView) {
      this.yView = this.player.y - this.yDeadZone;
    }
  }

}
