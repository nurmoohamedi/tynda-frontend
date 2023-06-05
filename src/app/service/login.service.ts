import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {User} from "../models/user";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {LOGIN, WELCOME} from "../core/constants/pathnames";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl: string = environment.baseUrl;

  private currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>({});
  public currentUserData: User = {};

  authorized = new BehaviorSubject(false);
  isAuthorized = this.authorized.asObservable();

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.currentUser$ = new BehaviorSubject<any>(
    // @ts-ignore
      JSON.parse(localStorage.getItem('token'))
    );
  }

  setAuthorizedStatus(value: boolean) {
    this.authorized.next(value);
  }

  setCurrentUser(data: any) {
    this.currentUser$.next(data);
    this.currentUserData = data;
    localStorage.setItem('user', JSON.stringify(data));
  }

  login(username: string, password: string) {
    return this.http.post(this.baseUrl + '/auth/signin', { username, password })
      .subscribe({
        next: (user: any) => {
          if (user) {
            const token = user?.data?.accessToken;
            if (token) {
              this.cookieService.set('token', token, 86400, '');
              this.setCookie('token',  { token, expires_in: 86400 }, 3600 * 24, '/');
              localStorage.setItem('token', JSON.stringify(token));
              this.setCurrentUser(user.data);
              this.setAuthorizedStatus(true);
              this.router.navigate([WELCOME]);
            }
          }
        }, error: err => {
          alert('Bad Request');
        }
      });
  }

  registr(username: string, email: string, password: string) {
    const body = { username, email, password };
    return this.http.post(this.baseUrl + '/auth/signup', body)
      .subscribe({
        next: (user: any) => {
          if (user) {
            localStorage.setItem('token', JSON.stringify(user));
            debugger;
            this.setCurrentUser(user);
            this.setAuthorizedStatus(true);
            this.router.navigate([WELCOME]);
          }
        }, error: err => {
          alert('Bad Request');
        }
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.cookieService.deleteAll();
    // @ts-ignore
    this.setCurrentUser(null);
    this.setAuthorizedStatus(false);
    this.router.navigate([LOGIN]);
  }

  setCookie(name: string, value: any, expires: number, path: string) {
    this.cookieService.set(
      name,
      value[name],
      Math.floor(value.expires_in / expires),
      path
    );
  }

  getTokenFromCookie(){
    return this.cookieService.get('token');
  }

  isAuthenticated() {
    // const token = localStorage.getItem('token');
    const token = this.cookieService.get('token');
    return token;
  }
}
