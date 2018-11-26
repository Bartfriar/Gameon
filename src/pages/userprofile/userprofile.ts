import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { BeginnerPage } from '../beginner/beginner';
import { AmateurPage } from '../amateur/amateur';
import { ProfessionalPage } from '../professional/professional';

/**
 * Generated class for the UserprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userprofile',
  templateUrl: 'userprofile.html',
})
export class UserprofilePage {
username:any;
team:any;
formations:any;
phone:any;
useremail:any;
userid:any;
rank:any;
currentid:any;
firstname:any
lastname:any
Won_Games:any;
Lost_Games:any;
Games_Played:any;
points:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth:AngularFireAuth) {
    this.username = navParams.get('opponent_name');
    this.userid = navParams.get('opponent_uid');
    console.log(this.username)
  }

  ionViewDidLoad() {
    //Retrieve Leaderboards information for user
    firebase.database().ref(`LeaderBoards`).orderByChild('UserID').equalTo(this.userid).on("child_added", lead=>{
      this.rank = lead.val().Rank
      this.points = lead.val().Points
      this.Won_Games = lead.val().Wins
      this.Lost_Games = lead.val().Losses
      this.Games_Played = this.Won_Games + this.Lost_Games
      console.log(this.Won_Games);
    })

    //Retrieve User information
    firebase.database().ref(`users`).orderByChild('UserID').equalTo(this.userid).on("child_added", usern=>{
      this.team = usern.child('Team').val().team;
      this.formations = usern.child('Team').val().formation;
      this.useremail = usern.val().email;
      this.phone  = usern.val().Telephone;
      this.firstname = usern.val().First_Name
      this.lastname = usern.val().Last_Name
      console.log(this.formations);

    })
    
  }
 

}
