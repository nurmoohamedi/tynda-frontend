import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Playlist} from "../../models/playlist-types";
import {PlaylistService} from "../../service/playlist.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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
