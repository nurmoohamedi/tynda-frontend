import { Component } from '@angular/core';
import {BsModalService} from "ngx-bootstrap/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PlaylistService} from "../../../service/playlist.service";

@Component({
  selector: 'td-playlist-modal',
  templateUrl: './playlist-modal.component.html',
  styleUrls: ['./playlist-modal.component.scss']
})
export class PlaylistModalComponent {

  public form!: FormGroup;
  data: any;

  constructor(
    private service: BsModalService,
    private fb: FormBuilder,
    private playlistService: PlaylistService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      desc: [''],
      cover: [null],
    })
  }

  close() {
    this.service.hide();
  }

  validate() {
    let valid = this.form.valid;
    const values = this.form?.value;
    if (values.name === this.data.name) {
      valid = false;
    }
    if (valid) {
       const body = {
         name: values.name,
         //description: values.desc,
      };
       this.playlistService.update(this.data.id, body).subscribe({
         next: value => {
           alert(value?.message);
           this.playlistService.playlistState$.next(true);
           this.close();
         }, error: err => {
           alert(err?.message);
         }
       });
    }
  }



}
