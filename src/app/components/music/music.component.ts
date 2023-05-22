import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PlaylistService} from "../../service/playlist.service";

@Component({
  selector: 'td-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent {

  public musicDetails: any;

  public id: number;

  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistService
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
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

  getTrackById(id: number) {
    this.playlistService.getTrackById(id).subscribe({
      next: (data: any) => {
        if (data) {
          this.musicDetails = data.data;
        }
      }, error: err => {
        alert(err?.error);
      }
    });
  }
}
