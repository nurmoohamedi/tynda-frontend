import {Component, Input} from '@angular/core';

@Component({
  selector: 'td-banner-card',
  templateUrl: './banner-card.component.html',
  styleUrls: ['./banner-card.component.scss']
})
export class BannerCardComponent {

  @Input() public data: any;
  @Input() public index: any;

}
