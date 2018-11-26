import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { ResultsPage } from '../results/results';


@IonicPage()
@Component({
  selector: 'page-scores',
  templateUrl: 'scores.html',
})
export class ScoresPage {

  //GameID = "Arsenal";
  counter = 0;
  counter2 = 0;
  second_team:string;
  username:string;
  first_team:string;
  challengekey: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.second_team = navParams.get("name_team");
    this.username = navParams.get("opponent_name");
    this.first_team = navParams.get('first_name_team');
    this.challengekey = navParams.get('challenge_key');
    console.log(this.challengekey)
  }

  increment(){
    this.counter ++;
  }
  
  decrement(){
    this.counter --;
  }

  increment1(){
    this.counter2 ++;
  }

  decrement1(){
    this.counter2 --;
  }

  clear(){
  }

  save_score(){
    firebase.database().ref('Games/' + this.challengekey).update({
      GameID:this.challengekey,
      First_Team_Score:this.counter,
      Second_Team_Score:this.counter2
    });
    this.navCtrl.push(ResultsPage, {chall_key:this.challengekey});
  }
  
  reset(){

  }
  ionViewDidLoad() {
    // console.log('ionViewDidLoad ScoresPage');
  }

}
