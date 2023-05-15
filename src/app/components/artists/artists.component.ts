import {Component, Input} from '@angular/core';
import {Route, Router} from "@angular/router";

@Component({
  selector: 'td-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent {

  @Input() type!: string;
  @Input() data!: any;

  constructor(private router: Router) {
  }

  navigateToArtist(id: any) {
    this.router.navigateByUrl('artist/' + id);
  }
  playArtistSongs(id: any) {}

}
