import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';

// import pages
import { HomePage } from '../pages/home/home';
import { AccountPage } from '../pages/account/account';
import { MessagesPage } from '../pages/messages/messages';
import { PostsPage } from '../pages/posts/posts';
import { TabsPage } from '../pages/tabs/tabs';

// import providers
import { SwitchData } from '../providers/switch-data';

// import af2 module
import { AngularFireModule } from 'angularfire2';

// AF2 Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyCzPG90nQjYNZnHZgr_kpHtaNB6Z1pJIUk",
  authDomain: "gimpal-dd75c.firebaseapp.com",
  databaseURL: "https://gimpal-dd75c.firebaseio.com",
  storageBucket: "gimpal-dd75c.appspot.com",
  messagingSenderId: "718479368748"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AccountPage,
    MessagesPage,
    PostsPage,
    HomePage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AccountPage,
    MessagesPage,
    PostsPage,
    HomePage,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Storage, SwitchData]
})
export class AppModule {}
