import { Component } from "@angular/core";
import { Platform, AlertController, NavController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { TabsPage } from "../pages/tabs/tabs";
import { LoginPage } from "../pages/login/login";
import { RegisterPage } from "../pages/register/register";
import { AngularFireAuth } from "@angular/fire/auth";
import { TeamDetailsPage } from "../pages/team-details/team-details";
import { HomePage } from "../pages/home/home";
import { ScoresPage } from "../pages/scores/scores";
import { AboutPage } from "../pages/about/about";
import { FormationsPage } from "../pages/formations/formations";
import { GamePage } from "../pages/game/game";
import { RequestsPage } from "../pages/requests/requests";
import { RanksPage } from "../pages/ranks/ranks";
import { MatchPage } from "../pages/match/match";
import * as firebase from "firebase";
import { AngularFireDatabase } from "@angular/fire/database";
import { BeginnerPage } from "../pages/beginner/beginner";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any;
  team: any;
  wteam: any;
  currentid:any;
  state:any;
  currentuser:any;
  opponent:any;

  constructor(
    public checkAut: AngularFireAuth,
    public afdb: AngularFireDatabase,
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public alertCtrl: AlertController
  ) {
    this.afdb
      .list(`users`)
      .stateChanges()
      .subscribe((cteam: any) => {
        this.wteam = cteam.payload.val().Team;
      });

    checkAut.authState.subscribe(user => {
      if (user) {
        this.rootPage = HomePage;
        this.currentid = this.checkAut.auth.currentUser.uid
        firebase.database().ref(`users`).orderByChild('UserID').equalTo(this.currentid).on("child_added", usr=>{
          this.currentuser = usr.val().username
        console.log(this.currentuser)
        firebase.database().ref(`Challenges`).orderByChild('Challenger').equalTo(this.currentuser).on("child_added", chal=>{
          this.state = chal.val().Challengestate
          this.opponent = chal.val().Opponent
          console.log(this.state)
          switch (this.state) {
            case "Yes":
            console.log("Someone wants a game")
              this.rootPage = GamePage;
              const confirm = this.alertCtrl.create({
                title: `${this.opponent} accepted your challenge` ,
                message: 'Do you want to play with this person?',
                buttons: [
                  {
                    text: 'No',
                    handler: ()=>{
                      console.log("No Clicked")
                    }
                  },
                  {
                    text: 'Yes',
                    handler: ()=>{
                      this.rootPage = GamePage
                    }
                  }
                ]
              });
              confirm.present();
              break;
          
            default: this.rootPage = HomePage;
              break;
          }
        })
      })
      } else {
        console.log("Not logged in");
        this.rootPage = LoginPage;
      }
     
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
