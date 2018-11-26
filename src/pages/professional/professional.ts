import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { RequestsPage } from '../requests/requests';

/**
 * Generated class for the ProfessionalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-professional',
  templateUrl: 'professional.html',
})
export class ProfessionalPage {

  Professionals: any;
  currentuid: any;
  points: any;
  user;
  username: any;
  users: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afDb: AngularFireDatabase,
    public afauth: AngularFireAuth
  ) {
    this.afDb
      .list("LeaderBoards", ref => ref.orderByChild("Points"))
      .valueChanges()
      .subscribe((professional: any) => {
        this.Professionals = professional;
        this.Professionals = this.Professionals.filter(big => big.Rank == "Professional");
        console.log(this.Professionals);
      });

    this.currentuid = this.afauth.auth.currentUser.uid;
    console.log(this.currentuid);
    firebase
      .database()
      .ref("users")
      .orderByChild("UserID")
      .equalTo(this.currentuid)
      .on("child_added", usern => {
        this.username = usern.val().username;
        console.log(this.username);
      });
    firebase
      .database()
      .ref(`LeaderBoards`)
      .orderByChild("Rank")
      .equalTo("Professional")
      .on("child_added", beg => {
        this.username = beg.val().User;
        console.log(this.username);
      });
  }

  home()
  {
    this.navCtrl.setRoot(HomePage)
  }
  
  profile()
  {
    this.navCtrl.setRoot(AboutPage)
  }

  torequests()
  {
    this.navCtrl.setRoot(RequestsPage) 
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfessionalPage');
  }

}
