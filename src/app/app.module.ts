import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {MainComponent} from './components/main/main.component';
import {HomeComponent} from './components/home/home.component';
import {PlaylistsComponent} from './components/playlists/playlists.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {SidebarComponent} from './components/main/sidebar/sidebar.component';
import {TdIconComponent} from './common/td-icon/td-icon.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {TdHeaderComponent} from './layout/td-header/td-header.component';
import {BannerListComponent} from './shared/components/banner-list/banner-list.component';
import {BannerCardComponent} from './shared/components/banner-card/banner-card.component';
import {PlaylistCardComponent} from './shared/components/playlist-card/playlist-card.component';
import {PlaylistComponent} from './components/playlist/playlist.component';
import {PlaylistDetailsComponent} from './components/playlist/components/playlist-details/playlist-details.component';
import {PlaylistHistoryComponent} from './components/playlist-history/playlist-history.component';
import {PlayerBarComponent} from './components/main/player-bar/player-bar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PlaylistModalComponent} from './shared/components/playlist-modal/playlist-modal.component';
import {ModalModule} from "ngx-bootstrap/modal";
import { ActionsComponent } from './shared/components/actions/actions.component';
import { CollectionComponent } from './components/collection/collection.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { ArtistComponent } from './components/artist/artist.component';
import { MusicComponent } from './components/music/music.component';
import { SearchComponent } from './components/search/search.component';
import { TableComponent } from './components/table/table.component';
import { TopChartsComponent } from './components/top-charts/top-charts.component';
import { LoaderComponent } from './common/loader/loader.component';
import {TokenInterceptorService} from "./interceptors/token-interceptor.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import { ProfileComponent } from './components/profile/profile.component';
import {ClipboardModule} from "@angular/cdk/clipboard";
import { AudiobooksComponent } from './components/audiobooks/audiobooks.component';
import { AudiobookComponent } from './components/audiobook/audiobook.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    HomeComponent,
    PlaylistsComponent,
    NotFoundComponent,
    SidebarComponent,
    TdIconComponent,
    TdHeaderComponent,
    BannerListComponent,
    BannerCardComponent,
    PlaylistCardComponent,
    PlaylistComponent,
    PlaylistDetailsComponent,
    PlaylistHistoryComponent,
    PlayerBarComponent,
    PlaylistModalComponent,
    ActionsComponent,
    CollectionComponent,
    ArtistsComponent,
    ArtistComponent,
    MusicComponent,
    SearchComponent,
    TableComponent,
    TopChartsComponent,
    LoaderComponent,
    ProfileComponent,
    AudiobooksComponent,
    AudiobookComponent
  ],
    imports: [
        TooltipModule.forRoot(),
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ClipboardModule,
        ToastrModule.forRoot(),
        ModalModule.forRoot()
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
