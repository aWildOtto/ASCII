import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {

  constructor(
    private us: UserService,
    private route: ActivatedRoute,

  ) {

    this.route.params.subscribe((params) => {
      this.us.getUser(params.uid, (ref) => {
        const userData = ref[0];
        console.log(userData);
      });
    });

  }

  ngOnInit(): void {
  }

}
