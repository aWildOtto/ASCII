import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatService } from 'src/app/Services/chat/chat.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent implements OnInit {
  public message: string;
  @Input() opponentId: string;
  @Output() send = new EventEmitter<object>();

  public chatForm: FormGroup;

  constructor(
    private chat: ChatService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.chatForm = this.formBuilder.group({
      message: ['', [Validators.maxLength(999), Validators.required]]
    });
  }

  public sendMessage() {
    // this.chat.sendMessage(this.message, this.opponentId);
    this.send.emit({
      message: this.chatForm.value.message,
      files: []
    });
    this.chatForm.reset();
    console.log(this.chatForm.value);
  }
}
