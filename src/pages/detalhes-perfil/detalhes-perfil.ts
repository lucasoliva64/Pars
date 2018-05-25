import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { NavController } from 'ionic-angular';
import { Usuario } from '../../model/usuario';
import { NavParams } from 'ionic-angular';
import { PerfilPage } from '../perfil/perfil';


@Component({
  selector: 'page-detalhes-perfil',
  templateUrl: 'detalhes-perfil.html',
})

export class DetalhesPerfilPage {

  public contato: Observable<Usuario[]>;

  constructor(public navCtrl: NavController,
    public db: AngularFirestore,
    public afAuth: AngularFireAuth,
    private navParams: NavParams) {
    let cid = navParams.get('cid');
    let uid = afAuth.auth.currentUser.uid;
    this.contato = db.collection<Usuario>
      ('usuarios', ref => ref.where('uid', '==', cid))
      .valueChanges();
  }
  perfil() {
    this.navCtrl.push(PerfilPage); //pop()

  }

  public logout() : void {
    this.afAuth.auth.signOut();
  }
  

  addContato(id) {

    let uid = this.afAuth.auth.currentUser.uid;
    this.db.collection('usuarios').doc(id).update({ [uid]: true });

    let room = {
      id: ''
    }
    let roomMembers = {
      id: "",
      uid: uid,
      uidOutro: id
    }
    let roomMembersCopia = {
      id: "",
      uid: id,
      uidOutro: uid
    }


    this.db.collection('rooms').add(room).then((ref) => {

      room.id = ref.id;

      this.db.collection('rooms').doc(ref.id).update({ id: ref.id })

        .then((ref) => {
          this.db.collection('room-members').add(roomMembers).then((ref) => {
            this.db.collection('room-members').doc(ref.id).update({
              id: room.id
            });
          });

          this.db.collection('room-members').add(roomMembersCopia).then((ref) => {
            this.db.collection('room-members').doc(ref.id).update({
              id: room.id

            });

          });
        });




    });




  }

}
