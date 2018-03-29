import { BoardService } from './Services/board.service';
import { Component, ViewContainerRef } from '@angular/core';

const NUM_PLAYERS: number = 2;
const BOARD_SIZE: number = 6;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BoardService]
})
export class AppComponent {
  title = 'app';
}
