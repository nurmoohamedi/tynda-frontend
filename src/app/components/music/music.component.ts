import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PlaylistService} from "../../service/playlist.service";
import {SpotifyService} from "../../service/spotify.service";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'td-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent {

  public musicDetails: any;
  public musicLoader: boolean = false;

  public id: string | null;
  public apiType: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private playlistService: PlaylistService,
    private apiService: SpotifyService,
    private notify: NotificationService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');

    // const extras = this.router.getCurrentNavigation()?.extras?.state;
    this.route.queryParamMap.subscribe((params) => {
      this.apiType = params.get('apiType');
    });
  }

  ngOnInit() {
    if (this.id) {
      this.getTrackById(this.id);
    }

    // TODO
    // this.playlistService.isChangedPlaylist.subscribe({
    //   next: data => {
    //     this.getArtistById(this.id);
    //   }
    // });
  }

  getTrackById(id: string) {
    this.musicLoader = true;
    const errorCb = (err: any) => {
      if (err) {
        this.notify.showError(err);
      } else {
        this.notify.showError();
      }
      this.musicLoader = false;
    }

    if (this.apiType) {
      if (this.apiType === 'chart') {
        this.apiService.getTrackFromShazam(id).subscribe({
          next: (data: any) => {
            if (data) {
              const body = {
                id: data?.key,
                img_link: data?.images.coverarthq ,
                preview_link: data?.hub?.actions[1]?.uri,
                name: data?.title,
                artists: data?.artists?.map((artist: any) => ({
                  id: artist.adamid,
                  name: artist?.alias.split('-').join(' '),
                })),
                genres: data?.genres?.primary,
                date: data?.releasedate,
                lyrics: data?.sections[1],
              };
              this.musicDetails = body;
              this.getArtist(id, this.apiType);
            }
          }, error: errorCb
        });
      } else if (
        this.apiType === 'search' ||
        this.apiType === 'collection'
      ) {
        this.apiService.getTrackFromSpotify(id).subscribe({
          next: (data: any) => {
            if (data) {
              data = data?.tracks[0];
              const body = {
                id: data?.id,
                img_link: data?.album?.images[0].url,
                preview_link: data?.preview_url,
                name: data?.name,
                artists: data?.artists?.map((artist: any) => ({
                  id: artist.id,
                  name: artist?.name,
                })),
                date: data?.album?.release_date,
                duration: data?.duration_ms,
                explicit: data?.explicit,
              };
              this.musicDetails = body;
              this.getSpotifyLyrics(id);
              this.getArtist(id, this.apiType);
            }
          }, error: errorCb
        });
      } else {
        this.playlistService.getTrackById(id).subscribe({
          next: (data: any) => {
            if (data) {
              this.musicDetails = data.data;
            }
          }, error: errorCb
        });
      }
    } else {
      this.playlistService.getTrackById(id).subscribe({
        next: (data: any) => {
          if (data) {
            this.musicDetails = data.data;
          }
        }, error: errorCb
      });
    }
  }

  getSpotifyLyrics(id: any) {
    this.apiService.getTrackLyrics(id).subscribe({
      next: (data: any) => {
        if (data) {
          const lyrics = {
            text: data?.lyrics?.lines.map((item: any) => {
              return item.words;
            })
          };
          this.musicDetails.lyrics = lyrics;
        }
      }, error: err => {
        this.notify.showError();
      }
    })
  }

  getArtist(id: any, apiType: string) {
    const errorCb = (err: any) => {
      if (err) {
        this.notify.showError(err);
      } else {
        this.notify.showError();
      }
    }
    const result: any = [];
    if (apiType) {
      if (apiType === 'chart') {
        for (let artist in this.musicDetails.artists) {
          this.apiService.getShazamArtist(this.musicDetails.artists[artist].id).subscribe({
            next: (data: any) => {
              if (data) {
                data = data?.data[0];
                const body = {
                  id: data?.id,
                  name: data?.attributes?.name,
                  img_link: data?.attributes?.artwork?.url || data?.avatar,
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
                result.push(body);
                this.musicDetails.artists = result;
              }
            }, error: errorCb
          });
        }
        this.musicLoader = false;
      } else if (
        apiType === 'search' ||
        apiType === 'collection'
      ) {
        for (let artist in this.musicDetails.artists) {
          this.apiService.getSpotifyArtist(this.musicDetails.artists[artist].id).subscribe({
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
                result.push(body);
                this.musicDetails.artists = result;
              }
            }, error: errorCb
          });
        }
        this.musicLoader = false;
      } else {
        this.playlistService.getTrackById(id).subscribe({
          next: (data: any) => {
            if (data) {
              this.musicDetails = data.data;
              this.musicLoader = false;
            }
          }, error: errorCb
        });
      }
    } else {
      this.playlistService.getTrackById(id).subscribe({
        next: (data: any) => {
          if (data) {
            this.musicDetails = data.data;
            this.musicLoader = false;
          }
        }, error: errorCb
      });
    }
  }
}
