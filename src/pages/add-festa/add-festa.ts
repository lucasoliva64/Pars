import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { TabsPage } from '../tabs/tabs';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PerfilPage } from './../perfil/perfil';
import * as firebase from 'firebase';


@Component({
  selector: 'page-add-festa',
  templateUrl: 'add-festa.html',
})
export class AddFestaPage {
  imagemAvatar: any;
  imagemFesta: any;


  constructor(public navCtrl: NavController,
    public db: AngularFirestore,
    public loadCtrl: LoadingController,
    public afAuth: AngularFireAuth,
    private camera: Camera,
    public alertuCrtl: AlertController,

  ) { }

  public logout(): void {
    this.afAuth.auth.signOut();
  }


  perfil() {
    this.navCtrl.push(PerfilPage); //pop()

  }


  abrirCameraAvatar() {
    let options: CameraOptions = {
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
      this.imagemAvatar = 'data:image/jpeg;base64,' + imageData;

    }, (err) => {
      // Handle error
    });

  }

  abrirCameraFesta() {
    let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      targetHeight: 400,
      targetWidth: 400,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.imagemFesta = 'data:image/jpeg;base64,' + imageData;

    }, (err) => {
      // Handle error
    });

  }




  public AdicionarFesta(form: NgForm) {
    let loading = this.loadCtrl.create();
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
        Descricao: form.value.Descricao,

      }

    this.db.collection('festas').add(festa).then((ref) => {

      let nomeAvatar = ref.id + ".jpg";
      var imgAvatarRef = firebase.app().storage('gs://ionic-festa.appspot.com').ref().child('festa').child('avatar').child(nomeAvatar);
      var taskImgAvatar = imgAvatarRef.putString(this.imagemAvatar, 'data_url');
     

      let nomeFesta = ref.id + ".jpg";
      var imgFestaRef = firebase.app().storage('gs://ionic-festa.appspot.com').ref().child('festa').child('capa').child(nomeFesta);
      var taskImgCapa = imgAvatarRef.putString(this.imagemFesta, 'data_url');

     
      taskImgCapa.then().then(res => {
        var urlFesta = taskImgCapa.snapshot.downloadURL;
        console.log("imagem Capa enviada" + urlFesta);
        taskImgAvatar.then().then(res => {
          var urlAvatar = taskImgAvatar.snapshot.downloadURL;
          console.log("imagem Avatar enviada")
          this.db.collection('festas').doc(ref.id).update({
             id: ref.id,
             imgCapa: urlFesta,
             imgAvatar: urlAvatar
            })
            .then(() => {

              loading.dismiss();
              this.navCtrl.setRoot(TabsPage);
            });
        });
      });
    });

  }
}