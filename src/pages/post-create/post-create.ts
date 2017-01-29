import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Camera } from 'ionic-native';
import firebase from 'firebase';

@Component({
  selector: 'page-post-create',
  templateUrl: 'post-create.html'
})

export class PostCreatePage {
  post = {
    title: undefined,
    description: undefined,
    price: undefined,
    dateAvailable: undefined,
    location: {
      latitude: undefined,
      longitude: undefined
    },
    address: {
      address1: undefined,
      city: 'Edmonton'
    },
    picture: null
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

  takePicture() {
    Camera.getPicture().then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     this.post.picture = imageData;
     let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
    // Camera.getPicture({
    //   quality : 95,
    //   destinationType : Camera.DestinationType.DATA_URL,
    //   sourceType : Camera.PictureSourceType.CAMERA,
    //   allowEdit : true,
    //   encodingType: Camera.EncodingType.PNG,
    //   targetWidth: 500,
    //   targetHeight: 500,
    //   saveToPhotoAlbum: true
    // }).then(imageData => {
    //   this.post.picture = imageData;
    // }, error => {
    //   console.log("ERROR -> " + JSON.stringify(error));
    // });
  }

}
