import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home'
import { NgForm } from '@angular/forms'; //banco
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-add-usuario',
  templateUrl: 'add-usuario.html',
})
export class AddUsuarioPage {

  constructor(public navCtrl: NavController, public db: AngularFirestore,
    public loadCtrl: LoadingController,
    public afAuth: AngularFireAuth,
    public alertuCrtl: AlertController) { }

  voltar() {

    this.navCtrl.push(HomePage);;
  }

  public cadastrarUsuario(form: NgForm): void {

    let loading = this.loadCtrl.create({ duration: 3000, });
    loading.present();

    let nome: string = form.value.nome;
    let email: string = form.value.email;
    let senha: string = form.value.senha;

    this.afAuth.auth.createUserWithEmailAndPassword(email, senha)
      .then((user) => {
        this.db.collection("usuarios").doc(user.uid)

        .set({
          uid: user.uid,
          nome: nome,
          email: email,
          imagem: 'https://openclipart.org/image/800px/svg_to_png/247319/abstract-user-flat-3.png'

        })

      })
      .catch((error) => {
        let erro = "";
        switch(error.code){
          case "auth/email-already-in-use":
            erro = "O email já está sendo usado.";
          break;
          case "auth/invalid-email":
            erro = "Email inválido.";
          break;
          case "auth/weak-password":
            erro = "Senha muito fraca.";
          break;
          default:
            erro = "Ocorreu um erro ao cadastrar.";
        }

        this.alertuCrtl.create({
          title: "Erro no registro",
          subTitle: erro,
          buttons:["Ok"]
        }).present();
      })


  }
}
