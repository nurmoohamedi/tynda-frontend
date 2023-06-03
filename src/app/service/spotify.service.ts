import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {
  ADD_PLAYLIST,
  DELETE_PLAYLIST, GET_ALL_ARTISTS,
  GET_ALL_PLAYLISTS, GET_ALL_TRACKS, GET_ARTIST_BY_ID,
  GET_PLAYLIST_BY_ID, GET_TRACK_BY_ID, GET_USER_ARTISTS, GET_USER_PLAYLISTS, SEARCH_ALL,
  UPDATE_PLAYLIST
} from "../core/constants/apiUrls";
import {BehaviorSubject, Observable} from "rxjs";
import {LoginService} from "./login.service";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  rapidApiKeyHeader: string = environment.rapidApiKeyHeader;
  rapidApiKey: string = environment.rapidApiKey;
  rapidApiHostHeader: string = environment.rapidApiHostHeader;
  rapidApiHost: string = environment.rapidApiHost;
  baseUrl: string = environment.rapidApiURL;

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
      worldChart: 'https://shazam-core.p.rapidapi.com/v1/charts/world?offset=' + offset,
      qazChart: 'https://shazam-core.p.rapidapi.com/v1/charts/country?country_code=KZ&offset=' + offset,
    }
    return this.http.get(urls[type],
      { 'headers': this.headers }
    );
  }
}
