import { Component, OnInit, Input } from '@angular/core';
import { WebSocketServiceService } from '../../services/web-socket-service.service';
import * as $ from "jquery";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  _roomId : string;


  @Input()
  set roomId(roomId: string) {
    this._roomId = (roomId && roomId.trim()) || '<no name set>';
  }

  get roomId(): string { return this._roomId; }

  constructor(private webSocketService : WebSocketServiceService) { }

  ngOnInit() {
    var self = this;

    //Event listener submit d'un message -- emmet au serveur l'envoie d'un nouveau message
    $("#form_chat").submit(function(event){
      event.preventDefault();
      let message : any = $('#message').val();
      self.webSocketService.emit('message',{room : self._roomId, message :  message});
      self.nouveauMessage(/*pseudo,*/message/*,color*/);
      $("#message").val("").focus();
    });


    //new message recieved
    this.webSocketService.listen("message").subscribe((data) =>{
      console.log(data);

      self.nouveauMessage(data["message"], data["username"], data["color"]);
    });

  }

  //rajoute un nouveau message dans le dom
  nouveauMessage(message : any, pseudo ?: string  , color ?: string){
    if(pseudo){
      $('#box').append("<p class='message'><span class='pseudoMessage' style='color:"+ color +"'>" + pseudo + "</span>: " + message +"</p>");
    }
    else{
      $('#box').append("<p class='message'> You : "+ message +"</p>");
    }
    this.scrollToBottom();
  }

  //rajoute un message de connexion dans le chat
  nouvellePersonne(pseudo: string){
    if (pseudo) {
      $('#box').append('<p class="messageConnexion"> ' + pseudo + ' a rejoint le chat</p>');
    }
    else {
      $('#box').append('<p class="messageConnexion"> Vous avez rejoint le chat</p>');
    }
  }

  //clean le chat
  resetChat(){
    $('#box').empty();
  }

  //scroll a la fin du chat
  scrollToBottom() {
      $('#box').scrollTop($('#box').prop("scrollHeight"));
  }
}
