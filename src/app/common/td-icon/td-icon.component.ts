import {Component, Input} from '@angular/core';

@Component({
  selector: 'td-icon',
  templateUrl: './td-icon.component.html',
  styleUrls: ['./td-icon.component.scss']
})
export class TdIconComponent {
  @Input() type: string = 'png';
  @Input() name: string = '';
  @Input() className: string = 'icon-24';
}
