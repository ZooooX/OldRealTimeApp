import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-tic-tac-toe-game',
  templateUrl: './tic-tac-toe-game.component.html',
  styleUrls: ['./tic-tac-toe-game.component.scss']
})
export class TicTacToeGameComponent implements OnInit {

  roomId : string;

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.roomId =this.route.snapshot.paramMap.get('roomId');
      }
    )
  }

}
