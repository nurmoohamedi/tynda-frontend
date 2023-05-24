import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {LoginService} from "../../service/login.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {debounceTime, Subscription} from "rxjs";
import {SpotifyService} from "../../service/spotify.service";

@Component({
  selector: 'td-header',
  templateUrl: './td-header.component.html',
  styleUrls: ['./td-header.component.scss']
})
export class TdHeaderComponent implements OnInit {

  isAuthenticated = this.loginService.isAuthorized;
  showProfile: boolean = false;
  @ViewChild('profileDropdown') profileDropdown?: ElementRef;
  @ViewChild('searchDropdown') searchDropdown?: ElementRef;

  subscription: Subscription = new Subscription();
  searchBarControl = new FormControl();
  searchAllData: any;
  searchData: any;

  constructor(
    private loginService: LoginService,
    private cookieService: CookieService,
    private searchService: SpotifyService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.cookieService.get('token')) {
      this.loginService.setAuthorizedStatus(true);
    } else {
      this.loginService.setAuthorizedStatus(false);
    }

    this.subscription = this.searchBarControl.valueChanges.pipe(debounceTime(1000)).subscribe({
      next: (value) => {
        if (value) {
          let searchData: any = localStorage.getItem('searchData');
          if (searchData) {
            // @ts-ignore
            searchData = JSON.parse(localStorage.getItem('searchData'));
            this.searchAllData = searchData;
            this.searchData = searchData?.topResults;
          } else {
            this.searchService.searchEverything(value).subscribe({
              next: (data: any) => {
                localStorage.setItem('searchData', JSON.stringify(data));
                this.searchAllData = searchData;
                this.searchData = searchData?.topResults;
              }, error: err => {
                alert(err);
              }
            });
          }
        }
      }
    });
  }

  onLogOut() {
    this.loginService.logout();
  }

  toggleProfile() {
    this.showProfile = !this.showProfile;
  }

  onDropdownClicked(type: 'profile' | 'collection' | 'logout') {
    switch (type) {
      case 'profile':
        this.router.navigateByUrl('home');
        break;
      case 'collection':
        this.router.navigateByUrl('collection');
        break;
      case 'logout':
        this.onLogOut();
        break;
    }
    this.toggleProfile();
  }

  @HostListener('document:mousedown', ['$event'])
  onMouseClicked(event: any) {
    if (
      this.profileDropdown &&
      !this.profileDropdown.nativeElement.contains(event.target)
    ) {
      this.showProfile = false;
    }
    if (
      this.searchDropdown &&
      !this.searchDropdown.nativeElement.contains(event.target)
    ) {
      this.showSearchDropdown = false;
    }
  }

  showSearchDropdown:boolean = false;
  onSearchBarFocusIn(value: any) {
    this.showSearchDropdown = value;
  }
  onSearchBarFocusOut(event: any) {
    if (
      this.searchDropdown &&
      !this.searchDropdown.nativeElement.contains(event.target)
    ) {
      this.showSearchDropdown = false;
    }
  }

  onItemCLick(itemURI: string) {
    if (itemURI) {
      const splittedUri = itemURI.split(':');
      const itemType = splittedUri[1];
      const itemId = splittedUri[2];

      // const link = document.createElement('a');
      // link.href = `https://open.spotify.com/${itemType}/${itemId}`;
      // link.target = '_blank;'
      // link.click();
      if (['track', 'artist', 'playlist'].includes(itemType)) {
        this.router.navigateByUrl(`${itemType}/${itemId}`);
      }
      this.showSearchDropdown = false;
      this.clearSearchBar();
    }
  }

  getItemType(uri: string) {
    if (uri) {
      const type = uri.split(':')[1];
      switch (type) {
        case 'artist':
          return 'Anshi';
        case 'track':
          return 'An'
        case 'playlist':
          return 'Anjinaq';
        default:
          return '';
      }
    } else {
      return '';
    }
  }

  clearSearchBar() {
    this.searchBarControl.patchValue('');
    this.showSearchDropdown = false;
  }

  getAllResults() {
    const query = this.searchBarControl.value;
    this.searchService.searchState$.next(this.searchAllData);
    this.router.navigateByUrl('search?query=' + query);
    this.clearSearchBar();
  }
}
