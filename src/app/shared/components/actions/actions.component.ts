import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'td-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent {

  @Input() type?: string = 'playlist';
  @Input() className?: string = '';
  @Input() isOpen?: boolean;

  @Input() onDelete = () => {
  };

  @Input() onOpenModal!: Function;
  @Input() onCopyClipBoard!: Function;

  constructor() {
  }

  delete() {
    this.onDelete();
  }

  onFollow() {
  }

  openModal() {
    this.onOpenModal();
  }

  copyClipBoard() {
    this.onCopyClipBoard();
  }
}
