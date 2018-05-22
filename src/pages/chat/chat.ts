import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { ChatMessage, UserInfo, ChatService } from './../../providers/chat-service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Events, Content } from 'ionic-angular';
import { RelativeTime } from '../../pipes/relative-time';


/**
 * Generated class for the ChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {


  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: ElementRef;
  msgList: ChatMessage[] = []
  user: UserInfo;
  toUser: UserInfo;
  editorMsg = '';
  showEmojiPicker = false;
  public lista: Observable<ChatMessage[]>;
  public lista2: Observable<ChatMessage[]>;
  constructor(navParams: NavParams,
    private chatService: ChatService,
    public db: AngularFirestore,
    private events: Events) {



    // Get the navParams toUserId parameter
    this.toUser = {
      id: navParams.get('uid'),
      name: navParams.get('nome'),
      roomId: navParams.get('id')
    };


      let id = this.toUser.id;
      this.lista = this.db.collection<ChatMessage>
      ('room-messages', ref => ref.where('room', '==', this.toUser.roomId).orderBy('time')).valueChanges();      
    


    // Get mock user information
    this.chatService.getUserInfo()
    .then((res) => {
      this.user = res
    });
  }

  ngOnInit() {
  }

  ionViewWillLeave() {
    // unsubscribe
    this.events.unsubscribe('chat:received');
  }

  ionViewDidEnter() {
    //get message list
    this.getMsg();

    // Subscribe to received  new message events
    this.events.subscribe('chat:received', msg => {
      this.pushNewMsg(msg);
    })
  }

  onFocus() {
    this.showEmojiPicker = false;
    this.content.resize();
    this.scrollToBottom();
  }

  switchEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    if (!this.showEmojiPicker) {
      this.focus();
    } else {
      this.setTextareaScroll();
    }
    this.content.resize();
    this.scrollToBottom();
    
  }

  /**
   * @name getMsg
   * @returns {Promise<ChatMessage[]>}
   */
  getMsg() {
    // Get mock message list
    

   this.lista
      .subscribe(res => {

        this.msgList = res;
        this.scrollToBottom();
       
      });
  }

  /**
   * @name sendMsg
   */
  sendMsg() {
    if (!this.editorMsg.trim()) return;

    // Mock message
    const id = Date.now().toString();
    let newMsg: ChatMessage = {
      messageId: Date.now().toString(),
      userId: this.user.id,
      userName: this.user.name,      
      toUserId: this.toUser.id,
      time: Date.now(),
      message: this.editorMsg,
      status: 'sucess',
      room: this.toUser.roomId
    };



    this.pushNewMsg(newMsg);
    this.editorMsg = '';

    if (!this.showEmojiPicker) {
      this.focus();
    }

    this.chatService.sendMsg(newMsg)
      .then(() => {
        let index = this.getMsgIndexById(id);
    let user: any = {};
    user.conversas = [];
    user.conversas.push({newMsg});
        if (index !== -1) {
          this.msgList[index].status = 'success';
        }
      })

      this.db.collection('room-messages').add(newMsg);


  }

  /**
   * @name pushNewMsg
   * @param msg
   */
  pushNewMsg(msg: ChatMessage) {
    const userId = this.user.id,
      toUserId = this.toUser.id;
    // Verify user relationships
    if (msg.userId === userId && msg.toUserId === toUserId) {
      this.msgList.push(msg);
    } else if (msg.toUserId === userId && msg.userId === toUserId) {
      this.msgList.push(msg);
    }
    this.scrollToBottom();
  }

  getMsgIndexById(id: string) {
    return this.msgList.findIndex(e => e.messageId === id)
  }

scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }

  private focus() {
    if (this.messageInput && this.messageInput.nativeElement) {
      this.messageInput.nativeElement.focus();
    }
  }

  private setTextareaScroll() {
    const textarea = this.messageInput.nativeElement;
    textarea.scrollTop = textarea.scrollHeight;
  }

}
