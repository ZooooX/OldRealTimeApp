import { Component, OnInit , ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { GameModalComponent } from '../game-modal/game-modal.component';
import { WebSocketServiceService } from '../../services/web-socket-service.service';
import { ChatComponent } from '../chat/chat.component';



@Component({
  selector: 'app-tic-tac-toe-game',
  templateUrl: './tic-tac-toe-game.component.html',
  styleUrls: ['./tic-tac-toe-game.component.scss']
})
export class TicTacToeGameComponent implements OnInit, AfterViewInit, OnDestroy{

  roomId : string;
  game : string = 'tictactoe';
  playerName : string;

  @ViewChild(ChatComponent, {static: false}) private child:ChatComponent;

  constructor(private route:ActivatedRoute, public dialog: MatDialog, private webSocket : WebSocketServiceService) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.roomId =this.route.snapshot.paramMap.get('roomId');

        //this.openDialog();
      }
    );
    console.log(this.roomId);

    this.webSocket.emit("join-room",this.roomId);
  }

  ngAfterViewInit(){
    this.route.params.subscribe(
      params => {
        //this.child.resetChat();
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
    this.webSocket.removeAllListeners('message');
    this.webSocket.emit('leave-room',this.roomId);
  }

}
