import {Component, OnInit} from '@angular/core';
import {UserService} from '../../Services/user/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(public us: UserService) {
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.us.logout();
  }
}
