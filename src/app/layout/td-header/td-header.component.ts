import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../service/login.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'td-header',
  templateUrl: './td-header.component.html',
  styleUrls: ['./td-header.component.scss']
})
export class TdHeaderComponent implements OnInit {

  isAuthenticated = this.loginService.isAuthorized;

  constructor(private loginService: LoginService, private cookieService: CookieService) {}

  ngOnInit() {
    if (this.cookieService.get('token')) {
      this.loginService.setAuthorizedStatus(true);
    } else {
      this.loginService.setAuthorizedStatus(false);
    }
  }

  onLogOut() {
    this.loginService.logout();
  }

}
