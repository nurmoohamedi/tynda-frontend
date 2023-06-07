import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  globalOptions: any = {
    closeButton: false,
    timeOut: 2000,
    extendedTimeOut: 2000,
    toastClass: 'custom-toastr ngx-toastr',
    positionClass: 'toast-top-right',
    preventDuplicates: true,
  };

  constructor(
    private toastr: ToastrService
  ) { }

  showSuccess(message: string = 'Sátti oryndaldy!', title: string = ''){
    this.toastr.success(message, title, this.globalOptions);
  }

  showError(message: string = 'Belgisiz qate paıda boldy!', title: string = ''){
    this.toastr.error(message, title, this.globalOptions);
  }

  showInfo(message: string = '', title: string = ''){
    this.toastr.info(message, title, this.globalOptions);
  }

  showWarning(message: string = '', title: string = ''){
    this.toastr.warning(message, title, this.globalOptions);
  }
}
