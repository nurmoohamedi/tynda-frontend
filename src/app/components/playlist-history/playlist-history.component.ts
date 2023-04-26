import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import ColorThief from "colorthief";
import {MusicService} from "../../service/music.service";

@Component({
  selector: 'td-playlist-history',
  templateUrl: './playlist-history.component.html',
  styleUrls: ['./playlist-history.component.scss']
})
export class PlaylistHistoryComponent implements OnInit, AfterViewInit {
  // @ts-ignore
  @ViewChild('backCol') backCol: ElementRef;

  @Input() type = '';
  @Input() tableData: any = [
    {id: 1, name: 'Muldem', artists: 'Qonyratbay Fam, jeltoksan', duration: '3:15'},
    {id: 1, name: 'Basqany', artists: 'Ayau, Shiza, Mdee', duration: '3:15'},
    {id: 1, name: 'Sheker', artists: 'Darkhan', duration: '3:15'},
  ];

  constructor(
    private musicService: MusicService
  ) {
    console.info(this.tableData);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getImageColor();
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

  playMusic(data: any) {
    if (data?.id) {
      this.musicService.songInfo$.next(data);
    }
  }
  isOpenActions: boolean = false;
  openPlaylistActions() {
    this.isOpenActions = !this.isOpenActions;
  }

}
