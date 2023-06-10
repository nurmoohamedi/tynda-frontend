import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../../service/spotify.service";
import {debounceTime} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'td-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchTabs: any = [
    { name: 'Bari', code: 'all' },
    { name: 'An', code: 'track' },
    { name: 'Anshi', code: 'artist' },
    { name: 'Anjinaq', code: 'playlist' },
  ];
  activeTabs: string[] = ['all'];
  activeTab: any;

  allSearchData: any;
  topResults: any;
  topArtists: any;
  topTracks: any;
  topPlaylists: any;

  constructor(
    private searchService: SpotifyService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.activeTab = this.searchTabs[0].code;
    this.searchService.searchData.pipe(debounceTime(1000)).subscribe((data: any) => {
      if (data) {
        this.getDataFromSearch(data);
      }
    });

    let data: any = localStorage.getItem('searchData');
    if (data) {
      // @ts-ignore
      data = JSON.parse(localStorage.getItem('searchData'));
      this.allSearchData = data;
      this.getDataFromSearch(data);
    }
  }

  getDataFromSearch(data: any) {
    this.allSearchData = data;
    if (data?.topResults) {
      this.topResults = {
        type: data?.topResults?.items[0].data.uri.split(':')[1],
        id: data?.topResults?.items[0].data.uri.split(':')[2],
        name: data?.topResults?.items[0]?.data.profile.name,
        img_link: data?.topResults?.items[0]?.data.visuals.avatarImage.sources[2].url,
      };
    }
    if (data?.tracks) {
      this.topTracks = data?.tracks?.items.map((item: any) => {
        return {
          id: item?.data.id,
          name: item?.data.name,
          duration: item?.data.duration.totalMilliseconds,
          img_link: item?.data.albumOfTrack.coverArt.sources[0].url,
          playability: item?.data.playability.playable,
          artists: item?.data.artists.items?.map((artist: any) => ({
            id: artist?.uri.split(':')[2],
            name: artist?.profile.name,
          })),
        }
      });
      this.activeTabs.push('track');
    }
    if (data?.artists) {
      this.topArtists = data?.artists?.items.map((item: any) => {
        return {
          id: item?.data.uri.split(':')[2],
          name: item?.data.profile.name,
          img_link: item.data.visuals.avatarImage.sources[2].url
        }
      });
      this.activeTabs.push('artist');
    }
    if (data?.playlists) {
      this.topPlaylists = data?.playlists?.items.map((item: any) => {
        return {
          id: item?.data.uri.split(':')[2],
          name: item?.data?.name,
          desc: item?.data?.description,
          owner: item?.data?.owner.name,
          img_link: item?.data?.images?.items[0]?.sources[1]?.url
        }
      });
      this.activeTabs.push('playlist');
    }
  }

  onTabChange(tab: any) {
    this.activeTab = tab;
  }

  getTabName(tab: string) {
    const tabIndex = this.searchTabs.find((item: any) => item.code === tab);
    return tabIndex?.name;
  }

  goToTopResult(top: any) {
    if (top?.type === 'artist') {
      this.router.navigate([`${top.type}/${top.id}`], { queryParams: { apiType: 'search'} });
    }
  }
}
