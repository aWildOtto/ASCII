import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/Services/chat.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent implements OnInit, OnDestroy {
  public chatList = [];
  // private chatOpponentObservables$: Subscription[] = [];
  private chatListObservables$: Subscription;

  constructor(
    private cs: ChatService
  ) {

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }
}
