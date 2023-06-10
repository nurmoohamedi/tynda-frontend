import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'td-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {
  ngOnInit(): void {
  }

  @Input() type!: string;
  @Input() apiType!: string;
  @Input() data!: any;

  baseUrl: string = environment.baseUrl;

  constructor(private router: Router) {
  }

  navigateToArtist(artistId: any) {
    const params = this.apiType ? this.apiType : this.type;
    debugger;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`artist/${artistId}`], { queryParams: { apiType: params } });
    });
  }

  playArtistSongs(id: any) {}
}
