import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {GET_ALL_PLAYLISTS, GET_PLAYLIST_BY_ID} from "../core/constants/apiUrls";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getPlaylists() {
    return this.http.get(this.baseUrl + GET_ALL_PLAYLISTS);
  }

  getPlaylistById(id: number) {
    return this.http.get(this.baseUrl + GET_PLAYLIST_BY_ID + id);
  }
}
