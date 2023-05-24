import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../../service/spotify.service";

@Component({
  selector: 'td-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchTabs = [
    { name: 'Bari', code: 'all' },
    { name: 'An', code: 'track' },
    { name: 'Anshi', code: 'artist' },
    { name: 'Anjinaq', code: 'playlist' },
  ];

  activeTab: any;

  allSearchData: any;
  topResults: any;
  topArtists: any;
  topMusics: any;
  topPlaylists: any;

  constructor(
    private searchService: SpotifyService
  ) {
  }

  ngOnInit() {
    this.activeTab = this.searchTabs[0].code;

    this.searchService.searchData.subscribe({
      next: (data: any) => {
        this.allSearchData = data;

        if (data?.topResults) {
          this.topResults = data?.topResults;
        }
      }
    });
  }

  onTabChange(tab: any) {
    this.activeTab = tab.code;
  }

}
