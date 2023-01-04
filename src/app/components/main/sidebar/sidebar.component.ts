import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  public navList: any = [
    { id: 1, name: 'Home', router: '', icon: 'home-icon' },
    { id: 2, name: 'Playlist', router: 'playlists', icon: 'playlists' },
    { id: 3, name: 'Musics', router: 'musics', icon: 'musics' }
  ]
}
