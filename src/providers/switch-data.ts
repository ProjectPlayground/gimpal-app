import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the SwitchData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SwitchData {

  apiUrl = 'http://morning-lake-86585.herokuapp.com/switch/';

  constructor(
    public http: Http,
    public events: Events,
    public storage: Storage
  ) {
  }

  getStatus() {
    let query = this.apiUrl;
    return this.http.get(query)
      .map(res => res.json());
  }

  postStatus(status) {
    return this.http.post(this.apiUrl, status)
      .map(res => res.json());
  }

}
