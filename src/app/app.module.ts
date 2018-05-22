import { RelativeTime } from './../pipes/relative-time';
import { EmojiPickerComponent } from './../components/emoji-picker/emoji-picker';
import { ChatService } from './../providers/chat-service';
import { EmojiProvider } from './../providers/emoji';
import { Camera } from '@ionic-native/camera';
import { AddFestaPage } from './../pages/add-festa/add-festa';
import { AddUsuarioPage } from './../pages/add-usuario/add-usuario';
import { ChatPage } from './../pages/chat/chat';
import { DetalhesPerfilPage } from './../pages/detalhes-perfil/detalhes-perfil';
import { DetalhesFestaPage } from './../pages/detalhes-festa/detalhes-festa';
import { PerfilPage } from './../pages/perfil/perfil';
import { ContatosPage } from './../pages/contatos/contatos';
import { LoginPage } from './../pages/login/login';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2'; //import firebase
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth'; //autentificação
import { HttpClientModule } from '@angular/common/http';

//ionic cordova plugin add cordova-plugin-googlemaps  --variable API_KEY_FOR_ANDROID="(AIzaSyAF8d-ZStE0Lxk1q34fcELyTQSWbCqWprI)" 
  //AIzaSyAF8d-ZStE0Lxk1q34fcELyTQSWbCqWprI - Android KEy google maps
//ionic cordova plugin add cordova-plugin-googlemaps  --variable API_KEY_FOR_ANDROID="AIzaSyAF8d-ZStE0Lxk1q34fcELyTQSWbCqWprI" --variable API_KEY_FOR_IOS="AIzaSyAF8d-ZStE0Lxk1q34fcELyTQSWbCqWprI"


const config = {
  apiKey: "AIzaSyAxoloKFri0tcU4k5HUeMpQnSNFNE0lNEo",
  authDomain: "ionic-festa.firebaseapp.com",
  databaseURL: "https://ionic-festa.firebaseio.com",
  projectId: "ionic-festa",
  storageBucket: "ionic-festa.appspot.com",
  messagingSenderId: "937249463847"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ContatosPage,
    PerfilPage,
    LoginPage,
    DetalhesFestaPage,
    DetalhesPerfilPage,
    ChatPage,
    RelativeTime,
    EmojiPickerComponent,
    AddUsuarioPage,
    AddFestaPage,
    TabsPage
  ],
  imports: [
    BrowserModule,    
    IonicModule.forRoot(MyApp,  {tabsHideOnSubPages:true}),
     AngularFireModule.initializeApp(config), //firebase iniciar
    AngularFirestoreModule, AngularFireAuthModule, //angular iniciar
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ContatosPage,
    PerfilPage,
    LoginPage,
    ChatPage,
    AddUsuarioPage,
    AddFestaPage,
    DetalhesFestaPage,
    EmojiPickerComponent,
    DetalhesPerfilPage,
    TabsPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StatusBar,
    SplashScreen,
    Camera,    
    EmojiProvider,
    ChatService
  
  ]
})
export class AppModule {}


