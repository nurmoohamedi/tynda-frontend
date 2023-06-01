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
  topTracks: any;
  topPlaylists: any;

  constructor(
    private searchService: SpotifyService
  ) {
  }

  ngOnInit() {
    this.activeTab = this.searchTabs[0].code;

    let data: any = localStorage.getItem('searchData');
    if (data) {
      // @ts-ignore
      data = JSON.parse(localStorage.getItem('searchData'));
      this.allSearchData = data;

      if (data?.topResults) {
        this.topResults = data?.topResults?.items;
      }
      if (data?.tracks) {
        this.topTracks = data?.tracks?.items;
      }
      if (data?.artists) {
        this.topArtists = data?.artists?.items.map((item: any) => {
          return {
            id: item?.data.uri.split(':')[2],
            name: item?.data.profile.name,
            img_link: item.data.visuals.avatarImage.sources[2].url
          }
        });
      }
      if (data?.playlists) {
        this.topPlaylists = data?.playlists?.items;
      }
    }


    this.searchService.searchData.subscribe({
      next: (data: any) => {
        this.allSearchData = data;
        if (data?.topResults) {
          this.topResults = data?.topResults?.items;
        }
        if (data?.tracks) {
          this.topTracks = data?.tracks?.items;
        }
        if (data?.artists) {
          this.topArtists = data?.artists?.items;
        }
        if (data?.playlists) {
          this.topPlaylists = data?.playlists?.items;
        }
      }
    });
  }

  onTabChange(tab: any) {
    this.activeTab = tab.code;
  }

}
