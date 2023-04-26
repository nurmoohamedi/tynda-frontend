import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {MainComponent} from "./components/main/main.component";
import {HomeComponent} from "./components/home/home.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {PlaylistComponent} from "./components/playlist/playlist.component";
import {AuthGuardService} from "./service/auth-guard.service";
import {CollectionComponent} from "./components/collection/collection.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: MainComponent, title: 'Tynda - Streaming Service', canActivate: [AuthGuardService],
    children: [
      { path: 'home', pathMatch: 'full', component: HomeComponent },
      { path: 'collection', title: 'Collection', component: CollectionComponent },
      {
        path: 'playlist', title: 'Playlist',
        children: [
          { path: ':id', component: PlaylistComponent}
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
