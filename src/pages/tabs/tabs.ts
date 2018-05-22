import { PerfilPage } from './../perfil/perfil';
import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { AddFestaPage } from '../add-festa/add-festa';
import { AngularFireAuth } from 'angularfire2/auth';
import { ContatosPage } from '../contatos/contatos';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  
  uid: any;
  tab1Root = HomePage;
  tab2Root = PerfilPage;
  tab3Root = ContatosPage;
  tab4Root = AddFestaPage;
  constructor(public afAuth: AngularFireAuth) {
 
    this.uid = this.afAuth.auth.currentUser.uid;

  }



}