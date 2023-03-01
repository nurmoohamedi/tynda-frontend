import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  private url = environment.baseUrl;
  // corsHeaders: HttpHeaders;
  constructor(
    private http: HttpClient
  ) {
    // this.corsHeaders = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Accept': 'application/json',
    //   'Access-Control-Allow-Origin': 'http://localhost:8080'
    // });
  }

  getAllMusics() {
    return this.http.get(`${this.url}/songs/all`);
  }
}
