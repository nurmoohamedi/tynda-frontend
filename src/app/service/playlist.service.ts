import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ADD_PLAYLIST, DELETE_PLAYLIST, GET_ALL_PLAYLISTS, GET_PLAYLIST_BY_ID} from "../core/constants/apiUrls";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  baseUrl: string = environment.baseUrl;

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

  delete(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + DELETE_PLAYLIST + id);
  }
}
