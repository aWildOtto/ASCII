import { Component, OnInit } from '@angular/core';
import {DicService} from '../../services/dic/dic.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private ds: DicService) { }

  ngOnInit(): void {
    console.log(this.ds.getPairs());
  }
}
