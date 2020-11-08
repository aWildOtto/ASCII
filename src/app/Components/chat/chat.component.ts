import {
  AfterViewChecked,
  Component,
  ElementRef, EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
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
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked, OnChanges {
  @Input() chatChances: number;
  @Input() opponent: User;
  @Output() countConsumed: EventEmitter<number> = new EventEmitter();
  public currentUser: User;

  public username: string = null;
  public messageSubscrible$: Subscription;
  public userInfoSubscrible$: Subscription;
  public historyMessages: ChatMessage[] = [];

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
    console.log(this.chatChances);
    this.userObservable$ = this.us.authState.subscribe((auth) => {
      if (auth) {
        this.chatterInfo[auth.uid] = {
          avatar: auth.photoURL,
          username: auth.displayName,
        };
        this.chatterInfo[this.opponent.uid] = {
          avatar: this.opponent.avatarUrl,
          username: this.opponent.username,
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

  ngOnChanges(): void{
    console.log(this.chatChances);
}

  ngAfterViewChecked(): void {
    if (this.myScrollContainer) {
      this.scrollToBottom();
    }
  }

  public loadingMessages(userId: string, opponentId: string): void {
    this.messageSubscrible$ = this.cs
      .loadingMessages(userId, opponentId)
      .subscribe((messages) => {
        console.log(messages);
        this.ns.clearNotifications(userId, 'chat', opponentId);
        this.historyMessages = messages;
      });
  }

  public sendMessage(event): void {
    if (event.message.length) {
      this.cs.sendMessage(event.message, this.opponent.uid);
      this.chatChances --;
      this.countConsumed.emit(this.chatChances);
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
