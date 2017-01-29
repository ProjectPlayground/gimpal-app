import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';
import 'rxjs/add/operator/map';

// import providers
import { DataProvider } from './data';

@Injectable()
export class AuthProvider {

  user: any;

  constructor(
    private af: AngularFire,
    private data: DataProvider
  ) {}

  getUserData() {
    return Observable.create(observer => {
      this.af.auth.subscribe(authData => {
        if (authData) {
          this.data.object('users/' + authData.uid).subscribe(userData => {
            console.log(userData);
            this.user = userData;
            observer.next(userData);
          });
        } else {
          observer.error();
        }
      });
    });
  }

  registerUser(credentials: any) {
    return Observable.create(observer => {
      this.af.auth.createUser(credentials).then((authData: any) => {
        this.af.database.list('users').update(authData.uid, {
          name: authData.auth.email,
          email: authData.auth.email,
          emailVerified: false,
          provider: 'email',
          image: 'https://freeiconshop.com/files/edd/person-solid.png'
        });
        credentials.created = true;
        observer.next(credentials);
      }).catch((error: any) => {
        if (error) {
          switch (error.code) {
            case 'INVALID_EMAIL':
              observer.error('E-mail inválido.');
              break;
            case 'EMAIL_TAKEN':
              observer.error('Este e-mail já está sendo utilizado.');
              break;
            case 'NETWORK_ERROR':
              observer.error('Aconteceu algum erro ao tentar se conectar ao servidor, tente novamente mais tarde.');
              break;
            default:
              observer.error(error);
          }
        }
      });
    });
  }

  loginWithEmail(credentials) {
    return Observable.create(observer => {
      this.af.auth.login(credentials, {
        provider: AuthProviders.Password,
        method: AuthMethods.Password
      }).then((authData) => {
        observer.next(authData);
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  logoutUser(): any {
    return this.af.auth.logout();
  }

  sendPasswordResetEmail(email) {
    return Observable.create(observer => {
      firebase.auth().sendPasswordResetEmail(email).then(function() {
        observer.next();
        // Email sent.
      }, function(error) {
        observer.error(error);
        // An error happened.
      });
    });
  }

}
