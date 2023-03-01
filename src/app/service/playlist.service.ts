import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {GET_ALL_PLAYLISTS} from "../core/constants/apiUrls";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  url: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getPlaylists() {
    return this.http.get(this.url + GET_ALL_PLAYLISTS);
  }
}
