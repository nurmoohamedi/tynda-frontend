import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlaylistService} from "../../service/playlist.service";

@Component({
  selector: 'td-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {

  @Input() onClick: any = () => {};
  @Input() title: any;
  @Input() type: any;
  @Input() playlistData: any = [
    { id: 1, name: 'Mix 1', artists: 'Yenlik, Taspay, Ayree', 'img_link': '' },
    { id: 1, name: 'Mix 1', artists: 'Yenlik, Taspay, Ayree', 'img_link': '' },
    { id: 1, name: 'Mix 1', artists: 'Yenlik, Taspay, Ayree', 'img_link': '' }
  ];

  constructor(
  ) {}

  ngOnInit() {
  }

  addPlaylist() {
    this.onClick();
  }

}
