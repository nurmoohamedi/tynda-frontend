import { Component } from '@angular/core';

@Component({
  selector: 'td-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  public navList: any = [
    { id: 1, name: 'Basty bet', router: 'home', icon: 'nav_music.svg' },
    { id: 2, name: 'Izdeý', router: '', icon: 'nav_playlist.svg' },
    { id: 3, name: 'An jinaq', router: 'collection', icon: 'nav_liked.svg' }
  ]
}
