import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import { AdmComponent } from './administrativo/administrativo.component';
import { PlanoPgmComponent } from './administrativo/planos/plano.component';
import { HomeComponent } from './_shared/home/home.component';
import { AuthGuard } from './_shared/_auth/auth.guard';
import { LoginComponent } from './_shared/_auth/user/login/login.component';
import { UserComponent } from './_shared/_auth/user/user.component';

const routes: Routes = [
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent }
    ]
  },
  {
    path: 'adm', component: AdmComponent, canActivate: [AuthGuard],
    children: [
      { path: 'planopgm', component:PlanoPgmComponent, canActivate: [AuthGuard] }
    ]
  },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children: [
    ]
  },
  { path: '', redirectTo: 'adm', pathMatch: 'full' },
  { path: '**', redirectTo: 'adm', pathMatch: 'full' }
=======

export const routes: Routes = [ 
  
>>>>>>> 9e83502d2b00e7d28a3b83c8649ad3b5fa628a86
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
<<<<<<< HEAD
=======

>>>>>>> 9e83502d2b00e7d28a3b83c8649ad3b5fa628a86
export class AppRoutingModule { }
