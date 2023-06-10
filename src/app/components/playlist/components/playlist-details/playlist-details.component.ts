import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import ColorThief from "colorthief";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {PlaylistModalComponent} from "../../../../shared/components/playlist-modal/playlist-modal.component";
import {environment} from "../../../../../environments/environment";
import {getTimeInMilliseconds, thousandsSeparator} from "../../../../core/helpers";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'td-playlist-details',
  templateUrl: './playlist-details.component.html',
  styleUrls: ['./playlist-details.component.scss']
})
export class PlaylistDetailsComponent implements OnInit, AfterViewInit {

  @Input() type: string = 'playlist';

  // @ts-ignore
  @ViewChild('backCol') backCol: ElementRef;
  @Input() playlistDetails: any;

  private modalRef?: BsModalRef;

  public baseUrl: string = environment.baseUrl;

  constructor(
    private modalService: BsModalService,
    private route: Router,
    private router: ActivatedRoute,
  ) {}

  ngOnInit() {
    // this.type = this.route.routerState.snapshot.url.split('/')[1];
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
      const rgb = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
      this.backCol.nativeElement.style.backgroundColor = rgb;
    }
  }

  openPlaylistModal() {
    this.modalRef = this.modalService.show(PlaylistModalComponent, {
      id: 1,
      class: 'modal-w-536 modal-centered',
      initialState: { data: this.playlistDetails }
    });
  }

  formatNumber(number: any) {
    if (number) {
      return thousandsSeparator(number);
    } else {
      return '';
    }
  }

  getTimeInMilliseconds(milliseconds: number | string) {
    return getTimeInMilliseconds(milliseconds);
  }

  getContentType(type: string) {
    switch (type) {
      case 'artist':
        return 'Ánshi';
      case 'playlist':
        return 'Ánjinaq';
      case 'track':
        return 'Án';
      default:
        return 'Án';
    }
  }

  navigateToArtist(id: any) {
    this.route.navigateByUrl(`artist/${id}`);
  }
}
