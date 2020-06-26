import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChatComponent } from './components/chat/chat.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LobbyComponent } from './components/lobby/lobby.component';
import { TicTacToeGameComponent } from './components/tic-tac-toe-game/tic-tac-toe-game.component';
import { ConnectFourGameComponent } from './components/connect-four-game/connect-four-game.component';

/*Materials*/
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ChatComponent,
    RoomsComponent,
    LobbyComponent,
    TicTacToeGameComponent,
    ConnectFourGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
