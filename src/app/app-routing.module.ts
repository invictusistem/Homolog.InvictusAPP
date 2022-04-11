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
import { AdmTurmasComponent } from './administrativo/turmas/administrativo-turma.component';
import { UnidadesComponent } from './administrativo/unidades/unidades.component';
import { UsuarioComponent } from './administrativo/usuarios/usuario.component';
import { AlunoFinancComponent } from './financeiro/alunos/alunos-financeiro.component';
import { FinanceiroComponent } from './financeiro/financeiro.component';
import { MatriculaCadastroComponent } from './matricula/cadastro/matricula-cadastro.component';
import { MatriculaComponent } from './matricula/matricula.component';
import { AlunoAcessoComponent } from './pedagogico/alunos-acesso/aluno-acesso.component';
import { AlunoComponent } from './pedagogico/alunos/aluno.component';
import { PedagogicoComponent } from './pedagogico/pedagogico.component';
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
      { path: 'admcursos', component: AdmTurmasComponent, canActivate: [AuthGuard] }, 
      { path: 'usuarios', component: UsuarioComponent, canActivate: [AuthGuard] },
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
    path: 'mat', component: MatriculaComponent, canActivate: [AuthGuard],
    children: [
      { path: 'matricula', component: MatriculaCadastroComponent, canActivate: [AuthGuard] }
    ]
  }, 
  {
    path: 'pedag', component: PedagogicoComponent, canActivate: [AuthGuard],
    children: [
      { path: 'aluno', component: AlunoComponent, canActivate: [AuthGuard] },
      // { path: 'pedagalunos', component: PedagAlunosComponent, canActivate: [AuthGuard] },
      // { path: 'transf', component: TransferenciaComponent, canActivate: [AuthGuard] },
      // { path: 'turmas', component: TurmasComponent, canActivate: [AuthGuard] },
      // { path: 'pedagrel', component: PedagRelatorioComponent, canActivate: [AuthGuard] },
      // { path: 'config', component: EstagioComponent, canActivate: [AuthGuard] },
      // { path: 'turmasinfo', component:  TurmasPedagInfoComponent, canActivate: [AuthGuard] },
      // { path: 'reposicoes', component:  ReposicoesComponent, canActivate: [AuthGuard] },
      // { path: 'analisedocs', component:  AnaliseDocsComponent, canActivate: [AuthGuard] },
      // { path: 'estagiosdoc', component:  EstagiosDocsComponent, canActivate: [AuthGuard] },
      { path: 'alunoacesso', component:  AlunoAcessoComponent, canActivate: [AuthGuard] }
    ]
  },
  {
    path: 'financeiro', component: FinanceiroComponent, canActivate: [AuthGuard],
    children: [
      { path: 'alunofin', component: AlunoFinancComponent, canActivate: [AuthGuard] }
      // { path: 'balanco', component: BalancoComponent, canActivate: [AuthGuard] },
      // { path: 'unidadebalanco', component: UnidadeBalancoComponent, canActivate: [AuthGuard] },
      // { path: 'fincaixa', component: FinCaixaComponent, canActivate: [AuthGuard] },
      // { path: 'fornecedor', component: FornecedoresComponent, canActivate: [AuthGuard] },
      // { path: 'relatorio', component: FinRelatorioComponent, canActivate: [AuthGuard] }
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
