import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../model/usuario';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from 'firebase';




@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})

export class PerfilPage {
  imagem: any;


  public usuario = {
    nome: "Fulano",
    sobre: "Curto musicas",
    Genero: "Masculino",


  }
  public Perfil: Observable<Usuario[]>;
  public Usuario: Usuario;


  constructor(
    public db: AngularFirestore,
    public afAuth: AngularFireAuth,
    public NavCtrl: NavController,
    private camera: Camera,
    public loadCtrl: LoadingController,
    public alertCtrl: AlertController) {

    let uid = this.afAuth.auth.currentUser.uid;
    this.Perfil = db.collection<Usuario>('usuarios', ref => ref.where('uid', '==', uid)).valueChanges();
  }

  abrirCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      targetHeight: 200,
      targetWidth: 200,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.imagem = 'data:image/jpeg;base64,' + imageData;

    }, (err) => {
      // Handle error
    });

  }


  salvar(form: NgForm) {
    let alert = this.alertCtrl.create({
      title: 'Perfil atualizado com sucesso!',
      buttons: ['Ok']
    });
    if (this.imagem != undefined) {
      let nome = this.afAuth.auth.currentUser.uid + ".jpg";
      var imgRef = firebase.app().storage('gs://ionic-festa.appspot.com').ref().child('usuarios').child(nome);
      var task = imgRef.putString(this.imagem, 'data_url');

      task.then().then(res => {
        var url = task.snapshot.downloadURL;
        let usuario = {
          nome: form.value.nome,
          sobre: form.value.sobre,
          genero: form.value.genero,
          imagem: url,
          uid: this.afAuth.auth.currentUser.uid
        }
        this.db.collection("usuarios").doc(usuario.uid)
          .update(
            {
              nome: usuario.nome,
              sobre: usuario.sobre,
              genero: usuario.genero,
              imagem: usuario.imagem
            }).then(function () {
              alert.present();
            });
      });
    } else {

      let usuario = {
        nome: form.value.nome,
        sobre: form.value.sobre,
        genero: form.value.genero,
        uid: this.afAuth.auth.currentUser.uid
      }
      this.db.collection("usuarios").doc(usuario.uid)
        .update(
          {
            nome: usuario.nome,
            sobre: usuario.sobre,
            genero: usuario.genero,
          }).then(function () {
            alert.present();
          });
    }
  }
}



