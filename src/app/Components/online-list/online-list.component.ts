import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../Services/chat/chat.service';
import {OnlineChatUser} from '../online-chat-list-item/online-chat-list-item.component';

@Component({
  selector: 'app-online-list',
  templateUrl: './online-list.component.html',
  styleUrls: ['./online-list.component.scss']
})
export class OnlineListComponent implements OnInit {
  public onlineUsers: OnlineChatUser[] = [];

  constructor(private cs: ChatService) {
    this.cs.getAllOnlineUsers((res) => {
      this.onlineUsers = [];
      res.forEach((x) => {
        this.onlineUsers.push(new OnlineChatUser(x.val().last_changed, x.val().avatarUrl, x.val().username));
      });
    });
  }

  ngOnInit(): void {
  }

}
