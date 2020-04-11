import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppAuthGuard } from './app-authguard';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SearchAnimeComponent } from './search-anime/search-anime.component';
import { AnimeDetailsComponent } from './anime-details/anime-details.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AppAuthGuard]
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AppAuthGuard]
  },
  { path: 'search', component: SearchAnimeComponent },
  { path: 'details', component: AnimeDetailsComponent},
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class AppRoutingModule { }
