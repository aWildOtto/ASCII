import { AfterViewChecked, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../../Services/chat/chat.service';
import { ChatMessage } from '../../models/chat-message';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserService } from 'src/app/Services/user/user.service';
import { NotificationService } from 'src/app/Services/notification/notification.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input() opponent: User;
  public currentUser: User;
  public hasChat = true;

  public username: string = null;
  public messageSubscrible$: Subscription;
  public userInfoSubscrible$: Subscription;
  public historyMessages: ChatMessage[] = [];

  public opponentId: string;
  public chatterInfo = {};
  public Date = Date;
  public opponentInfo: User = null;
  public showChat = true;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  private userObservable$: Subscription;

  constructor(
    private cs: ChatService,
    private route: ActivatedRoute,
    private us: UserService,
    private ns: NotificationService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.userObservable$ = this.us.authState.subscribe((auth) => {
      if (auth) {
        this.chatterInfo[auth.uid] = {
          avatar: auth.photoURL,
          username: auth.displayName,
        };
        this.currentUser = {
          uid: auth.uid,
          avatarUrl: auth.photoURL,
          username: auth.displayName
        };
        this.loadingMessages(auth.uid, this.opponent.uid);
        this.cs.createChatRoom(this.currentUser, this.opponent);
      } else {
        this.messageSubscrible$?.unsubscribe();
        this.userInfoSubscrible$?.unsubscribe();
      }
    }, (error) => {
    });
  }

  ngAfterViewChecked(): void {
    if (this.myScrollContainer) {
      this.scrollToBottom();
    }
  }

  public loadingMessages(userId: string, opponentId: string): void {
    this.opponentId = opponentId;
    this.messageSubscrible$ = this.cs
      .loadingMessages(userId, opponentId)
      .subscribe((messages) => {
        console.log(messages);
        if (messages.length === 0) {
          this.hasChat = false;
        }

        this.historyMessages = messages;
      });
  }

  public sendMessage(event): void {
    if (event.message.length) {
      this.cs.sendMessage(event.message, this.opponent.uid);
    }
  }


  ngOnDestroy(): void {
    this.messageSubscrible$?.unsubscribe();
    this.userInfoSubscrible$?.unsubscribe();
    this.userObservable$?.unsubscribe();
  }

  private scrollToBottom(): void {
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  }
}
