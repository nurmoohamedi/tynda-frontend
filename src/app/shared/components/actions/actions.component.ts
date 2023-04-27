import {Component, Input} from '@angular/core';

@Component({
  selector: 'td-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent {

  @Input() onDelete = () => {};
  @Input() type?: string;
  @Input() isOpen?: boolean;

  delete() {
    this.onDelete();
  }

}
