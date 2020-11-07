import {Component, OnInit} from '@angular/core';
import {UserService} from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private us: UserService) {
  }

  ngOnInit(): void {
  }

  public googleLogIn(): void {
    this.us.thirdPartySigninDispatcher('google', 'chat-list').catch((error => {
      console.log(error);
    }));
  }
}
