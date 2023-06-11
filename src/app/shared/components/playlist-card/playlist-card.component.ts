import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'td-playlist-card',
  templateUrl: './playlist-card.component.html',
  styleUrls: ['./playlist-card.component.scss']
})
export class PlaylistCardComponent {

  @Input() data: any;
  @Input() apiType: any;

  constructor(private router: Router) {
  }

  navigateToPlaylist(id: any) {
    this.router.navigate([`/playlist/${id}`], { queryParams: { apiType: this.apiType } });
  }

  playPlaylist(id: any) {
    // TODO Need to pass playlist ID to the player
  }

}
