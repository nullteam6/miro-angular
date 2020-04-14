import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DoBootstrap } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';

import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AnimeDetailsComponent } from './anime-details/anime-details.component';
import { SearchAnimeComponent } from './search-anime/search-anime.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent, SelectedAnimeModalComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';

import { JsonParse } from './pipes/json-parse';
import { SearchUsersComponent } from './search-users/search-users.component';

const keycloakService: KeycloakService = new KeycloakService();

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SearchAnimeComponent,
    NavbarComponent,
    AnimeDetailsComponent,
    LoginComponent,
    LogoutComponent,
    ProfileComponent,
    SelectedAnimeModalComponent,
    AdminComponent,
    JsonParse,
    SearchUsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    KeycloakAngularModule,
    NgbModule,
    KeycloakAngularModule,
  ],
  providers: [
    CookieService,
    {
      provide: KeycloakService,
      useValue: keycloakService
    },
  ],
  entryComponents: [AppComponent]
})
export class AppModule implements DoBootstrap {
  async ngDoBootstrap(app) {
    const { keycloakConfig } = environment;

    try {
      await keycloakService.init({ config: keycloakConfig });
      app.bootstrap(AppComponent);
    } catch (error) {
      console.error('Keycloak init failed', error);
    }
  }
}
