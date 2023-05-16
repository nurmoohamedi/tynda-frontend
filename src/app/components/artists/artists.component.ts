import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'td-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent {

  @Input() type!: string;
  @Input() data!: any;

  baseUrl: string = environment.baseUrl;

  constructor(private router: Router) {
  }

  navigateToArtist(id: any) {
    this.router.navigateByUrl('artist/' + id);
  }
  playArtistSongs(id: any) {}

}
