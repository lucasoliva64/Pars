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
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public cidades: Observable<Cidades[]>;
  public festas: Observable<Festa[]>;


  public usuario: Usuario;

  public cidade = new Subject<string>();

  pessoa: number;

  constructor(public navCtrl: NavController, public db: AngularFirestore, public afAuth: AngularFireAuth) {

    let uid = this.afAuth.auth.currentUser.uid;
    this.cidades = db.collection<Cidades>('cidades').valueChanges();

    this.cidade.subscribe((cidade) => {

      this.festas = this.db.collection<Festa>('festas', ref => ref.where("Cidade", '==', cidade)).valueChanges()
    })
    this.cidade.next('São José do Rio Preto');
    
  }

  perfil() {
    this.navCtrl.push(PerfilPage); //pop()

  }

  MudarCidade(form: NgForm) {
    var cid = form.value.Cidade;
    console.log(cid);
    this.cidade.next(cid);

  }

  detalhes(c) {
    this.navCtrl.push(DetalhesFestaPage, {
      id: c.id,
      Titulo: c.Titulo,
      imgCapa: c.imgCapa
    }); //pop()
  }

  public logout(): void {
    this.afAuth.auth.signOut();
  }


}
