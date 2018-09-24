import { Component, OnInit, Renderer } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private menuUser: boolean;
  private sideBarIsOpened: boolean;

  constructor() {

  }

  ngOnInit() {
    this.menuUser = false;
    this.sideBarIsOpened = false;
  }

  menuToggleUser() {
    this.menuUser = !this.menuUser;
  }

  menuToggle() {
    this.sideBarIsOpened  = !this.sideBarIsOpened;
  }

  logout(e: Event) {
    e.preventDefault();
  }

}
