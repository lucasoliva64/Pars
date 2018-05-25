import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCidadePage } from './add-cidade';

@NgModule({
  declarations: [
    AddCidadePage,
  ],
  imports: [
    IonicPageModule.forChild(AddCidadePage),
  ],
  exports: [
    AddCidadePage
  ]
})
export class AddCidadePageModule {}
