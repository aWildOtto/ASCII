import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chat-list-item',
  templateUrl: './chat-list-item.component.html',
  styleUrls: ['./chat-list-item.component.scss']
})
export class ChatListItemComponent implements OnInit {

  @Input() chat;
  @Input() divider = true;
  @Output() delete = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }
  deleteChat(): void {
    this.delete.emit(this.chat.opponentId);
  }
}
