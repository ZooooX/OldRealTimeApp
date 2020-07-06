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
  color : any;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private webSocket : WebSocketServiceService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(){
    this.username = this.setName();
    this.color = $('.colorPicker').val();
    this.webSocket.emit('profile-change', {username : this.username, color : this.color});
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  // change le text en input pour que l'utilisateur puisse modifier son pseudo ou sa couleur
  updateProfile() {
    let currentName : string =  $('.playerName').html();
    $('.playerName').toggleClass("hidden");
    $('.playerNameInput').toggleClass("hidden");
    $('.playerNameInput').val(currentName);
    $('#validateName').toggleClass('hidden');
    $('.colorPicker').prop('disabled',false);
  }

  // remet l'input en text et effectue les changement de pseudo et couleur
  // emet par la suite le changement au serveur pour stocker le nouveau pseudo/couleur dans le webSocket
  validateProfile(){
    let newName : any =  $('.playerNameInput').val();
    let newColor : any =  $('.colorPicker').val();
    this.username = newName;
    this.color = newColor;
    $('.playerName').toggleClass("hidden");
    $('.playerName').html(newName);
    $('.playerNameInput').toggleClass("hidden");
    $('#validateName').toggleClass('hidden');
    $('.colorPicker').prop('disabled',true);
    console.log(newColor);

    this.webSocket.emit("profile-change", {username : newName, color: newColor});
  }

  //créer un pseudo
  setName(){
    let randomNumber = Math.floor(Math.random() * 500001);
    let name = "Noob"+randomNumber;
    $(".playerName").html(name);
    return name;
  }
}
