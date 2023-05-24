import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {MainComponent} from "./components/main/main.component";
import {HomeComponent} from "./components/home/home.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {PlaylistComponent} from "./components/playlist/playlist.component";
import {AuthGuardService} from "./service/auth-guard.service";
import {CollectionComponent} from "./components/collection/collection.component";
import {ArtistComponent} from "./components/artist/artist.component";
import {MusicComponent} from "./components/music/music.component";
import {SearchComponent} from "./components/search/search.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: MainComponent, title: 'Tynda - Streaming Service', canActivate: [AuthGuardService],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', pathMatch: 'full', component: HomeComponent },
      { path: 'search', component: SearchComponent },
      { path: 'collection', title: 'Collection', component: CollectionComponent },
      {
        path: 'playlist', title: 'Playlist',
        children: [
          { path: ':id', component: PlaylistComponent}
        ]
      },
      {
        path: 'artist', title: 'Ánshi',
        children: [
          { path: ':id', component: ArtistComponent}
        ]
      },
      {
        path: 'track', title: 'Án',
        children: [
          { path: ':id', component: MusicComponent}
        ]
      },
    ]
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
