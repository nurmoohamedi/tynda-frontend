import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  public navList: any = [
    { id: 1, name: 'Home', router: '', icon: 'nav_music.svg' },
    { id: 2, name: 'Explore', router: '', icon: 'nav_playlist.svg' },
    { id: 3, name: 'An jinaq', router: 'musics', icon: 'nav_liked.svg' }
  ]
}
