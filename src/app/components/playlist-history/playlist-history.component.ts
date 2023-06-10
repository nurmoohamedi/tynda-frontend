import {AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import ColorThief from "colorthief";
import {MusicService} from "../../service/music.service";
import {PlaylistService} from "../../service/playlist.service";
import {Router} from "@angular/router";

@Component({
  selector: 'td-playlist-history',
  templateUrl: './playlist-history.component.html',
  styleUrls: ['./playlist-history.component.scss']
})
export class PlaylistHistoryComponent implements OnInit, AfterViewInit {
  // @ts-ignore
  @ViewChild('backCol') backCol: ElementRef;

  @Input() data: any;
  @Input() type = 'playlist';
  @Input() apiType = 'playlist';
  @Input() tableData: any;
  // = [
  //   {id: 1, name: 'Muldem', artists: 'Qonyratbay Fam, jeltoksan', duration: '3:15'},
  //   {id: 1, name: 'Basqany', artists: 'Ayau, Shiza, Mdee', duration: '3:15'},
  //   {id: 1, name: 'Sheker', artists: 'Darkhan', duration: '3:15'},
  // ];

  // Artist variables
  isFollowed: boolean = false;

  @ViewChild('actions') actionsElement?: ElementRef;
  isOpenActions: boolean = false;

  constructor(
    private playlistService: PlaylistService,
    private musicService: MusicService,
    private router: Router,
  ) {
    console.info(this.tableData);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.getImageColor();
  }

  getImageColor() {
    const colorThief = new ColorThief();

    const element = document.getElementById('backCol');
    // const img = document.querySelector('img');
    const image = document.querySelectorAll('img');

    let img: HTMLImageElement | null = null;

    if (image) {
      image.forEach(element => {
        if (element.id === 'backImage') {
          img = element;
        }
      });
    }

    let color: any;
    if (img) {
      color = colorThief.getColor(img);
    }
    if (color) {
      // element.style.backgroundColor = color;
      console.log(color);
      const rgb = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
      this.backCol.nativeElement.style.backgroundColor = rgb;
    }
  }

  deletePlaylist = () => {
    const id = this.data.id;
    this.playlistService.delete(id).subscribe({
      next: value => {
        if (value) {
          this.router.navigate(['collection']);
        }
      }, error: err => {
        alert(err.message);
      }
    });
  }

  followArtist() {
    this.isFollowed = !this.isFollowed;
  }

  openActions() {
    this.isOpenActions = !this.isOpenActions;
  }

  //Для закрытия окна действии при клике в сторону или переходе
  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: any): void {
    if (
      !this.actionsElement?.nativeElement.contains(event.target) && this.actionsElement)
    {
      this.isOpenActions = false;
    }
  }

  onPlay() {
    const track = this.data;
    if (track?.id) {
      this.musicService.songInfo$.next(track);
    }
  }
}
