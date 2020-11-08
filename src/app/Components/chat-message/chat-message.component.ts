import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {

  @Input() type: string;
  @Input() message: string;
  @Input() reply: boolean;
  @Input() sender: string;
  @Input() date: Date;
  @Input() avatar: string;
  @Input() files: string[];
  @Input() updateType: string;
  @Input() link: string;
  @Input() userId = '';

  constructor() {
  }

  ngOnInit(): void {
  }

}
