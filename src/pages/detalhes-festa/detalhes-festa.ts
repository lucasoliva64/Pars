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
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, Marker, Circle, MyLocationOptions, MyLocation, LatLng, GoogleMapOptions } from '@ionic-native/google-maps';




@Component({
  selector: 'page-detalhes-festa',
  templateUrl: 'detalhes-festa.html',
})
export class DetalhesFestaPage {

  map: GoogleMap;
  lat: any;
  lng: any;
  acr: any;

  detalhes: string = "sobre";
  festaId: string;
  festaTitulo: string;
  public Comentarios: Observable<Comentarios[]>;

  ionViewDidLoad() {
    this.loadMap();
  }


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
    public loadCtrl: LoadingController,
    private geolocation: Geolocation) {

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



  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let mapOptions: GoogleMapOptions = {
        camera: {
          target: {
            lat: resp.coords.latitude,
            lng: resp.coords.longitude
          },
          zoom: 500
        }
      };

      this.map = GoogleMaps.create('map_canvas', mapOptions);
      let marker: Marker = this.map.addMarkerSync({
        title: '@ionic-native/google-maps',
        icon: 'red',
        animation: 'DROP',
        position: {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude
        },
        draggable: true
      });

      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      this.acr = marker.getPosition;
      // resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
    // Create a map after the view is ready and the native platform is ready.

  }
}