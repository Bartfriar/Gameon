import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { TabsPage } from '../tabs/tabs';
import { ToastController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
email:string;
password:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authe: AngularFireAuth,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    //
  }
  login()
  {
    this.authe.auth.signInWithEmailAndPassword(this.email,this.password)
    .then((user)=>{
      console.log('Welcome to the Fifa Match');
      this.navCtrl.setRoot(HomePage);
      const toast = this.toastCtrl.create({
        message: 'User Login successfully',
        duration: 3000
      });
      toast.present();
    })
    .catch((wah)=>{
      console.log('No login');
      if(wah.code == 'auth/wrong-password'){
        const toast = this.toastCtrl.create({
          message: 'Invalid password',
          duration: 3000
        });
        toast.present();
      } else {
        const toast = this.toastCtrl.create({
          message: wah.message,
          duration: 3000
        });
        toast.present();
      }
    })
  }

  gotoRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }
}
