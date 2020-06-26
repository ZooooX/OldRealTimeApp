import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LobbyComponent } from './components/lobby/lobby.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { TicTacToeGameComponent } from './components/tic-tac-toe-game/tic-tac-toe-game.component';
import { ConnectFourGameComponent } from './components/connect-four-game/connect-four-game.component';

const routes: Routes = [
  {
    path:'',
    component:LobbyComponent
  },
  {
    path:'rooms/:game',
    component:RoomsComponent
  },
  {
    path:'tictactoe/:roomId',
    component : TicTacToeGameComponent
  },
  {
    path:'connectfour/:roomId',
    component : ConnectFourGameComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
