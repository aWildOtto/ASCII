import { Component, OnInit } from '@angular/core';
import {DicService} from '../../Services/dic/dic.service';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private ds: DicService,private us: UserService) { }


  ngOnInit(): void {
    console.log(this.ds.getPairs());
  }

  public googleLogIn(): void {
    this.us.thirdPartySigninDispatcher('google', 'home');
  }
}
