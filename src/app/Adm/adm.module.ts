// Angular
import { CommonModule, CurrencyPipe, DatePipe, UpperCasePipe } from "@angular/common";
import { DEFAULT_CURRENCY_CODE, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { IConfig, NgxMaskModule } from "ngx-mask";// Components
import { MaterialModule } from "../_shared/material/material.module";
import { SharedModule } from "../_shared/shared.module";
import { AdmComponent } from "./adm.component";
import { BolsasComponent } from "./bolsascursos/bolsas.component";
import { CreateBolsaComponent } from "./bolsascursos/create/createbolsa.component";
import { EditBolsaComponent } from "./bolsascursos/edit/edit-bolsa.component";
import { ShowSenhaComponent } from "./bolsascursos/show/showsenha.component";
import { ColaboradoresComponent } from "./colaboradores/colaboradores.component";
import { CreateColaboradoresComponent } from "./colaboradores/createModal/createcolaboradores.component";
import { EditColaboradoresComponent } from "./colaboradores/editModal/editcolaboradores.component";
import { CargoEditComponent } from "./configuracoes/Cargos-edit/cargo-edit.component";
import { CargoCreateComponent } from "./configuracoes/Config-Cargos/cargo-create.component";
import { ConfiguracoesComponent } from "./configuracoes/configuracoes.component";
import { DocTemplateComponent } from "./configuracoes/Doc-create/doctemplate.component";
import { MateriaTemplateComponent } from "./configuracoes/Mat-create/mat-create.component";
import { ContratoComponent } from "./contratos/contrato.component";
import { CreateContratoComponent } from "./contratos/CreateContrato/create-contrato.component";
import { EditarContratoComponent } from "./Contratos/EditContrato/editcontrato.component";
import { MessageModalComponent } from "./messagemodal/messagemodal.component";
import { ModuloCreateComponent } from "./modulos/CreateModulo/modulo-create.component";
import { DetailPacoteComponent } from "./modulos/DetalhePacote/pacote-detalhe.component";
import { ModuloComponent } from "./modulos/modulo.component";
import { VisualizarModuloComponent } from "./modulos/VisualizarModulo/visualizar.component";
import { PDFTesteComponent } from "./PdfTeste/pdfteste.component";
import { PlanoPgmCreateComponent } from "./planos/CreatePlanoPgm/create-planopgm.component";
import { PlanoPgmEditComponent } from "./planos/EditPlanoPgm/editplano.component";
import { PlanoPgmComponent } from "./planos/planopgm.component";
import { ProdutoCreateComponent } from "./produtos/produto-create/produto-create.component";
import { ProdutoDoacaoComponent } from "./produtos/produto-doacao/produto-doacao.component";
import { ProdutoEditComponent } from "./produtos/produto-edit/produto-edit.component";
import { ProdutosComponent } from "./produtos/produtos.component";
import { CreateProfessorComponent } from "./professores/CreateModal/createprofessor.component";
import { EditProfessorComponent } from "./professores/EditModal/editprofessor.component";
import { AddDispoComponent } from "./professores/Materias/AddDisponibilidade/add-dispo.component";
import { AddMatComponent } from "./professores/Materias/AddMateria/add-mat.component";
import { EditDispoComponent } from "./professores/Materias/EditDisponibilidade/edit-dispo.component";
import { ProfMateriasComponent } from "./professores/Materias/prof-materias.component";
import { ProfCalendarioComponent } from "./professores/ProfCalendario/prof-calendario.component";
import { ProfessoresComponent } from "./professores/professores.component";
import { ProfRelatorioComponent } from "./professores/Relatorio/prof-relatorio.component";
import { AdmRelatorioComponent } from "./relatorios/relatorio.component";
import { AdmService } from "./services/adm.services";
import { TestandoComponent } from "./testando/testando.component";
import { TesteModalComponent } from "./testes/modalteste/testemodal.component";
import { TestesComponent } from "./testes/teste.component";
import { Servico } from "./testes/testeexterno";
import { AdmTurmasComponent } from "./turmas/admturmas.component";
import { CalendarioModalComponent } from "./turmas/Calendario/calendario.component";
import { ConfirmarIniciarTurmaModal } from "./turmas/confirm/confirmariniciar.component";
import { CreateCursoComponent } from "./turmas/createmodal/createcurso.component";
import { EditCursoComponent } from "./turmas/editmodal/editcurso.component";
import { AddPMateriaModalComponent } from "./turmas/modaladdmateria/addmateria.component";
import { AddProfessorModalComponent } from "./turmas/modaladdprof/addprof.component";
import { CreateUnidadeComponent, MyPipe } from "./unidades/CreateModal/createunidade.component";
import { CreateSalaComponent } from "./unidades/CreateSalaModal/createsala.component";
import { SalaEditarComponent } from "./unidades/EditarSala/sala-editar.component";
import { EditUnidadeComponent } from "./unidades/EditModal/editunidade.component";
import { UnidadesComponent } from "./unidades/unidades.component";
import { CreateUserComponent } from "./usuarios/CreateModal/createuser.component";
import { EditAcessoComponent } from "./usuarios/EditAcesso/editacesso.component";
import { EditUserComponent } from "./usuarios/EditModal/edituser.component";
import { UsuarioComponent } from "./usuarios/usuario.component";


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
        AddDispoComponent,
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
        CreateProfessorComponent,
        EditProfessorComponent,
        MyPipe,
        SalaEditarComponent,
        ProdutoDoacaoComponent,
        ProfMateriasComponent,
        DocTemplateComponent,
        MateriaTemplateComponent,
        AddMatComponent,
        EditDispoComponent,
        PDFTesteComponent,
        EditAcessoComponent,
        BolsasComponent,
        CreateBolsaComponent,
        ShowSenhaComponent,
        VisualizarModuloComponent,
        EditBolsaComponent,
        ProfCalendarioComponent,
        ProfRelatorioComponent,
        CargoEditComponent
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
    providers: [AdmService, CurrencyPipe, UpperCasePipe, DatePipe,
        { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
        { provide: 'IServicoToken', useClass: Servico }
    ],
    exports: [
        AdmComponent,
        UsuarioComponent,
        UnidadesComponent,
        ColaboradoresComponent,
        ProfessoresComponent,
        ProdutosComponent,
        AdmTurmasComponent,
        TestesComponent,
        TestandoComponent,
        ConfiguracoesComponent,
        ModuloComponent,
        PlanoPgmComponent,
        ContratoComponent,
        PDFTesteComponent,
        BolsasComponent
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
        PlanoPgmEditComponent,
        CreateProfessorComponent,
        EditProfessorComponent,
        SalaEditarComponent,
        ProdutoDoacaoComponent,
        ProfMateriasComponent,
        DocTemplateComponent,
        MateriaTemplateComponent,
        AddDispoComponent,
        AddMatComponent,
        EditDispoComponent,
        EditAcessoComponent,
        CreateBolsaComponent,
        ShowSenhaComponent,
        VisualizarModuloComponent,
        EditBolsaComponent,
        ProfCalendarioComponent,
        ProfRelatorioComponent,
        CargoEditComponent
        //AddSalaComponent
    ]
})
export class AdmModule { }

