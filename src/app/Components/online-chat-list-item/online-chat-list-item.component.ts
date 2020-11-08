import {Component, OnInit, Input} from '@angular/core';

export class OnlineChatUser {
  since: Date;
  url: string;
  name: string;
  selfId: string;

  constructor(since: Date, url: string, name: string, uid: string) {
    this.since = since;
    this.url = url;
    this.name = name;
    this.selfId = uid;
  }

}

@Component({
  selector: 'app-online-chat-list-item',
  templateUrl: './online-chat-list-item.component.html',
  styleUrls: ['./online-chat-list-item.component.scss']
})


export class OnlineChatListItemComponent implements OnInit {

  @Input() onlineUser: OnlineChatUser;
  constructor() {
  }

  ngOnInit(): void {
  }

}
