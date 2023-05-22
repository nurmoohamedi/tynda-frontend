import {Component, Input} from '@angular/core';

@Component({
  selector: 'td-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent {

  @Input() type?: string = 'playlist';
  @Input() isOpen?: boolean;

  @Input() onDelete = () => {
  };

  delete() {
    this.onDelete();
  }

  onFollow() {
  }
}
