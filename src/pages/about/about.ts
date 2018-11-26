import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/database';
import { TeamInfo } from '../../models/team-details/team-details.interface';
import * as firebase from 'firebase';
import { BeginnerPage } from '../beginner/beginner';
import { AmateurPage } from '../amateur/amateur';
import { ProfessionalPage } from '../professional/professional';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  teaminfo = {} as TeamInfo
  useremail:string;
  username:string;
  phone:any;
  rank:any;
  team:any;
  formations:any;
  currentid:any;
  firstname:any;
  lastname:any;
  points:any;
  Won_Games:any;
  Lost_Games:any;
  Games_Played:any;
  constructor(public navCtrl: NavController, 
    public afAuth: AngularFireAuth, 
    public afdb: AngularFireDatabase,
    public navparams:NavParams){
      this.useremail = this.afAuth.auth.currentUser.email;
      this.currentid = this.afAuth.auth.currentUser.uid
      console.log(this.useremail);
      firebase
      .database()
      .ref("users")
      .orderByChild("email")
      .equalTo(this.useremail)
      .on("child_added", usern => {
        this.username = usern.val().username;
        this.phone = usern.val().Telephone;
        this.team = usern.child('Team').val().team;
        this.formations = usern.child('Team').val().formation
        this.firstname = usern.val().First_Name
        this.lastname = usern.val().Last_Name
        console.log(this.formations);
      });
      firebase.database().ref(`LeaderBoards`).orderByChild('UserID').equalTo(this.currentid).on("child_added", usrt=>{
        this.rank = usrt.val().Rank
        this.points = usrt.val().Points
        this.Won_Games = usrt.val().Wins
        this.Lost_Games = usrt.val().Losses
        this.Games_Played = this.Won_Games + this.Lost_Games
        console.log(this.rank);
          })
  }
  ranks()
  {
    switch (this.rank) {
      case "Beginner":
      this.navCtrl.push(BeginnerPage)
        break;
      case "Amateur":
      this.navCtrl.push(AmateurPage)
        break;
      case "Professional":
      this.navCtrl.push(ProfessionalPage)
      default:
        break;
    }
  }
  ionViewDidLoad() {
   
  }
}
