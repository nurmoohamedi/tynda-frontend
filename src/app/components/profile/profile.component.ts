import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {LoginService} from "../../service/login.service";
import {PlaylistModalComponent} from "../../shared/components/playlist-modal/playlist-modal.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {NotificationService} from "../../service/notification.service";
import {Clipboard} from "@angular/cdk/clipboard";

@Component({
  selector: 'td-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userData: any;
  modalRef: any = BsModalRef;

  showProfileActions: boolean = false;
  @ViewChild('profileMenu') actionsElement?: ElementRef;

  constructor(
    private loginService: LoginService,
    private modalService: BsModalService,
    private notify: NotificationService,
    private clipboard: Clipboard
  ) {
  }

  ngOnInit(): void {
    this.loginService.currentUserObservable.subscribe((data) => {
      if (data) {
        this.userData = data;
      }
      // debugger;
    });
    const localUser = localStorage.getItem('user');
    if (localUser) {
      this.userData = JSON.parse(localUser);
    }
  }

  //Для закрытия окна действии при клике в сторону или переходе
  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: any): void {
    if (
      !this.actionsElement?.nativeElement.contains(event.target) && this.actionsElement)
    {
      this.showProfileActions = false;
    }
  }

  toggleProfileActions() {
    this.showProfileActions = !this.showProfileActions;
  }

  openModal = () => {
    this.modalRef = this.modalService.show(PlaylistModalComponent, {
      id: 1,
      class: 'modal-w-536 modal-centered',
      initialState: { data: this.userData, type: 'profile' }
    });
  }

  copyProfileToClipboard = () => {
    const profileToCopy: string = 'https://tynda.kz/profile/r21r1rdscae5d21';
    this.clipboard.copy(profileToCopy);
    this.notify.showSuccess('Satti koshirildi!');
  }
}
