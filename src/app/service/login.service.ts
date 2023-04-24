import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {User} from "../models/user";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl: string = environment.baseUrl;

  private currentUser$: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUser$ = new BehaviorSubject<any>(
    // @ts-ignore
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUser$.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUser$.value;
  }

  login(username: string, password: string) {
    return this.http.post(this.baseUrl + '/auth/signin', { username, password })
      .pipe(
        map((user: any) => {
          //user.authdata = window.btoa(username + ":" + password);
          if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUser$.next(user);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    // @ts-ignore
    this.currentUser$.next(null);
  }
}
