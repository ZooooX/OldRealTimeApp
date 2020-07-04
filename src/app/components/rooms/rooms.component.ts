import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { UrlSegment , UrlSegmentGroup, Router , UrlTree, ActivatedRoute} from '@angular/router';
import { WebSocketServiceService } from '../../services/web-socket-service.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  game : string;
  gameTitle : string;
  newRoomName : string;

  rooms : any;

  constructor(private route:ActivatedRoute, private webSocketService : WebSocketServiceService, private changeDetection: ChangeDetectorRef) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.changeGame();
        this.webSocketService.emit("load-rooms", this.game);
      }
    )

    this.webSocketService.listen("rooms").subscribe((data) =>{
      this.rooms = data
      console.log(data);

      //this.changeDetection.detectChanges();
    });
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

  createNewRoom(){
    this.webSocketService.emit('new-room', {roomId : this.newRoomName, game : this.game});
  }
}
