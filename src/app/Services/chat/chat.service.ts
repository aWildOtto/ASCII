import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { ChatMessage } from 'src/app/Models/chat-message';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public historyMessages: AngularFirestoreCollection<ChatMessage>;
  private chatMessages: AngularFirestoreCollection<ChatMessage>;
  private userId: string;
  private conversationID: string;

  // public historyMessages$ = new BehaviorSubject<ChatMessage[]>([]);

  constructor(
    private db: AngularFirestore,
    private rdb: AngularFireDatabase,
    // private us: UserService,
  ) {
    this.chatMessages = this.db.collection('ChatMessages');
    // this.us.authState.subscribe((auth) => {
    //   if (auth) {
    //     this.userId = auth.uid;
    //   }
    // });
  }

  /**
   * createChatRoom
   */
  public createChatRoom(
    userId: string,
    opponentId: string,
    username: string,
    opponentName: string,
    userAvatar: string,
    opponentAvatar: string
  ) {
    this.db
      .doc(`ChatMessages/${this.getConversationID(userId, opponentId)}`)
      .set(
        {
          peers: [userId, opponentId],
          avatarUrls: [userAvatar, opponentAvatar],
          [userId]: username,
          [opponentId]: opponentName,
        },
        { merge: true }
      );
  }

  public sendMessage(msg: string, opponentId: string) {
    // const timestamp = this.getTimeStamp();
    // const sender = this.user.id;
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
        return ref.orderBy('timeSent');
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

  private getConversationID(userId: string, opponentId: string) {
    let p1 = opponentId;
    let p2 = userId;
    if (userId > opponentId) {
      p1 = userId;
      p2 = opponentId;
    }
    return p1 + '-' + p2;
  }
}
