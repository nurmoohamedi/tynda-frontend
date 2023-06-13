import {Component, Input, OnInit} from '@angular/core';
import {PlaylistService} from "../../service/playlist.service";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'td-audiobooks',
  templateUrl: './audiobooks.component.html',
  styleUrls: ['./audiobooks.component.scss']
})
export class AudiobooksComponent implements OnInit {

  @Input() type: any = null;
  @Input() collData: any;
  data: any;
  dataLoader: boolean = false;

  constructor(
    private router: Router,
    private playlistService: PlaylistService,
    private notify: NotificationService,
  ) {
  }

  ngOnInit(
  ): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this.dataLoader = true;
    this.playlistService.getAllAudiobooks().subscribe({
      next: (data: any) => {
        this.data = data?.data;
        this.dataLoader = false;
      }, error: err => {
        this.notify.showError();
        this.dataLoader = false;
      }
    });
  }

  navigateToBook(id: string) {
      this.router.navigate([`audiobook/${id}`]);
  }
}
