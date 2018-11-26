import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { AngularFireAuth } from "@angular/fire/auth";
import { ToastController } from "ionic-angular";
import { AngularFireDatabase } from "@angular/fire/database";
import { LoginPage } from "../login/login";
import { TeamDetailsPage } from "../team-details/team-details";
import * as firebase from "firebase";
import { HomePage } from "../home/home";

@IonicPage()
@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage {
  a: string;
  b: string;
  firstname:string;
  lastname:string;
  username: string;
  Tel: string;
  Points: number = 0;
  Position: string = "Beginner";

  constructor(
    public afAuth: AngularFireAuth,
    public afDb: AngularFireDatabase,
    public navCtrl: NavController,
    public toastCtrl: ToastController
  ) {}

  ionViewDidLoad() {
    //
  }

  async register() {
    this.afAuth.auth
      .createUserWithEmailAndPassword(this.a, this.b)
      .then(user => {
        var userDetails = user.user;
        this.afDb.object(`users/${userDetails.uid}`).set({
          email: userDetails.email,
          First_Name:this.firstname,
          Last_Name:this.lastname,
          username: this.username,
          UserID: userDetails.uid,
          Telephone: this.Tel
        });

        firebase
          .database()
          .ref(`LeaderBoards/${userDetails.uid}`)
          .update({
            User: this.username,
            UserID: userDetails.uid,
            Points: this.Points,
            Rank: this.Position,
            Wins: 0,
            Losses: 0
          });
        var toast = this.toastCtrl.create({
          message: "You have successfully registered",
          duration: 3000
        });
        toast.present();
      })
      .catch(err => {
        const toast = this.toastCtrl.create({
          message: err.message,
          duration: 3000
        });
        toast.present();
      });
    this.navCtrl.setRoot(TeamDetailsPage);
  }

  gotoLoginPage() {
    this.navCtrl.setRoot(LoginPage);
  }
}
