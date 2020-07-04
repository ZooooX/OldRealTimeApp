import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { GameModalComponent } from './components/game-modal/game-modal.component';

/*Materials*/
import {DemoMaterialModule} from './material-modules';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ChatComponent,
    RoomsComponent,
    LobbyComponent,
    TicTacToeGameComponent,
    ConnectFourGameComponent,
    GameModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule
  ],
  entryComponents: [TicTacToeGameComponent, GameModalComponent],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
