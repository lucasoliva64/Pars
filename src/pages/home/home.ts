import { DetalhesFestaPage } from './../detalhes-festa/detalhes-festa';
import { PerfilPage } from './../perfil/perfil';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Festa } from '../../model/festa';  
import { AngularFirestore } from 'angularfire2/firestore' //firestore importar
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
 
  public festas: Observable<Festa[]>;
   pessoa: number;

   constructor(public navCtrl: NavController, public db: AngularFirestore, public afAuth: AngularFireAuth) {
     this.festas = db.collection<Festa>('festas').valueChanges();
   }

   perfil() {
     this.navCtrl.push(PerfilPage); //pop()
 
   }
 
   detalhes(id, titulo) {
     this.navCtrl.push(DetalhesFestaPage, {
       id : id,
       titulo: titulo
     }); //pop()
   }
   
   public logout() : void {
     this.afAuth.auth.signOut();
   }
 

 }
 