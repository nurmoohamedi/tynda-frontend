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
import {HttpClientModule} from "@angular/common/http";
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
    CollectionComponent
  ],
    imports: [
        TooltipModule.forRoot(),
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule.forRoot()
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
