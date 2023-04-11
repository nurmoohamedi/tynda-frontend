import {Component, Input} from '@angular/core';

@Component({
  selector: 'td-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.scss']
})
export class BannerListComponent {

  @Input() bannerList: any;

}
