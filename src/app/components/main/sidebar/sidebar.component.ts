import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'td-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  public navList: any = [
    { id: 1, name: 'Basty bet', router: 'home', icon: 'nav_home' },
    // { id: 2, name: 'Izdeý', router: 'search', icon: 'nav_playlist.svg' },
    { id: 2, name: 'Án jinaq', router: 'collection', icon: 'nav_col' },
    { id: 3, name: 'Uzdik ánder', router: 'top-qaz', icon: 'nav_top' },
    { id: 4, name: 'Úzdik sheteldik ánder', router: 'top', icon: 'nav_top_kaz' },
    { id: 5, name: 'Audiokitaptar', router: 'audiobooks', icon: 'nav_books' },
  ];

  activeNav: any = this.navList[0].router;

  constructor(private router: ActivatedRoute) {
  }

  onNavChange(activeNav: any) {
    this.activeNav = activeNav.router;
  }
}
