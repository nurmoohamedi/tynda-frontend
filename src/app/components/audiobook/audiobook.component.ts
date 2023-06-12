import {Component, OnInit} from '@angular/core';
import {PlaylistService} from "../../service/playlist.service";
import {NotificationService} from "../../service/notification.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'td-audiobook',
  templateUrl: './audiobook.component.html',
  styleUrls: ['./audiobook.component.scss']
})
export class AudiobookComponent implements OnInit {

  id: string | null;
  data: any;
  dataLoader: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private notify: NotificationService,
    private playlistService: PlaylistService
  ) {
    this.id = route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.id) {
      this.getById(this.id);
    }
  }

  getById(id: string) {
    this.dataLoader = true;
    this.playlistService.getAudiobookById(id).subscribe({
      next: (data: any) => {
        this.data = data?.data;
        this.dataLoader = false;
      }, error: err => {
        this.notify.showError();
        this.dataLoader = false;
      }
    });
  }
}
