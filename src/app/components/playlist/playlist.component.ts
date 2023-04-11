import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PlaylistService} from "../../service/playlist.service";

@Component({
  selector: 'td-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  public playlistDetails: any;

  public id: number;

  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistService
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    if (this.id) {
      this.getPlaylistById(this.id);
    }
  }

  getPlaylistById(id: number) {
    this.playlistService.getPlaylistById(id).subscribe({
      next: (data: any) => {
        if (data) {
          this.playlistDetails = data.data;
        }
      }, error: err => {
        alert(err?.error);
      }
    });
  }
}
