import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalhesFestaPage } from './detalhes-festa';

@NgModule({
  declarations: [
    DetalhesFestaPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalhesFestaPage),
  ],
  exports: [
    DetalhesFestaPage
  ]
})
export class DetalhesFestaPageModule {}
