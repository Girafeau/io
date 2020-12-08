import Game from '../logic/Game';
import { nanoid } from 'nanoid';

export default class Remote {

  public constructor(game: Game) {
    this.game = game;
  }

  public static socket: WebSocket;
  public static url: string;
  public static room: string;
  private game: Game;

  public static notify(message: string, object: object): void {
    Remote.socket.send(Remote.room + '@' + message + '@' + JSON.stringify(object));
  }

  public connect(url: string, room: string, handle): void {
    Remote.url = url;
    Remote.room = room;
    Remote.socket = new WebSocket(url);
    Remote.socket.onerror = error => {
      console.error(error);
    };
    Remote.socket.onopen = event => {
      console.log('socket opened');
      Remote.socket.send(Remote.room + '@connect');
    };
    Remote.socket.onclose = event => {
      console.log('socket closed');
    };
    Remote.socket.onmessage = event => {
      const infos: string [] = event.data.split('@');
      const message: string = infos[1];
      let object = null;
      if (infos[2]) {
        object = JSON.parse(infos[2]);
      }
      console.log(event);
      if (message === 'player') {
        this.game.addEnemy(object.id, object.name, object.color, object.x, object.y);
      }
      if (message === 'self') {
        this.game.setSelf(object.id, object.name, object.color, object.x, object.y);
        handle();
      }
      if (message === 'enemies') {
        object.forEach(enemy => {
          this.game.addEnemy(enemy.id, enemy.name, enemy.color, enemy.x, enemy.y);
        });
      }
      if (message === 'leaver') {
        this.game.removeEnemy(object.id);
      }
      if (message === 'moved') {
        this.game.updateEnemyPosition(object.id, object.x, object.y);
      }
      if (message === 'fired') {
        this.game.addProjectile(object.x, object.y, object.angle, object.shooter);
      }
      if (message === 'died') {
        this.game.updateEnemyState(object.id, true);
      }
      if (message === 'respawned') {
        this.game.updateEnemyState(object.id, false);
      }
    };

  }
}
