import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// FIrebase
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormationsPage } from '../formations/formations';
import { ScoresPage } from '../scores/scores';
import * as firebase from 'firebase';

/**
 * Generated class for the MatchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-match',
  templateUrl: 'match.html',
})
export class MatchPage {
  authState: any = null;
  teams:any;
  username:string;
  currentuser:any;
  useremail:any;
  gameid:string;
  constructor(
    public navCtrl: NavController,
    public afAuth: AngularFireAuth,
    public afDb: AngularFireDatabase,
    public navparams: NavParams )  {
    afDb.list(`Teams`).snapshotChanges()
    .subscribe((team: any) => {
      this.teams = team;
      console.log(this.teams);
  });
  this.username = navparams.get("opponent_name"),
  this.gameid = navparams.get('challenger_id')
      console.log(this.username);
      this.useremail = this.afAuth.auth.currentUser.email;
    firebase.database().ref("users").orderByChild("email").equalTo(this.useremail).on("child_added", usern=>{
      this.currentuser = usern.val().username;
      console.log(this.currentuser);
    })
  } 
  game(chosen_team){
    var logo = chosen_team.payload.val().Logo;
    var team_name = chosen_team.payload.val().Team_Name;

    this.navCtrl.push(ScoresPage, {challenge_key:this.gameid, name_team:team_name, logo_team:logo, opponent_name:this.username}) 
   
    firebase.database().ref('Games/' + this.gameid).update({
      Second_User:this.currentuser,
      Second_Team:team_name
    });
  }

  

}
