import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {PlaylistService} from "../../service/playlist.service";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'td-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent  implements OnInit {

  tabList: any = [
    { code: 'playlists', name: 'Anjinaqtar' },
    { code: 'artists', name: 'Anshiler' },
    { code: 'audiobooks', name: 'Audiokitapar' },
  ];
  activeTab: any;

  subscription?: Subscription;
  myPlaylists: any;
  dataLoader: boolean = false;

  constructor(
    private playlistService: PlaylistService,
    private notifyService: NotificationService,
    private notify: NotificationService
  ) {}

  ngOnInit() {
    this.activeTab = this.tabList[0];
    this.getUserPlaylists();
  }

  onTabChange(tab: any) {
    this.activeTab = tab;
    if (tab.code === 'playlists') {
      this.getUserPlaylists();
    } else if (tab.code === 'audiobooks') {
      this.getAllBooks();
    } else {
      this.getUserArtists();
    }
  }

  getUserPlaylists() {
    this.subscription = this.playlistService.getUserPlaylists('id', 'desc')
      .subscribe({
        next: (data: any) => {
          if (data) {
            this.myPlaylists = data.data;
            this.playlistService.collectionData$.next({ playlists: this.myPlaylists.length });
          }
        }
      });
  }

  getUserArtists() {
    this.subscription = this.playlistService.getUserArtists()
      .subscribe({
        next: (data: any) => {
          if (data) {
            this.myPlaylists = data.data;
            this.playlistService.collectionData$.next({ artists: this.myPlaylists.length });
          }
        }
      });
  }

  getAllBooks() {
    this.dataLoader = true;
    this.playlistService.getUserAudiobooks().subscribe({
      next: (data: any) => {
        this.myPlaylists = data?.data;
        this.playlistService.collectionData$.next({ audiobooks: this.myPlaylists.length });
        this.dataLoader = false;
      }, error: err => {
        this.notify.showError();
        this.dataLoader = false;
      }
    });
  }

  addPlaylist = () => {
    this.playlistService.addNewPlaylistToUser().subscribe({
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
