import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import * as $ from "jquery";
import { WebSocketServiceService } from '../../services/web-socket-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  username : string;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private webSocket : WebSocketServiceService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(){
    this.username = this.setName();
    this.webSocket.emit('username-change', this.username);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


  updateName(){
    let currentName : string =  $('.playerName').html();
    $('.playerName').toggleClass("hidden");
    $('.playerNameInput').toggleClass("hidden");
    $('.playerNameInput').val(currentName);
    $('#validateName').toggleClass('hidden');
  }

  validateName(){
    let newName : any =  $('.playerNameInput').val();
    this.username = newName;
    $('.playerName').toggleClass("hidden");
    $('.playerName').html(newName);
    $('.playerNameInput').toggleClass("hidden");
    $('#validateName').toggleClass('hidden');

    this.webSocket.emit("username-change", newName);
  }

  setName(){
    let randomNumber = Math.floor(Math.random() * 500001);
    let name = "Noob"+randomNumber;
    $(".playerName").html(name);
    return name;
  }
}
