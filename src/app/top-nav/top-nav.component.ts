import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
  @Input() title = '';
  @Input() back = null;

  constructor(private location: Location, private router: Router) {
  }

  ngOnInit(): void {
  }

  backToPrev(): void {
    if (this.back) {
      this.router.navigateByUrl(this.back);
    }
  }
}
