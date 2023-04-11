import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  private baseUrl = environment.baseUrl;
  // corsHeaders: HttpHeaders;

  public songInfo$: Subject<any> = new Subject<any>();

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
    return this.http.get(`${this.baseUrl}/songs/all`);
  }

  getMusicById(id: number) {
    return this.http.get(`${this.baseUrl}/songs/${id}`);
  }

}
