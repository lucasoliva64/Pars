import { Festa } from './../../model/festa';
import { Comentarios } from './../../model/comentarios';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { NavController, LoadingController } from 'ionic-angular';
import { Usuario } from '../../model/usuario';
import { NavParams } from 'ionic-angular';
import { DetalhesPerfilPage } from '../detalhes-perfil/detalhes-perfil';
import { PerfilPage } from '../perfil/perfil';



@Component({
  selector: 'page-detalhes-festa',
  templateUrl: 'detalhes-festa.html',
})
export class DetalhesFestaPage {

  detalhes: string = "sobre";
  festaId: string;
  festaTitulo: string;
  public Comentarios: Observable<Comentarios[]>;

  public listaConfirmados: Observable<Usuario[]>;
  public festa: Observable<Festa[]>;
  hora: number = new Date().getHours();
  dia: number = new Date().getDate();
  mes: number = new Date().getMonth();
  ano: number = new Date().getFullYear();
  data: string;
  public perfil: Usuario;
  public detalheFesta: Festa;

  constructor(public navCtrl: NavController,
    public db: AngularFirestore,
    public afAuth: AngularFireAuth,
    private navParams: NavParams,
    public loadCtrl: LoadingController) {
    if (this.hora >= 0 && this.hora <= 3) {
      this.dia = this.dia - 1;
    }

    this.data = this.ano.toString() + "-" + this.mes.toString() + "-" + this.dia.toString();

    this.festaId = navParams.get('id');
    this.festaTitulo = navParams.get('titulo');
    let uid = this.afAuth.auth.currentUser.uid;
    
    this.festa = db.collection<Festa>
      ('festas', ref => ref.where('id', '==', this.festaId))
      .valueChanges();

    this.Comentarios = db.collection<Comentarios>('comentarios', ref => ref.where("idFesta", '==', this.festaId))
    .valueChanges();

    this.listaConfirmados = db.collection<Usuario>
      ('usuarios', ref => ref.where(this.festaId, '==', this.data))
      .valueChanges();

    db.collection('usuarios').doc<Usuario>(uid).valueChanges().subscribe((usuario) => {
      this.perfil = usuario;
    });
  }

  perfil2() {
    this.navCtrl.push(PerfilPage); //pop()

  }

  public logout(): void {
    this.afAuth.auth.signOut();
  }

  detalhePerfil(cid) {
    this.navCtrl.push(DetalhesPerfilPage, {
      cid: cid
    });
  }

  enviarComentario(form: NgForm) {
    let id = this.navParams.get('id');
    let Comentario =
      {
        idFesta: id,
        comentario: form.value.Comentario,
        classificacao: form.value.Classificacao,
        uid: this.afAuth.auth.currentUser.uid,
        nome: this.perfil.nome,
        imagem: this.perfil.imagem,
      }
    this.db.collection('comentarios').add(
      Comentario);
  }


  confirmar() {
    let id = this.navParams.get('id');
    let uid = this.afAuth.auth.currentUser.uid;

    console.log(id, uid, this.data, this.hora);
    this.db.collection('usuarios').doc(uid).update({ [id]: this.data });
  }
}