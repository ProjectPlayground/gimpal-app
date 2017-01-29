import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { FormsModule } from '@angular/forms';
import { Storage } from '@ionic/storage';

// import pages
import { HomePage } from '../pages/home/home';
import { AccountPage } from '../pages/account/account';
import { MessagesPage } from '../pages/messages/messages';
import { PostsPage } from '../pages/posts/posts';
import { PostCreatePage } from '../pages/post-create/post-create';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { TabsPage } from '../pages/tabs/tabs';

// import af2 module
import { AngularFireModule } from 'angularfire2';

// import providers
import { SwitchData } from '../providers/switch-data';
import { AuthProvider } from '../providers/auth';
import { DataProvider } from '../providers/data';

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
    PostCreatePage,
    HomePage,
    LoginPage,
    SignupPage,
    ForgotPasswordPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AccountPage,
    MessagesPage,
    PostsPage,
    PostCreatePage,
    HomePage,
    LoginPage,
    SignupPage,
    ForgotPasswordPage,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Storage, SwitchData, AuthProvider, DataProvider]
})
export class AppModule {}
