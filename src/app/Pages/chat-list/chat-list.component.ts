import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from 'src/app/Services/chat/chat.service';
import { UserService } from 'src/app/Services/user/user.service';
import { NotificationService } from 'src/app/Services/notification/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent implements OnInit, OnDestroy {
  public chatList = [];
  // private chatOpponentObservables$: Subscription[] = [];
  private notificationObservables$: Subscription;
  private chatListObservables$: Subscription;
  private userObservable$: Subscription;

  constructor(
    private cs: ChatService,
    private us: UserService,
    private ns: NotificationService,
  ) {
    this.userObservable$ = this.us.authState.subscribe(async (auth) => {
      if (!auth) {
        if (this.chatListObservables$) {
          this.chatListObservables$.unsubscribe();
        }
        return;
      }
      this.notificationObservables$ = this.ns.notifications.subscribe(
        (notifications) => {
          this.chatListObservables$ = this.cs
            .getChatList(auth.uid)
            .subscribe((chatsRef) => {
              const chats = [];
              chatsRef.forEach(async (chatRef) => {
                const chat = chatRef;
                let opponentId = chat.peers[0];
                let opponentIndex = 0;
                if (chat.peers[0] === auth.uid) {
                  opponentId = chat.peers[1];
                  opponentIndex = 1;
                }
                chat.opponentName = chat[opponentId];
                if (chat.avatarUrls) {
                  chat.showAvatar =
                    chat.avatarUrls[opponentIndex] ||
                    '../../../assets/default-avatar.png';
                } else {
                  chat.showAvatar = '../../../assets/default-avatar.png';
                }
                chat.opponentId = opponentId;
                if (notifications && notifications.chat && notifications.chat[opponentId]) {
                  chat.unread = true;
                }
                if (chat.mostRecent.senderName === chat[auth.uid]) {
                  chat.mostRecent.senderName = 'You';
                }
                chats.push(chat);
              });
              this.chatList = chats;
            });
        }
      );
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    // this.chatOpponentObservables$.forEach((obs) => {
    //   obs.unsubscribe();
    // });
    this.notificationObservables$?.unsubscribe();
    this.chatListObservables$?.unsubscribe();
    this.userObservable$?.unsubscribe();
  }
}