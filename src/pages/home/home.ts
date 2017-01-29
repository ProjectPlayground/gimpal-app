import { Component, ViewChild, ElementRef } from '@angular/core';
import { AlertController, App, NavController, LoadingController, ModalController, NavParams } from 'ionic-angular';
import { SwitchData } from '../../providers/switch-data';
import { Observable } from 'rxjs/Rx';
import { AuthProvider } from '../../providers/auth';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from 'firebase';

import { PostsFilterPage } from '../posts-filter/posts-filter';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  segment = 'list'; // or map
  labelIndex = 0;
  mapLoaded = false;

  filters = {
    incomplete: true,
    active: true,
    completed: false,
    pickup: true,
    delivery: true,
    displayNum: 20,
    start: true
  };

  posts: any;
  ref: any;

  constructor (
    public app: App,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public af: AngularFire
  ) {
    this.posts = af.database.list('/posts');
    this.ref = firebase.database().ref('/posts');
  }

  ngAfterViewChecked(){
    if (this.segment === 'map' && this.mapLoaded === false) {
      this.loadMap();
      this.mapLoaded = true;
    }
  }

  filterChange() {
    let modal = this.modalCtrl.create(PostsFilterPage, this.filters);
    modal.present();
    modal.onDidDismiss((data) => {
      if (data) {
        this.filters = data;
      }
    });
  }

  loadMap() {
    this.labelIndex = 0; // reset label index
    //  let latLng = new google.maps.LatLng(this.currentShift.waypoints[0].location.latitude, this.currentShift.waypoints[0].location.longitude);
    let mapOptions = {
      center: { lat: 53.5438, lng: -113.4956},
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addWaypoints();
  }

  addWaypoints() {
    this.ref.on("value", (data) => {
      var all_posts = data.val();
      for (var a_post in all_posts) {
        var single_post = all_posts[a_post];
        console.log(single_post);
        this.addMarker({ lat: single_post.location.latitude, lng: single_post.location.longitude })
      }
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }

  addMarker(location) {
    new google.maps.Marker({
      position: location,
      label: this.alphabet[this.labelIndex++],
      map: this.map
    });
  }

  getMinutes(seconds) {
    return Math.round(seconds/60);
  }

  handleError(err) {
    let alert = this.alertCtrl.create({
      title: 'Problem with server',
      subTitle: err,
      buttons: ['OK']
    });
    alert.present();
  }

}
