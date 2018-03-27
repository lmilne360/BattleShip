import { Player } from '../Models/player';
import { Board } from './../Models/board';
import { Injectable } from '@angular/core';

@Injectable()
export class BoardService {

  playerId: number = 1;
  boards: Board[] = [];
  constructor() {}

  createBoard(size: Number = 5): BoardService {
    // create tiles
    const tiles = [];
    for (let i = 0; i < size; i++) {
      tiles[i] = [];
      for (let j = 0; j < size; j++) {
        tiles[i][j] = { used: false, value: 0, status: '' };
      }
    }

    // create random ships for board
    for (let i = 0; i < size * 2; i++) {
      tiles = this.randomShips(tiles, size);
    }

    // create the board
    const board = new Board({
      player: new Player({id: this.playerId++}),
      tiles: tiles
    });

    // add the created board to 'boards' property
    this.boards.push(board);
    return this;
  }

  // function to return the tiles after a value is insterted into a random tile in the tile array
  randomShips(tiles: Object[], len: number): Object[] {
    len = len - 1;
    let ranRow = this.getRandomInt(0, len),
        ranCol = this.getRandomInt(0, len);

        if (tiles[ranRow][ranCol].value == 1) {
          return this.randomShips(tiles, len);
        } else {
          tiles[ranRow][ranCol].value = 1;
          return tiles;
        }
  }

  // Helper function to return a random integer between min and max
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // return all created boards
  getBoards(): Board[] {
    return this.boards;
  }
}
