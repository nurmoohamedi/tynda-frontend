import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {SEARCH_ALL} from "../core/constants/apiUrls";
import {BehaviorSubject} from "rxjs";
import {LoginService} from "./login.service";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  rapidApiKeyHeader: string = environment.rapidApiKeyHeader;
  rapidApiKey: string = environment.rapidApiKey;
  rapidApiHostHeader: string = environment.rapidApiHostHeader;
  rapidApiHost: string = environment.rapidApiHost;
  baseUrl: string = environment.spotifyURL;
  baseShazamUrl: string = environment.shazamURL;

  headers: any = {
      'X-RapidAPI-Key': this.rapidApiKey,
      // 'X-RapidAPI-Host': this.rapidApiHost,
  };

  searchState$ = new BehaviorSubject({});
  searchData = this.searchState$.asObservable();

  constructor(private http: HttpClient, private loginService: LoginService) { }

  searchEverything(
    searchText: string,
    type: string = 'multi',
    limit: number = 5,
    numberOfTopResults: number = 5,
  ) {
    return this.http.get(this.baseUrl + SEARCH_ALL +
      `?q=${searchText}&type=${type}&limit=${limit}&numberOfTopResults=${numberOfTopResults}`,
      { 'headers': this.headers }
      );
  }

  getCharts(type: 'qazChart' | 'worldChart', offset = 20) {
    const urls = {
      worldChart: this.baseShazamUrl + '/charts/world?offset=' + offset,
      qazChart: this.baseShazamUrl + '/charts/country?country_code=KZ&offset=' + offset,
    }
    return this.http.get(urls[type],
      { 'headers': this.headers }
    );
  }

  getTrackFromShazam(id: string) {
    return this.http.get(this.baseShazamUrl + '/tracks/details?track_id=' + id, { 'headers': this.headers });
  }

  getTrackFromSpotify(id: string) {
    return this.http.get(this.baseUrl + '/tracks/?ids=' + id, { 'headers': this.headers });
  }

  getTrackLyrics(id: string) {
    return this.http.get(this.baseUrl + '/track_lyrics/?id=' + id, { 'headers': this.headers });
  }

  getShazamArtist(id: string) {
    return this.http.get('https://shazam-core.p.rapidapi.com/v2/artists/details?artist_id=' + id, { 'headers': this.headers });
  }

  getSpotifyArtist(id: string) {
    return this.http.get(this.baseUrl + '/artist_overview/?id=' + id, { 'headers': this.headers });
  }

  getSpotifyPlaylistInfo(id: string) {
    return this.http.get(this.baseUrl + '/playlist/?id=' + id, { 'headers': this.headers });
  }

  getSpotifyPlaylistTracks(id: string) {
    return this.http.get(this.baseUrl + '/playlist_tracks/?limit=10&id=' + id, { 'headers': this.headers });
  }
}
