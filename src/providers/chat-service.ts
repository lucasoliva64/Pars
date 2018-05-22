import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';

import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { map } from 'rxjs/operator/map';

export class ChatMessage {
  messageId: string;
  userId: string;
  userName: string; 
  toUserId: string;
  time: number | string;
  message: string;
  status: string;
  room: string;
}

export class UserInfo {
  id: string;
  roomId: string;
  name?: string;
  
}



@Injectable()
export class ChatService {



  constructor(private http: HttpClient,
              private events: Events,
              public afAuth: AngularFireAuth) {
              
              
  }

  mockNewMsg(msg) {
    const mockMsg: ChatMessage = {
      messageId: Date.now().toString(),
      userId: '210000198410281948',
      userName: 'Hancock',      
      toUserId: '140000198202211138',
      time: Date.now(),
      message: msg.message,
      status: 'success',
      room: ''
    };

    setTimeout(() => {
      this.events.publish('chat:received', mockMsg, Date.now())
    }, Math.random() * 1800)
  }

  getMsgList(): Observable<ChatMessage[]> {
    const msgListUrl = ''
    return this.http.get<any>(msgListUrl)
  }

  sendMsg(msg: ChatMessage) {
    return new Promise(resolve => setTimeout(() => resolve(msg), Math.random() * 1000))
    .then(() => this.mockNewMsg(msg));
  }

  getUserInfo(): Promise<UserInfo> {
    const userInfo: UserInfo = {
      id:this.afAuth.auth.currentUser.uid,
      name: 'You',
      roomId: ""

      
    };
    return new Promise(resolve => resolve(userInfo));
  }

}
