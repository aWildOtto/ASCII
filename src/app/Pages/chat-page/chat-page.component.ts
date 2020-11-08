import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {
  public chatChances = 0;

  opponent: User;
  constructor(
    private us: UserService,
    private route: ActivatedRoute,

  ) {
    console.log(this.chatChances);
    this.route.params.subscribe((params) => {
      this.us.getUser(params.uid, (ref) => {
        this.opponent = ref.val()[params.uid];
        console.log(this.opponent);
      });
    });

  }

  ngOnInit(): void {
  }

  public setChances(count: number): void {
    this.chatChances = count;
  }

  public consumeChances(count: number): void {
    this.chatChances --;
  }
}
