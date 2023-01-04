import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {MainComponent} from "./components/main/main.component";
import {HomeComponent} from "./components/home/home.component";
import {PlaylistsComponent} from "./components/playlists/playlists.component";
import { MusicsComponent } from './components/musics/musics.component';
import {NotFoundComponent} from "./components/not-found/not-found.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: MainComponent, title: 'Tynda - Streaming Service',
    children: [
      { path: '', pathMatch: 'full', component: HomeComponent },
      { path: 'playlists', title: 'Playlists', component: PlaylistsComponent },
      { path: 'musics', title: 'Musics', component: MusicsComponent },
    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
