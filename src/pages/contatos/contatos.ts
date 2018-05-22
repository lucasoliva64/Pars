import { roomMembers } from './../../model/room-members';
import { ChatPage } from './../chat/chat';
import { PerfilPage } from './../perfil/perfil';
import { Component } from '@angular/core';
import { Usuario } from '../../model/usuario';
import { DetalhesPerfilPage } from '../detalhes-perfil/detalhes-perfil';
import { NavController } from 'ionic-angular';

import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';



@Component({
  selector: 'page-contatos',
  templateUrl: 'contatos.html',
})
export class ContatosPage {

  public lista: Observable<Usuario[]>;

  toUser: { toUserId: string, toUserName: string };

  uid: any;
  roomId: any;
  public rooms: Observable<roomMembers[]>;


  constructor(public navCtrl: NavController,
    public db: AngularFirestore,
    public afAuth: AngularFireAuth) {
    this.uid = afAuth.auth.currentUser.uid;


    this.lista = db.collection<Usuario>
      ('usuarios', ref => ref.where(this.uid, '==', true))
      .valueChanges();
//, ref => ref.where(this.uid, '==', true)
  }

perfilDetalhes(cid) {
      this.navCtrl.push(DetalhesPerfilPage, {
      cid: cid
    });

  }

  perfil() {
    this.navCtrl.push(PerfilPage); //pop()

  }

  public logout(): void {
    this.afAuth.auth.signOut();
  }

  openChat(cid, nome) {
    let y = ''

    this.rooms = this.db.collection<roomMembers>
      ('room-members', ref => ref.where('uid', '==', this.uid).where('uidOutro', '==', cid)).valueChanges();

    let contexto = this;

    this.rooms.subscribe(
      function (x) {
        y = x[0].id;
      contexto.navCtrl.push(ChatPage, {
      uid: cid,
      nome: nome,
      id: y
    });

      }
    );
    

    



  }

}