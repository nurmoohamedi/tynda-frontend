import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PlaylistService} from "../../service/playlist.service";

@Component({
  selector: 'td-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent {

  public artistDetails: any;

  public id: number;

  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistService
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    if (this.id) {
      this.getArtistById(this.id);
    }

    // TODO
    // this.playlistService.isChangedPlaylist.subscribe({
    //   next: data => {
    //     this.getArtistById(this.id);
    //   }
    // });
  }

  getArtistById(id: number) {
    this.playlistService.getArtistById(id).subscribe({
      next: (data: any) => {
        if (data) {
          this.artistDetails = data.data;
        }
      }, error: err => {
        alert(err?.error);
      }
    });
  }
}
