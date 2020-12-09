import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import Logic from '../../game/logic/Logic';
import Game from '../../game/logic/Game';
import View from '../../game/view/View';
import Remote from '../../game/net/Remote';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements AfterViewInit, OnInit {

  @ViewChild('game') element: ElementRef;
  private logic: Logic;
  private game: Game;
  private view: View;
  private remote: Remote;
  private room: string;

  constructor(private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.room = this.route.snapshot.paramMap.get('room');
  }

  public ngAfterViewInit(): void {
    const width = 3000;
    const height = 3000;
    const url = location.origin.replace(/^http/, 'ws');
   // const url = 'ws://localhost:3000';
    this.element.nativeElement.width = width;
    this.element.nativeElement.height = height;
    const canvas = this.element.nativeElement.getContext('2d');
    this.game = new Game();
    this.view = new View(this.game, canvas, width, height);
    this.logic = new Logic(this.game, this.view);
    this.remote = new Remote(this.game);
    this.remote.connect(url, this.room, () => {
      this.logic.init();
      this.logic.start();
    });
  }
}
