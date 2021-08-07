import Game from '../logic/Game';

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

  public on(message: string, selection: string, handler: () => void): void {
    if (message === selection) {
      handler();
    }
  }

  public connect(url: string, room: string, seed: string, handle, err): void {
    Remote.url = url;
    Remote.room = room;
    Remote.socket = new WebSocket(url);
    Remote.socket.onerror = error => {
      err();
    };
    Remote.socket.onopen = event => {
      console.log('socket opened');
      Remote.socket.send(room + '@connect@' + JSON.stringify({seed}) );
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

        this.on(message, 'player', () => {
          this.game.addEnemy(object.id, object.name, object.color, object.x, object.y, object.score);
        });

        this.on(message, 'self', () => {
          this.game.setSelf(object.id, object.name, object.color, object.x, object.y, object.score);
          handle();
        });

        this.on(message, 'map', () => {
          this.game.world.create(object);
        });

        this.on(message, 'enemies', () => {
          object.forEach(enemy => {
            this.game.addEnemy(enemy.id, enemy.name, enemy.color, enemy.x, enemy.y, enemy.score);
          });
        });

        this.on(message, 'moved', () => {
          this.game.updateEnemyPosition(object.id, object.x, object.y);
        });

        this.on(message, 'fired', () => {
          this.game.addProjectile(object.x, object.y, object.angle, object.shooter);
        });

        this.on(message, 'died', () => {
          this.game.updateEnemyState(object.id, true);
        });

        this.on(message, 'respawned', () => {
          this.game.updateEnemyState(object.id, false);
        });

        this.on(message, 'score', () => {
          if (object.shooter === this.game.self.id) {
            this.game.self.score += 1;
          }
          else {
            this.game.updateEnemyScore(object.shooter);
          }
        });

        this.on(message, 'taunted', () => {
          if (object.id === this.game.self.id) {
            this.game.self.taunt = true;
          } else {
            this.game.updateEnemyTaunt(object.id, true);
          }
        });

        this.on(message, 'untaunted', () => {
          if (object.id === this.game.self.id) {
            this.game.self.taunt = false;
          } else {
            this.game.updateEnemyTaunt(object.id, false);
          }
        });

        this.on(message, 'leaver', () => {
          this.game.removeEnemy(object.id);
        });
      }
    };

  }
}
