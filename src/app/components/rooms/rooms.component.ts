import { Component, OnInit } from '@angular/core';
import { UrlSegment , UrlSegmentGroup, Router , UrlTree, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  game : string;
  gameTitle : string;
  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.changeGame();
      }
    )
  }


  // Change the name of the game and title of the page
  changeGame(){

    let gameInUrl = this.route.snapshot.paramMap.get('game');
    this.game = gameInUrl;

    if (gameInUrl == 'tictactoe') {
      this.gameTitle = "Tic Tac Toe";
    }
    else if (gameInUrl = 'connectfour'){
      this.gameTitle = "Connect Four";
    }
  }

}
