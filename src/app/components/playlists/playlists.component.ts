import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {PlaylistService} from "../../service/playlist.service";
import {Subscription} from "rxjs";
import {Playlist} from "../../models/playlist-types";

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {

  subscription: Subscription = new Subscription();
  playlistList: Playlist[] = [];

  constructor(
    private playlistService: PlaylistService,
    private changeDetector: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.subscription = this.playlistService.getPlaylists()
      .subscribe({
        next: (data: any) => {
          if (data) {
            this.playlistList = data.data.content;
          }
        }
      });
  }

}
