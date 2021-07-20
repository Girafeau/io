import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import Logic from '../../game/logic/Logic';
import Game from '../../game/logic/Game';
import View from '../../game/view/View';
import Remote from '../../game/net/Remote';
import {ActivatedRoute} from '@angular/router';
import Key from '../../game/utils/Key';
import {faChevronUp, faChevronDown, faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import Camera from '../../game/logic/Camera';
import World from '../../game/logic/World';

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
  chevronUp = faChevronUp;
  chevronDown = faChevronDown;
  chevronLeft = faChevronLeft;
  chevronRight = faChevronRight;

  constructor(private route: ActivatedRoute) {
  }

  public push(key: string): void {
    Key.push(key);
  }

  public pop(key: string): void {
    Key.pop(key);
  }

  public ngOnInit(): void {
    this.room = this.route.snapshot.paramMap.get('room');
  }

  public ngAfterViewInit(): void {
    const width = 2000;
    const height = 2000;
    const url = location.origin.replace(/^http/, 'ws');
    //const url = 'ws://localhost:3000';
    this.element.nativeElement.width = width;
    this.element.nativeElement.height = height;
    const canvas = this.element.nativeElement.getContext('2d');
    const world = new World(width, height);
    const camera = new Camera(0, 0, window.innerWidth, window.innerHeight);
    this.game = new Game(this.element.nativeElement, camera, world);
    this.view = new View(this.game, canvas, world.width, world.height);
    this.logic = new Logic(this.game, this.view);
    this.remote = new Remote(this.game);
    this.logic.init();
    this.remote.connect(url, this.room, () => {
      this.logic.start();
    }, () => {
      console.log("error");
    });
  }
}
