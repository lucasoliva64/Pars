import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddFestaPage } from './add-festa';

@NgModule({
  declarations: [
    AddFestaPage,
  ],
  imports: [
    IonicPageModule.forChild(AddFestaPage),
  ],
  exports: [
    AddFestaPage
  ]
})
export class AddFestaPageModule {}
