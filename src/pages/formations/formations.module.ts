import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormationsPage } from './formations';

@NgModule({
  declarations: [
    FormationsPage,
  ],
  imports: [
    IonicPageModule.forChild(FormationsPage),
  ],
})
export class FormationsPageModule {}
