import {Component, Input} from '@angular/core';

@Component({
  selector: 'td-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.scss']
})
export class BannerListComponent {

  bannerList: any[] = [
    { id: 10, name: 'Bestseller', artist: 'Raim' },
    { id: 99, name: 'Men dep oila', artist: 'Yenlik' },
  ];

}
