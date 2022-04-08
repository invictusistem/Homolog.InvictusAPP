import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmComponent } from './administrativo/administrativo.component';
import { BolsasComponent } from './administrativo/bolsas/bolsas.component';
import { ColaboradoresComponent } from './administrativo/colaboradores/colaboradores.component';
import { ConfiguracoesComponent } from './administrativo/configuracoes/configuracoes.component';
import { ContratoComponent } from './administrativo/contratos/contrato.component';
import { ModuloComponent } from './administrativo/modulos/modulo.component';
import { PlanoPgmComponent } from './administrativo/planos/plano.component';
import { ProdutosComponent } from './administrativo/produtos/produtos.component';
import { ProfessoresComponent } from './administrativo/professores/professores.component';
import { UnidadesComponent } from './administrativo/unidades/unidades.component';
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
      { path: 'unidades', component: UnidadesComponent, canActivate: [AuthGuard] },
      { path: 'professores', component: ProfessoresComponent, canActivate: [AuthGuard] },
      { path: 'produtos', component: ProdutosComponent, canActivate: [AuthGuard] },
      { path: 'contrato', component:ContratoComponent, canActivate: [AuthGuard] },
      { path: 'bolsas', component:BolsasComponent, canActivate: [AuthGuard] },
      { path: 'colaboradores', component: ColaboradoresComponent, canActivate: [AuthGuard] },
      { path: 'modulo', component:ModuloComponent, canActivate: [AuthGuard] },
      { path: 'config', component: ConfiguracoesComponent, canActivate: [AuthGuard] },
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
