import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../Services/chat/chat.service';
import {OnlineChatUser} from '../online-chat-list-item/online-chat-list-item.component';
import {UserService} from '../../Services/user/user.service';

@Component({
  selector: 'app-online-list',
  templateUrl: './online-list.component.html',
  styleUrls: ['./online-list.component.scss']
})
export class OnlineListComponent implements OnInit {
  public onlineUsers: OnlineChatUser[] = [];

  constructor(private cs: ChatService, private us: UserService) {
    this.cs.getAllOnlineUsers((res) => {
      this.onlineUsers = [];
      res.forEach((x) => {
        if (x.val().uid !== this.us.authMetaData.uid) {
          this.onlineUsers.push(new OnlineChatUser(x.val().last_changed, x.val().avatarUrl, x.val().username, x.val().uid));
        }
      });
    });
  }

  ngOnInit(): void {
  }

}
