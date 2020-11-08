import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { ChatMessage } from '../../models/chat-message';
import { Observable } from 'rxjs';
import { User, UserService } from '../user/user.service';
import { NotificationService } from '../notification/notification.service';
import firebase from 'firebase';
import { OnlineChatUser } from '../../Components/online-chat-list-item/online-chat-list-item.component';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public historyMessages: AngularFirestoreCollection<ChatMessage>;
  private chatMessages: AngularFirestoreCollection<ChatMessage>;
  private rdbRef: firebase.database.Reference;
  private userId: string;
  private conversationID: string;

  // public historyMessages$ = new BehaviorSubject<ChatMessage[]>([]);

  constructor(
    private db: AngularFirestore,
    private rdb: AngularFireDatabase,
    private us: UserService,
    private ns: NotificationService
  ) {
    this.rdbRef = this.rdb.database.ref('status');
    this.chatMessages = this.db.collection('ChatMessages');
    this.us.authState.subscribe((auth) => {
      if (auth) {
        this.userId = auth.uid;
      }
    });
  }

  /**
   * createChatRoom
   */
  public createChatRoom(
    user: User,
    opponent: User
  ): void {
    this.db
      .doc(`ChatMessages/${this.getConversationID(user.uid, opponent.uid)}`)
      .set(
        {
          peers: [user.uid, opponent.uid],
          avatarUrls: [user.avatarUrl, opponent.avatarUrl],
          [user.uid]: user.username,
          [opponent.uid]: opponent.username,
        },
        { merge: true }
      );
  }

  public sendMessage(msg: string, opponentId: string): void {
    // const timestamp = this.getTimeStamp();
    // const sender = this.user.id;
    console.log(msg);
    console.log(opponentId);
    const msgDoc: ChatMessage = {
      timeSent: new Date(),
      sender: this.userId,
      receiver: opponentId,
      message: msg,
      status: 'unread',
      type: 'text',
    };
    this.db
      .collection('ChatMessages')
      .doc(this.getConversationID(this.userId, opponentId))
      .collection('history')
      .add(msgDoc);
  }

  public loadingMessages(
    userId: string,
    opponentId: string
  ): Observable<ChatMessage[]> {
    this.historyMessages = this.chatMessages
      .doc(this.getConversationID(userId, opponentId))
      .collection('history', (ref) => {
        return ref.orderBy('timeSent').limitToLast(20);
      });
    return this.historyMessages.valueChanges();
  }

  public getChatList(userId: string): Observable<any[]> {
    return this.db
      .collection('ChatMessages', (ref) => {
        return ref
          .where('peers', 'array-contains', userId)
          .orderBy('mostRecent.timeSent', 'desc')
          .limitToLast(20);
      })
      .valueChanges();
  }

  private getConversationID(userId: string, opponentId: string): string {
    let p1 = opponentId;
    let p2 = userId;
    if (userId > opponentId) {
      p1 = userId;
      p2 = opponentId;
    }
    return p1 + '-' + p2;
  }

  getAllOnlineUsers(cb): void {

    this.rdbRef.orderByChild('state').equalTo('online').on('value', cb);
  }

  deleteChatRoom(user, opponent): void {
    this.db.doc('ChatMessages/' + this.getConversationID(user, opponent)).delete();
  }
}

