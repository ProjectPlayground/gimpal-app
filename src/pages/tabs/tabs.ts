import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { PostsPage } from '../posts/posts';
import { MessagesPage } from '../messages/messages';
import { AccountPage } from '../account/account';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = PostsPage;
  tab3Root: any = MessagesPage;
  tab4Root: any = AccountPage;

  constructor() {

  }
}
