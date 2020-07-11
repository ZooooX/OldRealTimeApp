import { Component, OnInit , ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router, NavigationStart, NavigationEnd} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { GameModalComponent } from '../game-modal/game-modal.component';
import { WebSocketServiceService } from '../../services/web-socket-service.service';
import { ChatComponent } from '../chat/chat.component';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-tic-tac-toe-game',
  templateUrl: './tic-tac-toe-game.component.html',
  styleUrls: ['./tic-tac-toe-game.component.scss']
})
export class TicTacToeGameComponent implements OnInit, AfterViewInit, OnDestroy{

  previousRoomId : string;
  roomId : string;
  game : string = 'tictactoe';
  playerName : string;
  routerEvents : any;

  @ViewChild(ChatComponent, {static: false}) private child:ChatComponent;

  constructor(private route:ActivatedRoute, private router : Router, public dialog: MatDialog, private webSocket : WebSocketServiceService) { }

  //au lancement, récupère l'id de la room puis demande la connexion du socket a cette room
  ngOnInit() {

    this.roomId =this.route.snapshot.paramMap.get('roomId');
    this.webSocket.emit("join-room",this.roomId);

    this.routerEvents = this.router.events.subscribe(event => {

      if(event instanceof NavigationStart) {
        this.previousRoomId = this.roomId;
        this.webSocket.emit('leave-room',this.previousRoomId);
      }
      else if(event instanceof NavigationEnd) {
        this.roomId = this.route.snapshot.paramMap.get('roomId');
        this.webSocket.emit("join-room",this.roomId);
      }
    });
  }

  ngAfterViewInit(){
    this.route.params.subscribe(
      params => {
        this.child.resetChat();
        this.child.nouvellePersonne();
      }
    );

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(GameModalComponent, {
      width: '500px',
      height: '250px',
      disableClose: true,
      data: {game : this.game, roomId: this.roomId, playerName : this.playerName}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnDestroy(){
    this.routerEvents.unsubscribe();
  }

}
