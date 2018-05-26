import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Cidades } from './../../model/cidades';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-add-cidade',
  templateUrl: 'add-cidade.html',
})
export class AddCidadePage {

  cidades: Observable<Cidades[]>;

  constructor(public db: AngularFirestore, public navCtrl: NavController) {
    this.cidades = db.collection<Cidades>('cidades').valueChanges();

  }
  add(form: NgForm) {
    console.log(form.value.nome)
    this.db.collection('cidades').add({
      cidade: form.value.nome,
    }).then(() => {
      this.navCtrl.pop();
    });
  }


}
