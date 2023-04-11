import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {MainComponent} from "./components/main/main.component";
import {HomeComponent} from "./components/home/home.component";
import {MusicsComponent} from './components/musics/musics.component';
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {PlaylistComponent} from "./components/playlist/playlist.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: MainComponent, title: 'Tynda - Streaming Service',
    children: [
      { path: '', pathMatch: 'full', component: HomeComponent },
      { path: 'musics', title: 'Musics', component: MusicsComponent },
      {
        path: 'playlist', title: 'Playlist',
        children: [
          { path: ':id', component: PlaylistComponent}
        ]
      },
    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
