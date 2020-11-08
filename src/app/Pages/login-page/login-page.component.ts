import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private us: UserService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.us.authState.subscribe(auth => {
      if (auth) {
        this.router.navigateByUrl('/');
      }
    });
  }

  public googleLogIn(): void {

    this.us.thirdPartySigninDispatcher('google', '/').catch((error => {
      console.log(error);
    }));
  }
}
