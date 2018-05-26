import { Subject } from 'rxjs/Subject';
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

  public busca: Observable<Usuario[]>;

  toUser: { toUserId: string, toUserName: string };

  uid: any;
  roomId: any;
  public rooms: Observable<roomMembers[]>;
  public email = new Subject<string>();


  constructor(public navCtrl: NavController,
    public db: AngularFirestore,
    public afAuth: AngularFireAuth) {
    this.uid = afAuth.auth.currentUser.uid;


    this.lista = db.collection<Usuario>
      ('usuarios', ref => ref.where(this.uid, '==', true))
      .valueChanges();
    //, ref => ref.where(this.uid, '==', true)
    this.email.subscribe((email) => {
     
      this.busca = this.db.collection<Usuario>('usuarios', ref => ref.where("email", '==', email)).valueChanges();
    });
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

  buscar(email) {
    // set val to the value of the searchbar
  
    let val = email.target.value;
    this.email.next(val);
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