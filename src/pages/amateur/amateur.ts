import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { RequestsPage } from '../requests/requests';

/**
 * Generated class for the AmateurPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-amateur',
  templateUrl: 'amateur.html',
})
export class AmateurPage {
  Amateurs: any;
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
      .subscribe((amateur: any) => {
        this.Amateurs = amateur;
        this.Amateurs = this.Amateurs.filter(big => big.Rank == "Amateur");
        console.log(this.Amateurs);
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
      .equalTo("Amateur")
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
    console.log('ionViewDidLoad AmateurPage');
  }

}
