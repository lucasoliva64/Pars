import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateFestaPage } from './update-festa';

@NgModule({
  declarations: [
    UpdateFestaPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateFestaPage),
  ],
  exports: [
    UpdateFestaPage
  ]
})
export class UpdateFestaPageModule {}
