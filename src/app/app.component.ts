import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from './../pages/login/login';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any; 

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, afAuth: AngularFireAuth ) {

    platform.ready().then(() => {
      afAuth.authState.subscribe((state) => {
        if(state == null)
        this.rootPage = LoginPage;
        else
        this.rootPage= TabsPage; //se cadastrar vai para tal
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
