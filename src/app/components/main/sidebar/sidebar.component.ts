import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  public navList: any = [
    { id: 1, name: 'Home', router: '', icon: 'nav_music.svg' },
    { id: 2, name: 'Playlist', router: 'playlists', icon: 'nav_playlist.svg' },
    { id: 3, name: 'Musics', router: 'musics', icon: 'nav_liked.svg' }
  ]
}
