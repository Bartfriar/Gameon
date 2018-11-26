import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase, snapshotChanges } from "@angular/fire/database";
import * as firebase from "firebase";
import { GamePage } from "../game/game";
import { MatchPage } from "../match/match";
import * as _ from "lodash";
import { query } from "@angular/core/src/animation/dsl";
import { filter } from "rxjs/operators";
import { mapTo } from "rxjs/operators";
import { HomePage } from "../home/home";
import { AboutPage } from "../about/about";

/**
 * Generated class for the RequestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-requests",
  templateUrl: "requests.html"
})
export class RequestsPage {
  Challenges: any;
  oppodet: any;
  currentuser: string;
  currentuserkey: string;
  useremail: string;
  currentname: string;
  challengername: string;
  challengertelephone: string;
  challengerteam: string;
  teamlogo: string;
  challengerform: string;
  challengerid: string;
  filteredteam: any;
  filters = {};
  constructor(
    public navCtrl: NavController,
    public afAuth: AngularFireAuth,
    public afdb: AngularFireDatabase,
    public navparams: NavParams
  ) {
    this.useremail = this.afAuth.auth.currentUser.email;

    firebase
      .database()
      .ref("users")
      .orderByChild("email")
      .equalTo(this.useremail)
      .on("child_added", usern => {
        this.currentuser = usern.val().username;
        console.log(this.currentuser);
      });

    afdb
      .list(`Challenges`, ref =>
        ref.orderByChild("Opponent").equalTo(this.currentuser)
      )

      .valueChanges()

      .subscribe((Challenge: any) => {
        this.Challenges = Challenge;
        console.log(this.Challenges);
        this.applyfilters();
      });

    var filterchallenges = firebase
      .database()
      .ref("Challenges")
      .orderByChild("Opponent")
      .equalTo(this.currentuser);
    firebase
      .database()
      .ref(`Challenges`)
      .orderByChild("Opponent")
      .equalTo(this.currentuser)
      .on("child_added", player2 => {
        this.currentname = player2.val().Challenger;
        this.challengerid = player2.val().Challengeuid;

        console.log(this.currentname);

        firebase
          .database()
          .ref(`users`)
          .orderByChild("username")
          .equalTo(this.currentname)
          .on("child_added", oppo => {
            this.challengername = oppo.val().username;
            this.teamlogo = oppo.child("Team").val().logo;
            this.challengerteam = oppo.child("Team").val().team;
            this.challengerform = oppo.child("Team").val().formation;
          });
      });
  }
  private getoppo() {
    this.filters = firebase
      .database()
      .ref("Challenges")
      .orderByChild("Oppponent")
      .equalTo(this.currentuser);
    this.applyfilters();
    console.log(this.filters);
  }
  private applyfilters() {
    this.filteredteam = _.filter(this.Challenges, _.conforms(this.filters));
    console.log(this.filteredteam);
  }
  accept(opponent) {
    firebase
      .database()
      .ref(`Challenges/${this.challengerid}`)
      .update({
        Challengestate: "Yes"
      });
    this.navCtrl.push(MatchPage, {
      opponent_name: opponent.Opponent,
      challenger_id: this.challengerid
    });
  }
  decline(opponent) {}
  home()
  {
    this.navCtrl.setRoot(HomePage)
  }
  profile()
  {
    this.navCtrl.setRoot(AboutPage)
  }
}
