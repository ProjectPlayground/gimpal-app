import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-post-create',
  templateUrl: 'post-create.html'
})

export class PostCreatePage {
  post = {
    title: undefined,
    description: undefined,
    price: undefined,
    duration: undefined,
    location: {
      latitude: undefined,
      longitude: undefined
    },
    address: {
      address1: undefined,
      city: 'Edmonton'
    }
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public alert: AlertController
  ) {}

  getLocation() {
    Geolocation.getCurrentPosition().then((resp) => {
      this.post.location.latitude = resp.coords.latitude;
      this.post.location.longitude = resp.coords.longitude;
    })
  }

  createPost() {
    if (this.post.title && this.post.description) {
      this.viewCtrl.dismiss(this.post);
    }
  }

  createError(err?) {
  let alert = this.alert.create({
      title: 'Error creating shift',
      subTitle: err || 'Please fill in all required fields',
      buttons: ['OK']
    });
    alert.present();
  }

}
