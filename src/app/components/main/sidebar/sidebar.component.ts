import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'td-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  public navList: any = [
    { id: 1, name: 'Basty bet', router: 'home', icon: 'nav_music.svg' },
    { id: 2, name: 'Izdeý', router: 'search', icon: 'nav_playlist.svg' },
    { id: 2, name: 'Uzdik ánder', router: 'top-qaz', icon: 'nav_playlist.svg' },
    { id: 2, name: 'Úzdik sheteldik ánder', router: 'top', icon: 'nav_playlist.svg' },
    { id: 3, name: 'Án jinaq', router: 'collection', icon: 'nav_liked.svg' }
  ];

  activeNav: any = this.navList[0].router;

  constructor(private router: ActivatedRoute) {
  }

  onNavChange(activeNav: any) {
    this.activeNav = activeNav.router;
  }
}
