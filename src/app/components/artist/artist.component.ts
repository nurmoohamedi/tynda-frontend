import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PlaylistService} from "../../service/playlist.service";
import {NotificationService} from "../../service/notification.service";
import {SpotifyService} from "../../service/spotify.service";

@Component({
  selector: 'td-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent {

  public artistDetails: any;

  public id: string | null;
  public apiType: any;

  public artistLoader: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistService,
    private apiService: SpotifyService,
    private notify: NotificationService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');

    // const extras = this.router.getCurrentNavigation()?.extras?.state;
    this.route.queryParamMap.subscribe((params) => {
      this.apiType = params.get('apiType');
      debugger;
    });
  }

  ngOnInit() {
    if (this.id) {
      this.getArtist(this.id, this.apiType);
    }

    // TODO
    // this.playlistService.isChangedPlaylist.subscribe({
    //   next: data => {
    //     this.getArtistById(this.id);
    //   }
    // });
  }

  getArtist(id: any, apiType: string) {
    this.artistLoader = true;
    const errorCb = (err: any) => {
      if (err) {
        this.notify.showError(err);
      } else {
        this.notify.showError();
      }
      this.artistLoader = false;
    }

    // console.log(apiType);
    // debugger;

    if (apiType) {
      if (apiType === 'chart') {
        this.apiService.getShazamArtist(id).subscribe({
          next: (data: any) => {
            if (data) {
              data = data?.data[0];
              const body = {
                id: data?.id,
                name: data?.attributes?.name,
                img_link: data?.avatar,
                bgColor: data?.attributes?.artwork?.bgColor,
                top_tracks: data?.views['top-songs'].data.map((item: any) => {
                  return {
                    id: item?.id,
                    name: item?.attributes?.name,
                    albumName: item?.attributes?.albumName,
                    duration: item?.attributes?.durationInMillis,
                    img_link: item?.attributes?.artwork?.url,
                    preview_link: item?.attributes?.previews[0]?.url,
                    explicit: item?.attributes?.contentRating == 'explicit',
                    artistName: item?.attributes?.artistName,
                  }
                }),
                related_artists: data?.views['similar-artists']?.data.map((item: any) => {
                  return {
                    id: item?.id,
                    name: item?.attributes?.name,
                    img_link: item?.attributes?.artwork?.url,
                  }
                }),
              };
              this.artistDetails = body;
              this.artistLoader = false;
            }
          }, error: errorCb
        });
      } else if (
        apiType === 'search'
      ) {
        this.apiService.getSpotifyArtist(id).subscribe({
          next: (data: any) => {
            if (data?.data?.artist) {
              data = data.data.artist;
              const body = {
                id: data?.id,
                name: data?.profile?.name,
                verified: data?.profile?.verified,
                img_link: data?.visuals?.avatarImage?.sources[0]?.url,
                bgColor: data?.visuals?.avatarImage?.extractedColors?.colorRaw?.hex,
                headerImage: data?.visuals?.headerImage?.sources[0]?.url,
                headerImageBgColor: data?.visuals?.headerImage?.extractedColors?.colorRaw?.hex,
                playlists: data?.profile?.playlists?.items.map((item: any) => {
                  return {
                    id: item?.uri.split(':')[2],
                    name: item?.name,
                    description: item?.description,
                    img_link: item?.images?.items[0]?.sources[0]?.url,
                  };
                }),
                top_tracks: data?.discography?.topTracks?.items.map((item: any) => {
                  return {
                    id: item?.track?.id,
                    name: item?.track?.name,
                    duration: item?.track?.duration?.totalMilliseconds,
                    img_link: item?.track?.album?.coverArt?.sources[0].url,
                    artists: item?.track?.artists?.items.map((item: any) => {
                      return {
                        id: item?.uri.split(':')[2],
                        name: item?.profile?.name,
                      };
                    }),
                  };
                }),
                related_artists: data?.relatedContent?.relatedArtists?.items?.slice(0,6)?.map((item: any) => {
                  return {
                    id: item?.id,
                    name: item?.profile?.name,
                    img_link: item?.visuals?.avatarImage?.sources[0].url,
                  }
                }),
                stats: {
                  followers: data?.stats?.followers,
                  monthlyListeners: data?.stats?.monthlyListeners
                }
              };
              this.artistDetails = body;
              this.artistLoader = false;
            }
          }, error: errorCb
        });
      } else {
        this.getArtistById(id);
      }
    } else {
      this.getArtistById(id);
    }
  }

  getArtistById(id: any) {
    this.playlistService.getArtistById(id).subscribe({
      next: (data: any) => {
        if (data) {
          this.artistDetails = data.data;
          this.artistLoader = false;
        }
      }, error: err => {
        if (err) {
          this.notify.showError(err);
        } else {
          this.notify.showError();
        }
        this.artistLoader = false;
      }
    });
  }
}
