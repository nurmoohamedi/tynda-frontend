import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { MusicsComponent } from './components/musics/musics.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SidebarComponent } from './components/main/sidebar/sidebar.component';
import { TdIconComponent } from './common/td-icon/td-icon.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    HomeComponent,
    PlaylistsComponent,
    MusicsComponent,
    NotFoundComponent,
    SidebarComponent,
    TdIconComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
