import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SwitchData } from '../../providers/switch-data';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  switchStatus = undefined;

  constructor(
    public navCtrl: NavController,
    public switchData: SwitchData
  ) {
    this.getCurrentStatus();
  }

  getCurrentStatus() {
    this.switchData.getStatus().subscribe(status => {
      console.log(status);
      this.switchStatus = status.on;
    });
  }

  postStatus(bool) {
    var status = {
      on: bool
    }
    this.switchData.postStatus(status).subscribe(data => {
      console.log(data);
      this.getCurrentStatus();
    });
  }

}
