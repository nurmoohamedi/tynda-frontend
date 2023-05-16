import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {
  ADD_PLAYLIST,
  DELETE_PLAYLIST, GET_ALL_ARTISTS,
  GET_ALL_PLAYLISTS, GET_ARTIST_BY_ID,
  GET_PLAYLIST_BY_ID,
  UPDATE_PLAYLIST
} from "../core/constants/apiUrls";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  baseUrl: string = environment.baseUrl;

  playlistState$ = new BehaviorSubject(false);
  isChangedPlaylist = this.playlistState$.asObservable();

  constructor(private http: HttpClient) { }

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
    return this.http.get(this.baseUrl + GET_ARTIST_BY_ID + id)
  }

  getAllArtists() {
    return this.http.get(this.baseUrl + GET_ALL_ARTISTS)
  }
}
