import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { FirebaseAuth } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { HomePage } from '../home/home';

/**
 * Generated class for the FormationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-formations',
  templateUrl: 'formations.html',
})

export class FormationsPage {
team_name:string;
team_logo:string;
forma:string;
userID:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afdb: AngularFireDatabase, public fbauth: AngularFireAuth ) {
    this.team_name = navParams.get("name_team");
    this.team_logo = navParams.get("logo_team");
    console.log(this.team_name);

    this.userID = fbauth.auth.currentUser.uid;
  }

  save_form(){
    this.afdb.object(`users/${this.userID}/Team`).update({
      team:this.team_name,
      logo:this.team_logo,
      formation:this.forma
    })
    this.navCtrl.setRoot(HomePage);
  }
}
