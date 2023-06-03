import {Component, Input} from '@angular/core';

@Component({
  selector: 'td-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

  @Input() loading: boolean = false;

}
