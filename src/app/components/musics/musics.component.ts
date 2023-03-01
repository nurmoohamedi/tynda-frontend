import {Component, OnInit} from '@angular/core';
import {MusicService} from "../../service/music.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-musics',
  templateUrl: './musics.component.html',
  styleUrls: ['./musics.component.scss']
})
export class MusicsComponent implements OnInit {

  public baseUrl: string = environment.baseUrl
  public musicList: any[] = [];

  constructor(
    private musicService: MusicService
  ) {
  }

  ngOnInit() {
    this.musicService
      .getAllMusics()
      .subscribe({
        next: (data: any) => {
          if (data) {
            this.musicList = data;
          }
        }, error: err => {
          alert(err.message);
        }
      })
  }

  getMusic(url: string) {

  }

}
