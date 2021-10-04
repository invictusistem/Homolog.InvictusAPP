import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import { CustomersComponent } from './customers/customers.component';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule, CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
//import { HomeComponent } from './home.component';
import { SharedModule } from '../_shared/shared.module';

import { MaterialModule } from '../_shared/material/material.module';
import { AdmComponent } from './adm.component';
import { UsuarioComponent } from './Usuarios/usuario.component';

import { CreateUserComponent } from './Usuarios/CreateModal/createuser.component';
import { EditUserComponent } from './Usuarios/EditModal/edituser.component';
import { ProfessoresComponent } from './Professores/professores.component';
import { ProdutosComponent } from './Produtos/produtos.component';

import { UnidadesComponent } from './Unidades/unidades.component';
import { EditUnidadeComponent } from './Unidades/EditModal/editunidade.component';
import { CreateUnidadeComponent } from './Unidades/CreateModal/createunidade.component';
import { MyPipe } from './Unidades/CreateModal/createunidade.component';
import { ColaboradoresComponent } from './Colaboradores/colaboradores.component';
import { EditColaboradoresComponent } from './Colaboradores/EditModal/editcolaboradores.component';
import { CreateColaboradoresComponent } from './Colaboradores/CreateModal/createcolaboradores.component';
import { CreateCursoComponent } from './turmas/CreateModal/createcurso.component';
import { EditCursoComponent } from './turmas/EditModal/editcurso.component';

import { TestesComponent } from './_TESTES/teste.component';
import { TesteModalComponent } from './_TESTES/ModalTeste/testemodal.component';
import { AddProfessorModalComponent } from './turmas/ModalAddProf/addprof.component';
import { CalendarioModalComponent } from './turmas/Calendario/calendario.component';
import { CalendarioComponent } from './Calendario/calendario.component';
import { AddPMateriaModalComponent } from './turmas/ModalAddMateria/addmateria.component';
//import { ConfirmarIniciarTurmaModal } from './turmas/turmasAdm.component';
import { TestandoComponent } from './testando/testando.component';
import { AdmTurmasComponent } from './turmas/admturmas.component';
import { ConfirmarIniciarTurmaModal } from './turmas/confirmturmamodal/confirmariniciar.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MessageModalComponent } from './messageModal/messagemodal.component';
import { Servico } from './_TESTES/testeexterno';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { AdmRelatorioComponent } from './relatorios/relatorio.component';
import { ProdutoCreateComponent } from './Produtos/produto-create/produto-create.component';
import { ProdutoEditComponent } from './Produtos/produto-edit/produto-edit.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CreateSalaComponent } from './Unidades/CreateSalaModal/createsala.component';
import { ModuloComponent } from './Modulos/modulo.component';
import { ModuloCreateComponent } from './Modulos/CreateModulo/modulo-create.component';

import { PlanoPgmCreateComponent } from './PlanoPgm/CreatePlanoPgm/create-planopgm.component';
import { PlanoPgmComponent } from './PlanoPgm/planopgm.component';
import { ContratoComponent } from './Contratos/contrato.component';
import { CreateContratoComponent } from './Contratos/CreateContrato/create-contrato.component';
import { DetailPacoteComponent } from './Modulos/DetalhePacote/pacote-detalhe.component';
import { EditarContratoComponent } from './Contratos/EditContrato/editcontrato.component';
import { CargoCreateComponent } from './configuracoes/Config-Cargos/cargo-create.component';
import { PlanoPgmEditComponent } from './PlanoPgm/EditPlanoPgm/editplano.component';

const maskConfig: Partial<IConfig> = {
    validation: false,
  };
  
export function tokenGetter() {
    return localStorage.getItem("jwt");
}

@NgModule({
    declarations: [
        AdmComponent,
        UsuarioComponent,
        MessageModalComponent,
        CreateUserComponent,
        EditUserComponent,
        UnidadesComponent,
        CreateUnidadeComponent,
        EditUnidadeComponent,
        ProfessoresComponent,
        ProdutosComponent,
        AdmTurmasComponent,
        CreateCursoComponent,
        EditCursoComponent,
        CreateColaboradoresComponent,
        ConfiguracoesComponent,
        EditColaboradoresComponent,
        ColaboradoresComponent,
        CalendarioComponent,
        TestesComponent,
        TesteModalComponent,
        AddProfessorModalComponent,
        CalendarioModalComponent,
        ConfirmarIniciarTurmaModal,
        AddPMateriaModalComponent,
        TestandoComponent,
        AdmRelatorioComponent,
        ProdutoCreateComponent,
        ProdutoEditComponent,
        CreateSalaComponent,
        ModuloComponent,
        //AddSalaComponent,
        ModuloCreateComponent,
       // PacoteCreateComponent,
        PlanoPgmCreateComponent,
        PlanoPgmComponent,
        ContratoComponent,
        CreateContratoComponent,
        DetailPacoteComponent,
        EditarContratoComponent,
        CargoCreateComponent,
        PlanoPgmEditComponent,
        MyPipe
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        SharedModule,
        MaterialModule,
        AngularEditorModule,
        NgxMaskModule.forRoot(maskConfig),
        CurrencyMaskModule
    ],
    //providers: [AuthGuard],
    providers: [CurrencyPipe, UpperCasePipe,DatePipe, { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    {provide: 'IServicoToken', useClass: Servico}
    ],
    exports: [
        AdmComponent,
        UsuarioComponent,
        UnidadesComponent,
        ColaboradoresComponent,
        CalendarioComponent,
        ProfessoresComponent,
        ProdutosComponent,
        AdmTurmasComponent,
        TestesComponent,
        TestandoComponent,
        ConfiguracoesComponent,
        ModuloComponent,
        PlanoPgmComponent,
        ContratoComponent
    ],
    entryComponents: [
        CreateUserComponent,
        MessageModalComponent,
        EditUserComponent,
        CreateUnidadeComponent,
        EditUnidadeComponent,
        CreateColaboradoresComponent,
        EditColaboradoresComponent,
        TesteModalComponent,
        CreateCursoComponent,
        EditCursoComponent,
        AddProfessorModalComponent,
        CalendarioModalComponent,
        ConfirmarIniciarTurmaModal,
        AddPMateriaModalComponent,
        AdmRelatorioComponent,
        ProdutoCreateComponent,
        ProdutoEditComponent,
        CreateSalaComponent,
        ModuloCreateComponent,
        //PacoteCreateComponent,
        PlanoPgmCreateComponent,
        CreateContratoComponent,
        DetailPacoteComponent,
        EditarContratoComponent,
        CargoCreateComponent,
        PlanoPgmEditComponent
        //AddSalaComponent
    ]
})
export class AdmModule { }

