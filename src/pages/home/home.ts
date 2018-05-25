import { NgForm } from '@angular/forms';
import { Usuario } from './../../model/usuario';
import { Cidades } from './../../model/cidades';
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

  public cidades: Observable<Cidades[]>;
  public festas: Observable<Festa[]>;

  public cidade: any;
  public usuario: Usuario;



  pessoa: number;

  constructor(public navCtrl: NavController, public db: AngularFirestore, public afAuth: AngularFireAuth) {
    this.cidade = "São José do Rio Preto";
    let uid = this.afAuth.auth.currentUser.uid;
    this.festas = db.collection<Festa>('festas', ref => ref.where("Cidade", '==', this.cidade))
      .valueChanges();
    this.cidades = db.collection<Cidades>('cidades').valueChanges();
  }

  perfil() {
    this.navCtrl.push(PerfilPage); //pop()

  }

  MudarCidade(form: NgForm) {
    var cid = form.value.cidade;
    this.festas.subscribe().unsubscribe();
    console.log(form.value.Cidade)
    this.festas = this.db.collection<Festa>('festas', ref => ref.where("Cidade", '==', cid))
    .valueChanges();
  }

  detalhes(id, titulo) {
    this.navCtrl.push(DetalhesFestaPage, {
      id: id,
      titulo: titulo
    }); //pop()
  }

  public logout(): void {
    this.afAuth.auth.signOut();
  }


}
