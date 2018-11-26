import { Component } from "@angular/core";
import { NavController, NavParams, ToastController } from "ionic-angular";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase, snapshotChanges } from "@angular/fire/database";
import { ScoresPage } from "../scores/scores";
import { GamePage } from "../game/game";
import * as firebase from "firebase";
import { RequestsPage } from "../requests/requests";
import { AboutPage } from "../about/about";
import { filter } from "rxjs/operators";
import { UserprofilePage } from "../userprofile/userprofile";
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { TeamDetailsPage } from "../team-details/team-details";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  users: any;
  datechal:any;
  state: any;
  useremail: string;
  currentuser: string;
  teamdet: string;
  teampic: any;
  teamform: any;
  firstName: string;
  lastname:string;
  teamlogo: string;
  logger: any;
  rank: any;
  win: any;
  loss: any;
  currentid: any;
  cteam:any;
  @ViewChild('slides') slides: Slides;
  constructor(
    public navCtrl: NavController,
    public afAuth: AngularFireAuth,
    public afdb: AngularFireDatabase,
    public navparams: NavParams,
    public toastCtrl: ToastController
  ) {
    
    this.useremail = this.afAuth.auth.currentUser.email;
    this.currentid = this.afAuth.auth.currentUser.uid;
    firebase.database().ref(`users/${this.currentid}`).on("value", tm =>{
      this.cteam = tm.child("Team").val()
      if (this.cteam == null) {
        var toast = this.toastCtrl.create({
        message: "Please choose a team first",
        duration: 3000
      });
      toast.present();
        this.navCtrl.setRoot(TeamDetailsPage)
      } else {
        console.log(this.cteam.team)
      }
      // switch (this.cteam == null ) {
      //   case null:
      //   console.log("Please select team")
      //     // this.navCtrl.setRoot(TeamDetailsPage)
      //     break;
      
      //   default: console.log("Team selected")
      //     break;
      // }
    })
//Iterates the users in system
    afdb
      .list(`users`, ref => ref.orderByChild("UserID"))
      .valueChanges()
      .subscribe((user: any) => {
        this.users = user;
        this.users = this.users.filter(usr => usr.UserID != this.currentid );
        this.users = this.users.filter(tm => tm.Team != null)
      });

    this.logger = firebase
      .database()
      .ref("users")
      .orderByChild("email")
      .equalTo(this.useremail);
    firebase
      .database()
      .ref("users")
      .orderByChild("email")
      .equalTo(this.useremail)
      .on("child_added", usern => {
        this.currentuser = usern.val().username;
      });
  }
  //Challenge Button
  challenge(opponent) {
    var challengekey = firebase
      .database()
      .ref()
      .child("Challenges")
      .push().key;
//Saving challenge info to the DB
    firebase
      .database()
      .ref(`Challenges/${challengekey}`)
      .set({
        Challengeuid: challengekey,
        Challenger: this.currentuser, //challenger
        Opponent: opponent.username, //opponent
        Challengestate: "No",
    
      });
      this.slides.slideNext();
//Query challenges for the state
    firebase
      .database()
      .ref("Challenges")
      .orderByChild("Challenger")
      .equalTo(this.currentuser)
      .on("child_changed", chal => {
        this.state = chal.val().Challengestate;
        console.log(this.state);

        //Checks for state of challenge to determine the path
        if (this.state == "Yes") {
          this.navCtrl.push(GamePage, {
            opponent_name: opponent.username,
            Challenge_key: challengekey
          });
        } else {
          this.navCtrl.push(RequestsPage, { opponent_name: opponent.username });
        }
      });
  }
  more(opponent)
  {
    this.navCtrl.push(UserprofilePage, { opponent_name: opponent.username, opponent_uid: opponent.UserID });
  }
  torequests() {
    this.navCtrl.push(RequestsPage);
  }
  profile() {
    this.navCtrl.push(AboutPage);
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
