import { Component } from '@angular/core';
import {BsModalService} from "ngx-bootstrap/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PlaylistService} from "../../../service/playlist.service";
import {NotificationService} from "../../../service/notification.service";
import {LoginService} from "../../../service/login.service";

@Component({
  selector: 'td-playlist-modal',
  templateUrl: './playlist-modal.component.html',
  styleUrls: ['./playlist-modal.component.scss']
})
export class PlaylistModalComponent {

  public form!: FormGroup;
  data: any;
  type: any = 'playlist';

  url: any;
  msg = "";
  file: any;

  constructor(
    private service: BsModalService,
    private fb: FormBuilder,
    private playlistService: PlaylistService,
    private notify: NotificationService,
    private loginService: LoginService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      desc: [''],
      cover: [null],
    })
  }

  selectFile(event: any) {
    if(!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      this.notify.showError(this.msg);
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      this.notify.showError(this.msg);
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msg = "";
      this.url = reader.result;
      this.file = event.target.files[0]
    }
  }

  clearSelectedFile() {
    this.msg = '';
    this.url = null;
  }

  close() {
    this.service.hide();
  }

  validate() {
    let valid = this.form.valid;
    const values = this.form?.value;
    // debugger;
    // if (
    //   values.name === this.data.name ||
    //   values.name === this.data.username
    // ) {
    //   valid = false;
    // }

    if (this.msg) {
      valid = false;
    }
    if (valid) {
       if (this.type === 'profile') {
         const body = {
           user: { ...this.data, username: values.name },
           file: this.file
         };
         this.updateProfile(body);
       } else {
         const body = {
           name: values.name,
           //description: values.desc,
         };
         this.updatePlaylist(body);
       }
    } else {
      let message = 'Ozgeris engiziniz!';
      if (this.msg) {
        message = this.msg;
      }
      this.notify.showWarning(message);
    }
  }

  updatePlaylist(body: any) {
    this.playlistService.update(this.data.id, body).subscribe({
      next: value => {
        this.playlistService.playlistState$.next(true);
        this.notify.showSuccess('Satti saqtaldy!');
        this.close();
      }, error: err => {
        alert(err?.message);
      }
    });
  }

  updateProfile(body: any) {
    this.loginService.updateUserData(body.user, body?.file);
    this.close();
  }
}
