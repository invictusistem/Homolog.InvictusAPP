import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmComponent } from './administrativo/administrativo.component';
import { BolsasComponent } from './administrativo/bolsas/bolsas.component';
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
      { path: 'bolsas', component:BolsasComponent, canActivate: [AuthGuard] },
      { path: 'planopgm', component:PlanoPgmComponent, canActivate: [AuthGuard] },
    ]
  },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children: [
    ]
  },
  { path: '', redirectTo: 'adm', pathMatch: 'full' },
  { path: '**', redirectTo: 'adm', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
