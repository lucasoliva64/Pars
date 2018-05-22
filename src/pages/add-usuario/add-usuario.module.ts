import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddUsuarioPage } from './add-usuario';

@NgModule({
  declarations: [
    AddUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(AddUsuarioPage),
  ],
  exports: [
    AddUsuarioPage
  ]
})
export class AddUsuarioPageModule {}
