import { Component } from '@angular/core';
import { Events, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { PostCreatePage } from '../post-create/post-create';

@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html'
})
export class PostsPage {

  posts: FirebaseListObservable<any>;

  constructor(
    public events: Events,
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public modalCtrl: ModalController,
    public af: AngularFire,
    public alertCtrl: AlertController
  ) {
    this.posts = af.database.list('/posts');
  }

  addPost(){
    let modal = this.modalCtrl.create(PostCreatePage);
    modal.present();
    modal.onDidDismiss((data: any[]) => {
      this.posts.push(data);
      console.log(data);
    });
  }

}
