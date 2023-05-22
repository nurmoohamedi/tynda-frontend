import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {
  ADD_PLAYLIST,
  DELETE_PLAYLIST, GET_ALL_ARTISTS,
  GET_ALL_PLAYLISTS, GET_ALL_TRACKS, GET_ARTIST_BY_ID,
  GET_PLAYLIST_BY_ID, GET_TRACK_BY_ID, GET_USER_ARTISTS, GET_USER_PLAYLISTS,
  UPDATE_PLAYLIST
} from "../core/constants/apiUrls";
import {BehaviorSubject, Observable} from "rxjs";
import {LoginService} from "./login.service";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  baseUrl: string = environment.baseUrl;

  playlistState$ = new BehaviorSubject(false);
  isChangedPlaylist = this.playlistState$.asObservable();

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getPlaylists(sortBy: string = 'id', sortDir: string = 'asc') {
    return this.http.get(this.baseUrl + GET_ALL_PLAYLISTS + `?pageSize=10&sortBy=${sortBy}&sortDir=${sortDir}`);
  }

  getPlaylistById(id: number) {
    return this.http.get(this.baseUrl + GET_PLAYLIST_BY_ID + id);
  }

  add(): Observable<any> {
    return this.http.post(this.baseUrl + ADD_PLAYLIST, {});
  }

  update(id:number, body: any): Observable<any> {
    return this.http.put(this.baseUrl + UPDATE_PLAYLIST + id, body);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + DELETE_PLAYLIST + id);
  }

  getArtistById(id: number) {
    return this.http.get(this.baseUrl + GET_ARTIST_BY_ID + id);
  }

  getAllArtists() {
    return this.http.get(this.baseUrl + GET_ALL_ARTISTS);
  }

  getTrackById(id: number) {
    return this.http.get(this.baseUrl + GET_TRACK_BY_ID + id);
  }

  getAllTracks() {
    return this.http.get(this.baseUrl + GET_ALL_TRACKS);
  }

  getUserPlaylists(sortBy: string = 'id', sortDir: string = 'asc') {
    const auth_token = this.loginService.getTokenFromCookie();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get(this.baseUrl + GET_USER_PLAYLISTS + `?pageSize=10&sortBy=${sortBy}&sortDir=${sortDir}`, { headers });
  }

  getUserArtists(sortBy: string = 'id', sortDir: string = 'asc') {
    const auth_token = this.loginService.getTokenFromCookie();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get(this.baseUrl + GET_USER_ARTISTS + `?pageSize=10&sortBy=${sortBy}&sortDir=${sortDir}`, { headers });
  }
}
