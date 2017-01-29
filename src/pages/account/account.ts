import { Component } from '@angular/core';
import { Events, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Camera } from 'ionic-native';
import { LoginPage } from '../login/login';
import * as firebase from 'firebase';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

  public userProfile: any;

  constructor (
    public events: Events,
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider
  ) {
    this.userProfile = firebase.auth().currentUser.providerData[0]
    console.log(this.userProfile);
  }

  logout(){
  this.auth.logoutUser().then(() => {
      this.navCtrl.setRoot(LoginPage);
    });
  }
}
