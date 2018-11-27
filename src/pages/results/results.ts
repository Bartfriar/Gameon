import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import * as firebase from "firebase";
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth/auth";
import { RanksPage } from "../ranks/ranks";
import { ProfessionalPage } from "../professional/professional";
import { BeginnerPage } from "../beginner/beginner";
import { AmateurPage } from "../amateur/amateur";

/**
 * Generated class for the ResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-results",
  templateUrl: "results.html"
})
export class ResultsPage {
  challengekey: any;
  Seconduser: any;
  Firstuser: any;
  FTeam: any;
  STeam: any;
  FTeam_Score: any;
  STeam_Score: any;
  Result: string;
  ResultB: string;
  currentuser: any;
  Displayname: any;
  Displayteam: any;
  DisplayScore: any;
  Secondteam:any;
  Secondteamscore:any;
  useremail: any;
  userid: any;
  Won_game: number = 0;
  Lost_game: number = 0;
  Points: number = 0;
  Position: any;
  une: number = 1;
  trois: number = 3;
  deux: number = 2;
  rank_position: any;
  constructor(
    public navCtrl: NavController,
    public afAuth: AngularFireAuth,
    public navParams: NavParams,
    public afdb: AngularFireDatabase
  ) {
    this.challengekey = navParams.get("chall_key");
    // this.Seconduser = navParams.get('opponent_name');
    firebase
      .database()
      .ref("Games")
      .orderByChild("GameID")
      .equalTo(this.challengekey)
      .on("child_added", res => {
        this.FTeam_Score = res.val().First_Team_Score;
        this.STeam_Score = res.val().Second_Team_Score;
        this.FTeam = res.val().First_Team;
        this.STeam = res.val().Second_Team;
        this.Seconduser = res.val().Second_User;
        this.Firstuser = res.val().First_User

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
        if (this.currentuser == this.Firstuser) {
          this.Displayname = this.Firstuser;
          this.DisplayScore = this.FTeam_Score;
          this.Displayteam = this.FTeam;
          this.Secondteam = this.STeam;
          this.Secondteamscore = this.STeam_Score;
          console.log(this.Displayname);
          firebase
            .database()
            .ref("LeaderBoards")
            .orderByChild("User")
            .equalTo(this.Displayname)
            .on("child_added", rate => {
              this.Points = rate.val().Points;
              this.Won_game = rate.val().Wins;
              this.Lost_game = rate.val().Losses;
            });
          firebase
            .database()
            .ref("users")
            .orderByChild("username")
            .equalTo(this.Displayname)
            .on("child_added", takid => {
              this.userid = takid.val().UserID;
              console.log(this.userid);
            });
 
          if (this.FTeam_Score > this.STeam_Score) {
            this.Result = "Winner";
          } else {
            this.Result = "Loser";
          }

          if (this.Result == "Winner") {
            firebase
            .database()
            .ref("LeaderBoards")
            .orderByChild("User")
            .equalTo(this.Displayname)
            .on("child_added", rate => {
              this.Points = rate.val().Points;
              this.Won_game = rate.val().Wins;
          
              this.Points += 3;
              this.Won_game += 1;
              if (this.Points < 100) {
                this.Position = "Beginner";
              } else if (this.Points < 200 && this.Points > 100) {
                this.Position = "Amateur";
              } else {
                this.Position = "Professional";
              }
              firebase
                .database()
                .ref(`LeaderBoards/${this.userid}`)
                .update({
                  User: this.Displayname,
                  Points: this.Points,
                  Rank: this.Position,
                  Wins: this.Won_game,
                  Losses: this.Lost_game
                });
              console.log(this.Points);
              firebase.database().ref(`Challenges/${this.challengekey}`).update({
                Challengestate:"Played"
              });
            });
          } else {
            firebase
            .database()
            .ref("LeaderBoards")
            .orderByChild("User")
            .equalTo(this.Displayname)
            .on("child_added", rate => {
              this.Points = rate.val().Points;
              this.Lost_game = rate.val().Losses;
          
              this.Points -= 2;
              this.Lost_game += 1;
              if (this.Points < 100) {
                this.Position = "Beginner";
              } else if (this.Points < 200 && this.Points > 100) {
                this.Position = "Amateur";
              } else {
                this.Position = "Professional";
              }
              firebase
                .database()
                .ref(`LeaderBoards/${this.userid}`)
                .update({
                  User: this.Displayname,
                  Points: this.Points,
                  Rank: this.Position,
                  Wins: this.Won_game,
                  Losses: this.Lost_game
                });
              console.log(this.Points);
              firebase.database().ref(`Challenges/${this.challengekey}`).update({
                Challengestate:"Played"
              });
            });

          }
          console.log(this.Won_game);
          // firebase
          //   .database()
          //   .ref(`LeaderBoards/${this.userid}`)
          //   .update({
          //     User: this.Displayname,
          //     Points: this.Points,
          //     Rank: this.Position,
          //     Wins: this.Won_game,
          //     Losses: this.Lost_game
          //   });
        }

        if (this.currentuser == this.Seconduser) {
          this.Displayname = this.Seconduser;
          this.DisplayScore = this.STeam_Score;
          this.Displayteam = this.STeam;
          this.Secondteam = this.FTeam;
          this.Secondteamscore = this.FTeam_Score;
          firebase
            .database()
            .ref("LeaderBoards")
            .orderByChild("User")
            .equalTo(this.Displayname)
            .on("child_added", rate => {
              this.Points = rate.val().Points;
              this.Won_game = rate.val().Wins;
              this.Lost_game = rate.val().Losses;

              console.log(this.Points);
            });

          firebase
            .database()
            .ref("users")
            .orderByChild("username")
            .equalTo(this.Displayname)
            .on("child_added", takid => {
              this.userid = takid.val().UserID;
              console.log(this.userid);
            });
          if (this.STeam_Score > this.FTeam_Score) {
            this.Result = "Winner";
          } else {
            this.Result = "Loser";
          }
          // console.log(`Current value: ${this.Points}`);
          if (this.Result == "Winner") {
            firebase
            .database()
            .ref("LeaderBoards")
            .orderByChild("User")
            .equalTo(this.Displayname)
            .on("child_added", rate => {
              this.Points = rate.val().Points;
              this.Won_game = rate.val().Wins;
          
              this.Points += 3;
              this.Won_game += 1;
              if (this.Points < 100) {
                this.Position = "Beginner";
              } else if (this.Points < 200 && this.Points > 100) {
                this.Position = "Amateur";
              } else {
                this.Position = "Professional";
              }
              firebase
                .database()
                .ref(`LeaderBoards/${this.userid}`)
                .update({
                  User: this.Displayname,
                  Points: this.Points,
                  Rank: this.Position,
                  Wins: this.Won_game,
                  Losses: this.Lost_game
                });
              console.log(this.challengekey);
              firebase.database().ref(`Challenges/${this.challengekey}`).update({
                Challengestate:"Played"
              });
            });
          } else {
            firebase
            .database()
            .ref("LeaderBoards")
            .orderByChild("User")
            .equalTo(this.Displayname)
            .on("child_added", rate => {
              this.Points = rate.val().Points;
              this.Lost_game = rate.val().Losses;
          
              this.Points -= 2;
              this.Lost_game += 1;
              if (this.Points < 100) {
                this.Position = "Beginner";
              } else if (this.Points < 200 && this.Points > 100) {
                this.Position = "Amateur";
              } else {
                this.Position = "Professional";
              }
              firebase
                .database()
                .ref(`LeaderBoards/${this.userid}`)
                .update({
                  User: this.Displayname,
                  Points: this.Points,
                  Rank: this.Position,
                  Wins: this.Won_game,
                  Losses: this.Lost_game
                });
              console.log(this.Points);
              firebase.database().ref(`Challenges/${this.challengekey}`).update({
                Challengestate:"Played"
              });
            });
          }
          // firebase
          //   .database()
          //   .ref(`LeaderBoards/${this.userid}`)
          //   .update({
          //     User: this.Displayname,
          //     Points: this.Points,
          //     Rank: this.Position,
          //     Wins: this.Won_game,
          //     Losses: this.Lost_game
          //   });
        }
      });
  }
  rank() {
    firebase
      .database()
      .ref("LeaderBoards")
      .orderByChild("User")
      .equalTo(this.currentuser)
      .on("child_added", ranked => {
        this.rank_position = ranked.val().Rank;
        console.log(this.rank_position);
      });
    if (this.rank_position == "Professional") {
      this.navCtrl.setRoot(ProfessionalPage);
    } else if (this.rank_position == "Amateur") {
      this.navCtrl.setRoot(AmateurPage);
    } else {
      this.navCtrl.setRoot(BeginnerPage);
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ResultsPage");
  }
}
