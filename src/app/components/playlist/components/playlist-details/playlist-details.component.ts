import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import ColorThief from "colorthief";


@Component({
  selector: 'td-playlist-details',
  templateUrl: './playlist-details.component.html',
  styleUrls: ['./playlist-details.component.scss']
})
export class PlaylistDetailsComponent implements OnInit, AfterViewInit {

  // @ts-ignore
  @ViewChild('backCol') backCol: ElementRef;
  @Input() playlistDetails: any;

  constructor() {
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

}
