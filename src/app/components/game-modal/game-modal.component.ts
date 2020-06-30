import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as $ from "jquery";
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-modal',
  templateUrl: './game-modal.component.html',
  styleUrls: ['./game-modal.component.scss']
})
export class GameModalComponent implements OnInit {

  constructor(private router : Router, public dialogRef: MatDialogRef<GameModalComponent>,  @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }


  readyToggle(){
    $('#youReadyButton').toggleClass("ready");
    $('#youReadyButton').toggleClass("not-ready");

    if ($('#youReadyButton').hasClass("ready")) {
      $('#youReadyButton').html("Ready");
    }
    else if ($('#youReadyButton').hasClass("not-ready")) {
      $('#youReadyButton').html("Not Ready");
    }
  }

  backToRooms(){
    this.router.navigate(['/rooms', this.data.game]);
    this.dialogRef.close('back');
  }
}
