import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { TeamInfo } from '../../models/team-details/team-details.interface';
// Firebase
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormationsPage } from '../formations/formations';

@IonicPage()
@Component({
  selector: 'page-team-details',
  templateUrl: 'team-details.html',
})
export class TeamDetailsPage {

  
  team:any;
  teamInfo = {} as TeamInfo

  constructor(
    public navCtrl: NavController,
    public afAuth: AngularFireAuth,
    public afDb: AngularFireDatabase) {
      this.initializeItems();
      afDb.list(`Teams`).valueChanges().subscribe((teams: any) => {
          this.team = teams;
          console.log(this.team);
      });
  }

  format(chosen_team){
    var logo = chosen_team.Logo;
    var team_name = chosen_team.Team_Name;

    this.navCtrl.push(FormationsPage, {name_team:team_name, logo_team:logo})
  }

  initializeItems(){
   
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.team = this.team.filter((team) => {
        return (team.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  addteamdetails(teamInfo: TeamInfo){
    console.log(teamInfo)
  }
 

}
