import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {PlaylistService} from "../../service/playlist.service";

@Component({
  selector: 'td-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent  implements OnInit {

  tabList: any = [
    { code: 'playlists', name: 'Playlists' },
    { code: 'artists', name: 'Artists' },
    { code: 'albums', name: 'Albums' },
  ];
  activeTab: any;

  subscription?: Subscription;
  myPlaylists: any;

  constructor(
    private playlistService: PlaylistService
  ) {}

  ngOnInit() {
    this.activeTab = this.tabList[0];
    this.getUserPlaylists();
  }

  getUserPlaylists() {
    this.subscription = this.playlistService.getPlaylists('id', 'desc')
      .subscribe({
        next: (data: any) => {
          if (data) {
            this.myPlaylists = data.data.content;
          }
        }
      });
  }

  onTabChange(tab: any) {
    this.activeTab = tab;
  }

  addPlaylist = () => {
    this.playlistService.add().subscribe({
      next: value => {
        if (value) {
          this.getUserPlaylists();
        }
      }, error: err => {
        alert(err?.message);
      }
    });
  }

}
