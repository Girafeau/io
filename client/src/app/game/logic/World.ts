import Obstacle from './Obstacle';


export default class World {

  public width: number;
  public height: number;
  public obstacles: Obstacle[];

  public constructor(width: number, height: number) {
    this.height = height;
    this.width = width;
    this.obstacles = [];
  }

  public create(seed: string): void {
    const o = seed.split('.');
    let no = [];
    o.forEach(n => {
      no = n.split(':');
      this.obstacles.push(new Obstacle(parseInt(no[0], 10), parseInt(no[1], 10), parseInt(no[2], 10), parseInt(no[3], 10)));
    });
  }
}
