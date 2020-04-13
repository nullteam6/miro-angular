import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { AppAuthGuard } from '../app-authguard';


const routes: Routes = [
  { path: '',
    component: AdminComponent,
    children: [
      { 
        path: 'users',
        component: UsersComponent,
        canActivate: [AppAuthGuard],
        data: { roles: ['ROLE_ADMIN'] }
      }
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
