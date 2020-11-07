import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
    private chat: ChatService,
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
        this.route.params.subscribe((params) => {
          const opponentId = params.userId;
          this.opponentId = opponentId;

          this.loadingMessages(auth.uid, opponentId);

        });
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
    this.messageSubscrible$ = this.chat
      .loadingMessages(userId, opponentId)
      .subscribe((messages) => {
        this.historyMessages = messages;
      });
  }

  public sendMessage(event): void {
    if (event.message.length) {
      this.chat.sendMessage(event.message, this.opponentId);
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
