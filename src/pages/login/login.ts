import { NavController, LoadingController } from 'ionic-angular';
import { Component } from '@angular/core';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { SignupPage } from '../signup/signup';
import { AuthProvider } from '../../providers/auth';

@Component({
  templateUrl: 'login.html',
  selector: 'login'
})

export class LoginPage {
  error: any;
  form: any;

  constructor(
    private navCtrl: NavController,
    private auth: AuthProvider,
    private loadingCtrl: LoadingController
  ) {
    this.form = {
      email: '',
      password: ''
    }
  }

  openForgotPasswordPage(): void {
    this.navCtrl.push(ForgotPasswordPage);
  }

  openSignUpPage(): void {
    this.navCtrl.push(SignupPage);
  }

  login() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.auth.loginWithEmail(this.form).subscribe(data => {
      setTimeout(() => {
        loading.dismiss();
        // The auth subscribe method inside the app.ts will handle the page switch to home
      }, 1000);
    }, err => {
      setTimeout(() => {
        loading.dismiss();
        this.error = err;
      }, 1000);
    });
  }
}
