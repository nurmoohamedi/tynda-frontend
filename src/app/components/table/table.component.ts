import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {MusicService} from "../../service/music.service";
import {Router} from "@angular/router";

@Component({
  selector: 'td-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() type!: string;
  @Input() tableData!: any;

  @ViewChild('trackMenu') actionsElement?: ElementRef;
  lastClickedTrack!: number;

  constructor(
    private musicService: MusicService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  playMusic(data: any) {
    if (data?.id) {
      this.musicService.songInfo$.next(data);
    }
  }

  navigateToTrack(trackId: any) {
    this.router.navigateByUrl(`track/${trackId}`);
  }

  navigateToArtist(artistId: any) {
    this.router.navigateByUrl('/artist', { skipLocationChange: true }).then(() => {
      this.router.navigate([`artist/${artistId}`]);
    });
  }

  onTrackLiked(event: any, item: any, index: number) {
    if (this.tableData[index]?.liked) {
      this.tableData[index].liked = false;
    } else {
      this.tableData[index].liked = true;
    }
  }

  showTrackMenu(index: number) {
    if (index) {
      if (this.tableData[index]?.menu) {
        this.tableData[index].menu = false;
      } else {
        this.tableData[index].menu = true;
      }
      this.lastClickedTrack = index;
    }
  }


  //Для закрытия окна действии при клике в сторону или переходе
  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: any): void {
    if (
      !this.actionsElement?.nativeElement.contains(event.target) && this.actionsElement)
    {
      this.showTrackMenu(this.lastClickedTrack);
    }
  }

  getTimeInMilliseconds(milliseconds: number | string) {
    if (typeof milliseconds == 'number') {
      const hours = `0${new Date(milliseconds).getHours() - 1}`.slice(-2);
      const minutes = `0${new Date(milliseconds).getMinutes()}`.slice(-2);
      const seconds = `0${new Date(milliseconds).getSeconds()}`.slice(-2);

      const time = `${minutes}:${seconds}`;
      return time;
    } else {
      return milliseconds;
    }
  }

  formatArtistName(name: string): string {
    if (name.includes('-')) {
      return name.split('-').map(it => it.includes('%') ? '' : it).join(' ');
    } else {
      return name;
    }
  }
}
