import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { TabsPage } from '../tabs/tabs';



@Component({
  selector: 'page-add-festa',
  templateUrl: 'add-festa.html',
})
export class AddFestaPage {
  constructor(public navCtrl: NavController,
    public db: AngularFirestore,
    public loadCtrl: LoadingController,
    public afAuth: AngularFireAuth,
    public alertuCrtl: AlertController,

  ) { }

  public AdicionarFesta(form: NgForm) {

    let loading = this.loadCtrl.create({ duration: 1000 });
    loading.present();

    let festa =
      {
        uid: this.afAuth.auth.currentUser.uid,
        Titulo: form.value.Titulo,
        DiasFuncionamento: form.value.DiasFuncionamento,
        Local: form.value.Local,
        HorarioInicio: form.value.HorarioInicio,
        HorarioFim: form.value.HorarioFim,
        Valor: form.value.Valor,
        Descricao: form.value.Descricao
      }

      console.log(festa);

    this.db.collection('festas').add(festa).then((ref) => {

     

      this.db.collection('festas').doc(ref.id).update({ id: ref.id })
        .then(() => {

          loading.dismiss();
          this.navCtrl.setRoot(TabsPage);
        });
    });


  }
}