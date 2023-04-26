import { Component } from '@angular/core';
import {BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'td-playlist-modal',
  templateUrl: './playlist-modal.component.html',
  styleUrls: ['./playlist-modal.component.scss']
})
export class PlaylistModalComponent {

  data: any;

  constructor(private service: BsModalService) {
  }

  close() {
    this.service.hide();
  }

}
