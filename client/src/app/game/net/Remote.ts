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

  public static ping(): void {
    Remote.socket.send('3');
  }

  public connect(url: string, room: string, handle, err): void {
    Remote.url = url;
    Remote.room = room;
    Remote.socket = new WebSocket(url);
    Remote.socket.onerror = error => {
      err();
    };
    Remote.socket.onopen = event => {
      console.log('socket opened');
      Remote.socket.send(Remote.room + '@connect');
    };
    Remote.socket.onclose = event => {
      console.log('socket closed');
    };
    Remote.socket.onmessage = event => {
      if (event.data === '2') {
        Remote.ping();
      } else {
        const infos: string [] = event.data.split('@');
        const message: string = infos[1];
        let object = null;
        if (infos[2]) {
          object = JSON.parse(infos[2]);
        }
        if (message === 'player') {
          this.game.addEnemy(object.id, object.name, object.color, object.x, object.y, object.score);
        }
        if (message === 'self') {
          this.game.setSelf(object.id, object.name, object.color, object.x, object.y, object.score);
          handle();
        }
        if (message === 'enemies') {
          object.forEach(enemy => {
            this.game.addEnemy(enemy.id, enemy.name, enemy.color, enemy.x, enemy.y, enemy.score);
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
        if (message === 'score') {
         if (object.shooter === this.game.self.id) {
            this.game.self.score += 1;
         }
         else {
           this.game.updateEnemyScore(object.shooter);
         }
        }

        if (message === 'taunted') {
          this.game.updateEnemyTaunt(object.id, true);
          if (object.id === this.game.self.id) {
            this.game.self.taunt = true;
          }
        }

        if (message === 'untaunted') {
          this.game.updateEnemyTaunt(object.id, false);
          if (object.id === this.game.self.id) {
            this.game.self.taunt = false;
          }
        }
      }
    };

  }
}
