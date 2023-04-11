import {Component, Input} from '@angular/core';

@Component({
  selector: 'td-icon',
  templateUrl: './td-icon.component.html',
  styleUrls: ['./td-icon.component.scss']
})
export class TdIconComponent {
  @Input() type = 'png';
  @Input() name = '';
  @Input() className = 'icon-24';
}
