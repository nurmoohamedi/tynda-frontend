import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-td-icon',
  templateUrl: './td-icon.component.html',
  styleUrls: ['./td-icon.component.scss']
})
export class TdIconComponent {
  @Input() name: string = '';
  @Input() className: string = 'icon-24';
}
