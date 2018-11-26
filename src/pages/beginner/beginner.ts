import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import * as firebase from "firebase";
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { HomePage } from "../home/home";
import { RequestsPage } from "../requests/requests";
import { AboutPage } from "../about/about";
/**
 * Generated class for the BeginnerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-beginner",
  templateUrl: "beginner.html"
})
export class BeginnerPage {
  Beginners: any;
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
      .subscribe((beginner: any) => {
        this.Beginners = beginner;
        this.Beginners = this.Beginners.filter(big => big.Rank == "Beginner");
        console.log(this.Beginners);
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
      .equalTo("Beginner")
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
    console.log("ionViewDidLoad BeginnerPage");
  }
}
