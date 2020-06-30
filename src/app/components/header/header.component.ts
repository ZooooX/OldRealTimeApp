import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import * as $ from "jquery";
import { WebSocketServiceService } from '../../services/web-socket-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private webSocket : WebSocketServiceService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
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
    $('.playerName').toggleClass("hidden");
    $('.playerName').html(newName);
    $('.playerNameInput').toggleClass("hidden");
    $('#validateName').toggleClass('hidden');

    this.webSocket.emit("username-change", newName);
  }
}
