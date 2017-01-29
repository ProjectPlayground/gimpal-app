import { Component, ViewChild } from '@angular/core';
import { Events, Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

// import pages
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

// import providers
import { SwitchData } from '../providers/switch-data';
import { AuthProvider } from '../providers/auth';
import { DataProvider } from '../providers/data';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = TabsPage;
  @ViewChild(Nav) nav: Nav;
  isAppInitialized: boolean = false;
  user: any;

  constructor(
    public events: Events,
    public platform: Platform,
    protected data: DataProvider,
    protected auth: AuthProvider
  ) {
    this.user = {
      image: ''
    };
    platform.ready().then(() => {
      this.auth.getUserData().subscribe(data => {
        if (!this.isAppInitialized) {
          this.nav.setRoot(TabsPage);
          this.isAppInitialized = true;
        }
        this.user = data;
        this.data.list('pets').subscribe(data => {
          console.log(data);
        });
      }, err => {
        this.nav.setRoot(LoginPage);
      });
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
    this.listenToLoginEvents();
  }

  ngOnInit() {
    this.platform.ready().then(() => {

    });
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.nav.setRoot(TabsPage);
    });
    this.events.subscribe('user:signup', () => {
    });
    this.events.subscribe('user:logout', () => {
      this.nav.setRoot(LoginPage);
    });
  }

}
