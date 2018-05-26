import { AddUsuarioPage } from './../add-usuario/add-usuario';
import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { NavController, AlertController } from 'ionic-angular';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  alertControl: any;
  constructor(public navCtrl: NavController,
    public afAuth: AngularFireAuth,
    private alertCtrl: AlertController, ) {
    /*
    this.afAuth.auth.subscribe( estado => {
    this.autenticacao = estado !== null; 
    });*/
  }

  cadastrar() {

    this.navCtrl.push(AddUsuarioPage);
  }


  voltar() {
    this.navCtrl.pop();
  }

  /* voltar(){
  
  this.navCtrl.push(HomePage);;
  }*/


  entrar(form: NgForm) {
    let email: string = form.value.email;
    let senha: string = form.value.senha;

    this.afAuth.auth.signInWithEmailAndPassword(email, senha)
      .then(user => {
        this.navCtrl.setRoot(HomePage);
      })
      .catch(error => {
        let msg;
        switch (error.code) { 
          case "auth/wrong-password":
            msg= "Senha inválida para o e-mail digitado.";
            break;

          case "auth/user-not-found":
            msg= 'Usuário não encontrado'
            break;

          case "auth/invalid-email":
            msg= 'E-mail inválido.';
            break;
          default:
            msg = "Ocorreu um erro ao tentar logar.";
        }

        let alerta = {
          title: 'Falha no acesso',
          subTitle: msg,
          buttons: ["Ok"]
        }
        this.alertCtrl.create(alerta).present();
      })
  }

}

