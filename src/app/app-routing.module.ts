import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmComponent } from './Adm/adm.component';
import { ProdutosComponent } from './Adm/Produtos/produtos.component';
import { ProfessoresComponent } from './Adm/Professores/professores.component';
import { UnidadesComponent } from './Adm/Unidades/unidades.component';
import { PedagogicoComponent } from './Pedagogico/pedagogico.component';
import { UsuarioComponent } from './Adm/Usuarios/usuario.component';
import { ColaboradoresComponent } from './Adm/Colaboradores/colaboradores.component';
import { ComercialComponent } from './Comercial/comercial.component';
import { UserComponent } from './_Auth/user/user.component';
import { LoginComponent } from './_Auth/user/login/login.component';
import { AuthGuard } from './_Auth/auth.guard';
import { MatriculaComponent } from './Pedagogico/Matricula/matricula.component';
import { TestesComponent } from './Adm/_TESTES/teste.component';
import { TurmasComponent } from './Pedagogico/turmapedag/turmas.component';
import { TransferenciaComponent } from './Pedagogico/Transferencia/transferencia.component';
import { TestandoComponent } from './Adm/testando/testando.component';
import { AdmTurmasComponent } from './Adm/turmas/admturmas.component';
import { AlunoComponent } from './Aluno/aluno.component';
import { AlunoEstagioComponent } from './Aluno/alunoestagios/alunoest.component';
import { ConfiguracoesComponent } from './Adm/configuracoes/configuracoes.component';
import { FinanceiroComponent } from './Financeiro/financeiro.component';
import { AlunoFinancComponent } from './Financeiro/alunos/alunofinanc.component';
import { BalancoComponent } from './Financeiro/balanco/balanco.component';
import { NewMatriculaComponent } from './NewMatricula/newmatricula.component';
import { FinCaixaComponent } from './Financeiro/caixa/fincaixa.component';
import { FornecedoresComponent } from './Financeiro/fornecedores/fornecedores.component';
import { FinRelatorioComponent } from './Financeiro/relatorio/fin-relatorio.component';
import { PedagAlunosComponent } from './Pedagogico/pedag-alunos/pedag-alunos.component';
import { ModuloComponent } from './Adm/Modulos/modulo.component';
import { UnidadeBalancoComponent } from './Financeiro/unidadebalanco/unidadebalanco.component';
import { PlanoPgmComponent } from './Adm/PlanoPgm/planopgm.component';
import { ContratoComponent } from './Adm/Contratos/contrato.component';
import { PedagRelatorioComponent } from './Pedagogico/relatorios/pedagrelatorio.component';
import { AlunoDocsComponent } from './Aluno/alunodocs/alunodocs.component';
import { TurmasPedagInfoComponent } from './Pedagogico/turmasInfos/turmasinfopedag.component';
import { ReposicoesComponent } from './Pedagogico/reposicoes/reposicoes.component';
import { NovaMatriculaComponent } from './NewMatricula/NovaMatricula/novamatricula.component';
import { AnaliseDocsComponent } from './Pedagogico/analise-docs/analisedocs.component';
import { GeralComponent } from './Geral/geral.component';
import { EstagiosDocsComponent } from './Pedagogico/estagiosdocs/estagiosdocs.component';
import { EstagioComponent } from './Pedagogico/estagios/estagio.component';
import { AddLeadComponent } from './Comercial/AddLead/addlead.component';
import { LeadsComponent } from './Comercial/Leads/leads.component';

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
      { path: 'usuarios', component: UsuarioComponent, canActivate: [AuthGuard] },
      { path: 'unidades', component: UnidadesComponent, canActivate: [AuthGuard] },
      { path: 'professores', component: ProfessoresComponent, canActivate: [AuthGuard] },
      { path: 'produtos', component: ProdutosComponent, canActivate: [AuthGuard] },
      { path: 'admcursos', component: AdmTurmasComponent, canActivate: [AuthGuard] },      
      { path: 'colaboradores', component: ColaboradoresComponent, canActivate: [AuthGuard] },
      { path: 'teste', component: TestesComponent, canActivate: [AuthGuard] },
      { path: 'testando', component: TestandoComponent, canActivate: [AuthGuard] },
      { path: 'config', component: ConfiguracoesComponent, canActivate: [AuthGuard] },
      { path: 'modulo', component:ModuloComponent, canActivate: [AuthGuard] },
      { path: 'contrato', component:ContratoComponent, canActivate: [AuthGuard] },
      { path: 'planopgm', component:PlanoPgmComponent, canActivate: [AuthGuard] }
    ]
  },
  {
    path: 'newmat', component: NewMatriculaComponent, canActivate: [AuthGuard],
    children: [
      { path: 'novamatricula', component: NovaMatriculaComponent, canActivate: [AuthGuard] }
      //{ path: 'transf', component: TransferenciaComponent, canActivate: [AuthGuard] },
      //{ path: 'turmas', component: TurmasComponent, canActivate: [AuthGuard] },
      //{ path: 'estagio', component: EstagioComponent, canActivate: [AuthGuard] },
      //{ path: 'config', component: ConfigComponent, canActivate: [AuthGuard] }
    ]
  },  
  {
    path: 'pedag', component: PedagogicoComponent, canActivate: [AuthGuard],
    children: [
      { path: 'matricula', component: MatriculaComponent, canActivate: [AuthGuard] },
      { path: 'pedagalunos', component: PedagAlunosComponent, canActivate: [AuthGuard] },
      { path: 'transf', component: TransferenciaComponent, canActivate: [AuthGuard] },
      { path: 'turmas', component: TurmasComponent, canActivate: [AuthGuard] },
      //{ path: 'estagio', component: EstagioComponent, canActivate: [AuthGuard] },
      { path: 'pedagrel', component: PedagRelatorioComponent, canActivate: [AuthGuard] },
      { path: 'config', component: EstagioComponent, canActivate: [AuthGuard] },
      { path: 'turmasinfo', component:  TurmasPedagInfoComponent, canActivate: [AuthGuard] },
      { path: 'reposicoes', component:  ReposicoesComponent, canActivate: [AuthGuard] },
      { path: 'analisedocs', component:  AnaliseDocsComponent, canActivate: [AuthGuard] },
      { path: 'estagiosdoc', component:  EstagiosDocsComponent, canActivate: [AuthGuard] },
    ]
  },
  {
    path: 'aluno', component: AlunoComponent, canActivate: [AuthGuard],
    children: [
      { path: 'estagio', component: AlunoEstagioComponent, canActivate: [AuthGuard] },
      { path: 'alunodocs', component: AlunoDocsComponent, canActivate: [AuthGuard] }
    ]
  },
  {
    path: 'financeiro', component: FinanceiroComponent, canActivate: [AuthGuard],
    children: [
      { path: 'alunofin', component: AlunoFinancComponent, canActivate: [AuthGuard] },
      { path: 'balanco', component: BalancoComponent, canActivate: [AuthGuard] },
      { path: 'unidadebalanco', component: UnidadeBalancoComponent, canActivate: [AuthGuard] },
      { path: 'fincaixa', component: FinCaixaComponent, canActivate: [AuthGuard] },
      { path: 'fornecedor', component: FornecedoresComponent, canActivate: [AuthGuard] },
      { path: 'relatorio', component: FinRelatorioComponent, canActivate: [AuthGuard] }
    ]
  },
  {
    path: 'geral', component: GeralComponent, canActivate: [AuthGuard],
    children: [
      // { path: 'alunofin', component: AlunoFinancComponent, canActivate: [AuthGuard] },
      // { path: 'balanco', component: BalancoComponent, canActivate: [AuthGuard] },
      // { path: 'unidadebalanco', component: UnidadeBalancoComponent, canActivate: [AuthGuard] },
      // { path: 'fincaixa', component: FinCaixaComponent, canActivate: [AuthGuard] },
      // { path: 'fornecedor', component: FornecedoresComponent, canActivate: [AuthGuard] },
      // { path: 'relatorio', component: FinRelatorioComponent, canActivate: [AuthGuard] }
    ]
  },
  

  { path: 'comercial', component: ComercialComponent, canActivate: [AuthGuard], 
  children: [
    { path: 'addlead', component: AddLeadComponent, canActivate: [AuthGuard] },
    { path: 'leads', component: LeadsComponent, canActivate: [AuthGuard] }
    // { path: 'unidadebalanco', component: UnidadeBalancoComponent, canActivate: [AuthGuard] },
    // { path: 'fincaixa', component: FinCaixaComponent, canActivate: [AuthGuard] },
    // { path: 'fornecedor', component: FornecedoresComponent, canActivate: [AuthGuard] },
    // { path: 'relatorio', component: FinRelatorioComponent, canActivate: [AuthGuard] }
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

/*UnidadesComponent,
        ProfessoresComponent,
        ProdutosComponent,
        CursosComponent,*/
