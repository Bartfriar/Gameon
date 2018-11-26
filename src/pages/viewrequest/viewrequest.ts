import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import firebase from 'firebase';
import { MatchPage } from '../match/match';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { AngularFireAuth } from '@angular/fire/auth';

/**
 * Generated class for the ViewrequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewrequest',
  templateUrl: 'viewrequest.html',
})
export class ViewrequestPage {
  currentusername: any;
  opponentname:any;
  users:any;
  state:any;
  hide:any;
  challengerid: any;
  currentchalname: any;
  currentid:any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public afdb:AngularFireDatabase, 
    public toastCtrl:ToastController,
    public afauth:AngularFireAuth) {
    this.currentid = this.afauth.auth.currentUser.uid
    
    firebase.database().ref(`users`).orderByChild("UserID").equalTo(this.currentid).on("child_added", usr=>{
      this.currentusername = usr.val().username
    })
    this.opponentname = this.navParams.get("Opponent_name")
    console.log(`This is your challenger ${this.opponentname}`);
    
    afdb
      .list(`users`, ref =>
        ref.orderByChild("username").equalTo(this.opponentname)
      )

      .valueChanges()

      .subscribe((userdet: any) => {
        this.users = userdet;
        console.log(this.users);
      });
      firebase.database().ref(`Challenges`).orderByChild("Challenger").equalTo(this.opponentname).on("child_added", chal=>{
        this.state = chal.val().Challengestate;
        console.log(`state:${this.state}`)
        switch (this.state) {
          case "Playing":
            console.log(`in game`)
            var toast = this.toastCtrl.create({
              message: "Already in Game",
              duration: 3000
            });
            toast.present();
            this.hide = true;
            break;
        
          default:
            break;
        }
      })
      firebase.database().ref(`Challenges`).orderByChild("Opponent") .equalTo(this.currentusername).on("child_added", player2 => {
        this.currentchalname = player2.val().Challenger;//Person that challenged you
        this.challengerid = player2.val().Challengeuid;
      });
    
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewrequestPage');
  }

}
