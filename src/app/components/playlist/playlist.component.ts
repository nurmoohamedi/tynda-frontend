import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PlaylistService} from "../../service/playlist.service";
import {NotificationService} from "../../service/notification.service";
import {SpotifyService} from "../../service/spotify.service";

@Component({
  selector: 'td-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  public playlistDetails: any;
  public isUserPlaylist: boolean = false;
  public playlistLoader: boolean = false;

  public id: any;
  public apiType: any;

  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistService,
    private apiService: SpotifyService,
    private notify: NotificationService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.route.queryParamMap.subscribe((params) => {
      this.apiType = params.get('apiType');
    });
  }

  ngOnInit() {
    if (this.id) {
      this.getPlaylistById(this.id, this.apiType);
      this.isExistUserPlaylist(this.id);
    }

    this.playlistService.isChangedPlaylist.subscribe({
      next: data => {
        this.getPlaylistById(this.id, this.apiType);
      }
    });
  }

  getPlaylistById(id: any, apiType: any) {
    this.playlistLoader = true;
    const errorCb = (err: any) => {
      if (err) {
        this.notify.showError(err);
      } else {
        this.notify.showError();
      }
      this.playlistLoader = false;
    }

    if (apiType == 'search') {
      this.apiService.getSpotifyPlaylistInfo(id).subscribe({
        next: (data: any) => {
          if (data) {
            const body = {
              id,
              name: data?.name,
              img_link: data?.images[0]?.url,
              followers: data?.followers?.total
            };
            this.playlistDetails = body;
            this.getPlaylistTracks(id, errorCb);
          }
        }, error: errorCb
      });
    } else {
      this.playlistService.getPlaylistById(id).subscribe({
        next: (data: any) => {
          if (data) {
            this.playlistDetails = data.data;
            this.playlistLoader = false;
          }
        }, error: errorCb
      });
    }
  }

  getPlaylistTracks(id: any, errorCb: any) {
    this.apiService.getSpotifyPlaylistTracks(id).subscribe({
      next: (data: any) => {
        if (data?.items) {
          const body = data.items.map((item: any) => {
            return {
              id: item?.track?.id,
              name: item?.track?.name,
              albumName: item?.track?.album?.name,
              img_link: item?.track?.album?.images[0]?.url,
              preview_link: item?.track?.preview_url,
              artists: item?.track?.artists?.map((artist: any) => ({
                id: artist?.id,
                name: artist?.name,
              })),
              explicit: item?.track?.explicit,
              duration: item?.track?.duration_ms,
              bgColor: item?.primary_color,
            };
          });
          this.playlistDetails.musics = body;
          this.playlistLoader = false;
        }
      }, error: errorCb
    });
  }

  isExistUserPlaylist(id: any) {
    this.playlistService.isExistUserPlaylist(id).subscribe({
      next: data => {
        if (data?.data) {
          this.isUserPlaylist = data?.data;
        }
      }, error: err => {
        this.isUserPlaylist = false;
      }
    })
  }
}
