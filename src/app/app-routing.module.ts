import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SearchAnimeComponent } from './search-anime/search-anime.component';
import { AppAuthGuard } from './app-authguard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [AppAuthGuard] 
  },
  { path: 'register', component: RegisterComponent },
  { path: 'search', component: SearchAnimeComponent },
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class AppRoutingModule { }
