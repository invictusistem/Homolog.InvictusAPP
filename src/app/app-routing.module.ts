import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmComponent } from './adm/adm.component';
import { UserComponent } from './_Auth/user/user.component';
import { LoginComponent } from './_Auth/user/login/login.component';
import { AuthGuard } from './_Auth/auth.guard';
import { UnidadesComponent } from './Adm/unidades/unidades.component';
import { HomeComponent } from './_shared/home/home.component';

export const routes: Routes = [
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent }
    ]
  },
  {
    path: 'adm', component: AdmComponent, canActivate: [AuthGuard],
    children: [    
      { path: 'unidades', component: UnidadesComponent, canActivate: [AuthGuard] }
      
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
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})



export class AppRoutingModule { }
