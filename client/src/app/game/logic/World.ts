import Obstacle from './Obstacle';


export default class World {

  public width: number;
  public height: number;
  public obstacles: Obstacle[];

  public constructor(width: number, height: number) {
    this.height = height;
    this.width = width;
    this.obstacles = [new Obstacle(200, 150, 20, 500), new Obstacle(350, 250, 300, 20)];
  }
}
