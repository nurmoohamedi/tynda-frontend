import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {User} from "../models/user";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {LOGIN, WELCOME} from "../core/constants/pathnames";
import {NotificationService} from "./notification.service";
import {AudioService} from "./audio.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl: string = environment.baseUrl;

  public currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>({});
  public currentUserObservable = this.currentUser$.asObservable();
  public currentUserData: User = {};

  authorized = new BehaviorSubject(false);
  isAuthorized = this.authorized.asObservable();

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    private notify: NotificationService,
    private playerBar: AudioService
  ) {
    // this.currentUser$ = new BehaviorSubject<any>(
    // // @ts-ignore
    //   JSON.parse(localStorage.getItem('token'))
    // );
  }

  setAuthorizedStatus(value: boolean) {
    this.authorized.next(value);
  }

  setAccessToken(token: string) {
    this.cookieService.set('token', token, 86400, '');
    this.setCookie('token',  { token, expires_in: 86400 }, 3600 * 24, '/');
    localStorage.setItem('token', JSON.stringify(token));
  }

  setCurrentUser(data: any) {
    if (
      data?.accessToken ||
      data?.tokenType ||
      data?.password
    ) {
      delete data.accessToken;
      delete data.tokenType;
      delete data.password;
    }

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
              this.setAccessToken(token);
              this.setCurrentUser(user.data);
              this.setAuthorizedStatus(true);
              this.router.navigate([WELCOME]);
            }
          }
        }, error: err => {
          if (err == 'Bad credentials') {
            this.notify.showError('Derekter durys emes!');
          } else {
            this.notify.showError(err);
          }
        }
      });
  }

  registr(username: string, email: string, password: string) {
    const body = { username, email, password };
    return this.http.post(this.baseUrl + '/auth/signup', body)
      .subscribe({
        next: (user: any) => {
          const token = user?.data?.accessToken;
          if (token) {
            this.setAccessToken(token);
            this.setCurrentUser(user.data);
            this.setAuthorizedStatus(true);
            this.router.navigate([WELCOME]);
          }
        }, error: err => {
          if (err == 'Bad credentials') {
            this.notify.showError('Derekter durys emes!');
          } else {
            this.notify.showError(err);
          }
        }
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.cookieService.deleteAll();
    // @ts-ignore
    this.setCurrentUser(undefined);
    this.setAuthorizedStatus(false);
    this.playerBar.stop();
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

  updateUserData(user: any, file: File | null) {
    const formData = new FormData();

    const blob= new Blob([JSON.stringify(user)], {
      type: "application/json"
    });
    formData.append('user', blob);

    if (file) {
      formData.append('file', file, file.name);
    }
    return this.http.post(this.baseUrl + '/user/update', formData).subscribe({
      next: (data: any) => {
        const token = data?.data?.accessToken;
        if (token) {
          this.setAccessToken(token);
        }
        this.setCurrentUser(data?.data);
        this.notify.showSuccess('Satti saqtaldy!');
      }, error: err => {
        this.notify.showError();
      }
    });
  }
}
