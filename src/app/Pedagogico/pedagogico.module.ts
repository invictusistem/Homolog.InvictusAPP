import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { SharedModule } from '../_shared/shared.module';
import { MaterialModule } from '../_shared/material/material.module';
import { PedagogicoComponent } from './pedagogico.component';
import { MatriculaComponent } from './Matricula/matricula.component';
import { CreateMatriculaComponent } from './Matricula/CreateModal/creatematricula.component';
import { ConfirmModalComponent } from './Matricula/confirmDialog/confirm.component';
import { ValidateFormsService } from '../_shared/models/aluno.model';
import { ConfirmarIniciarAulaModal, TurmasComponent } from './turmapedag/turmas.component';
import { TransferenciaComponent } from './Transferencia/transferencia.component';
import { NotasComponent } from './turmapedag/notas/notas.component';
import { ConcluirAulaModal, PresencaComponent } from './turmapedag/presenca/presenca.component';
import { AgendamentoComponent, SetDataModal } from './turmapedag/agendamento/agendamento.component';
import { TransferenciaExternaComponent } from './Transferencia/TransExterna/transfexterna.component';
import { TransferenciaInternaComponent } from './Transferencia/TransfInterna/transfinterna.component';
import { AlunoMatriculaComponent } from './Matricula/matricula/alunomatricula.component';
import { EstagioCadastroComponent } from './estagios/estagiocadastro/estagiocadastro.component';
import { InfosComponent } from './Matricula/informacoes/infos.component';
import { DataService } from '../_services/data.service';
import { PedagService } from './service/pedag.service';
import { ConfirmMatriculaComponent } from './Matricula/confirmmatricula/confirmamat.component';
import { PedagRelatorioComponent } from './relatorios/pedagrelatorio.component';
import { PedagAlunosComponent } from './pedag-alunos/pedag-alunos.component';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { TurmasPedagInfoComponent } from './turmasInfos/turmasinfopedag.component';
import { ReposicoesComponent } from './reposicoes/reposicoes.component';
import { CalendarioTurmaComponent } from './turmasInfos/CalendarioDaTurma/calendarioturma.component';
import { TransferenciaTurmaComponent } from './Transferencia/TransTurma/transfturma.component';
import { InfoFinancPedagComponent } from './Matricula/infoFinancas/infofinanc.component';
import { AnaliseDocsComponent } from './analise-docs/analisedocs.component';
import { AnaliseDocModalComponent } from './analise-docs/analiseDocsModal/analise-docmodal.component';
import { TurmasInfoAlunosPedagComponent } from './turmasInfos/AlunosTurma/turmasinfoalunos.component';
import { TurmasInfoNotasComponent } from './turmasInfos/TurmasInfoNotas/turmasinfonotas.component';
import { BoletimAlunoComponent } from './Matricula/BoletimAluno/boletimaluno.component';
import { EstagiosDocsComponent } from './estagiosdocs/estagiosdocs.component';
import { EstagioComponent } from './estagios/estagio.component';
import { EstagioEditComponent } from './estagios/estagio-edit/estagio-edit.component';
import { EstagioAlunosComponent } from './estagios/estagio-alunos/estagio-alunos.component';
import { InfoCadastraisComponent } from './Matricula/InfoCad/info-cadastrais.component';
import { AddAnotacaoComponent } from './Matricula/informacoes/Anotacao/add-anotacao.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { PedagogicoService } from './service/pedagogico.service';
import { AlunoAcessoComponent } from './AlunosAcesso/aluno-acesso.component';
import { DetalheComponent } from './AlunosAcesso/Detalhes/detalhe.component';
import { ObservacoesTurmaModal } from './turmasInfos/CalendarioDaTurma/AulaDetalhe/obsturmamodal.component';
import { AulaEditarModal } from './turmasInfos/CalendarioDaTurma/AulaEditar/aulaeditar.component';
registerLocaleData(localeFr, 'fr');

export const MY_DATE_FORMATS = {
    parse: {
      dateInput: 'DD-MM-YYYY',
    },
    display: {
      dateInput: 'MMM DD, YYYY',
      monthYearLabel: 'MMMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY'
    },
}; 

export function tokenGetter() {
    return localStorage.getItem("jwt");
}

const maskConfig: Partial<IConfig> = {
    validation: false,
  };

@NgModule({
    declarations: [
        PedagogicoComponent,
        MatriculaComponent,
        CreateMatriculaComponent,
        ConfirmModalComponent,
        TurmasComponent,
        TransferenciaComponent,
        NotasComponent,
        PresencaComponent,
        AgendamentoComponent,
        TransferenciaExternaComponent,
        TransferenciaInternaComponent,
        AlunoMatriculaComponent,
        ConfirmMatriculaComponent,
        EstagioComponent,
        SetDataModal,
        EstagioCadastroComponent,
        InfosComponent,
        PedagRelatorioComponent,
        PedagAlunosComponent,
        ConfirmarIniciarAulaModal,
        ConcluirAulaModal,
        TurmasPedagInfoComponent,
        ReposicoesComponent,
        CalendarioTurmaComponent,
        ObservacoesTurmaModal,
        TransferenciaTurmaComponent,
        InfoFinancPedagComponent,
        AnaliseDocsComponent,
        AnaliseDocModalComponent,
        TurmasInfoAlunosPedagComponent,
        TurmasInfoNotasComponent,
        BoletimAlunoComponent,
        EstagiosDocsComponent,
        EstagioAlunosComponent,
        EstagioEditComponent,
        InfoCadastraisComponent,
        AddAnotacaoComponent,
        AlunoAcessoComponent,
        DetalheComponent,
        AulaEditarModal
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MaterialModule,
        SharedModule,
        NgxMaskModule.forRoot(maskConfig),
        CurrencyMaskModule
    ],
    providers: [PedagogicoService, CurrencyPipe, DataService, { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    PedagService, {provide: 'ValidateForms', useClass: ValidateFormsService},
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
    exports: [
        PedagogicoComponent,
        MatriculaComponent,
        TurmasComponent,
        TransferenciaComponent,
        EstagioComponent,
        PedagRelatorioComponent,
        TurmasPedagInfoComponent,
        ReposicoesComponent,
        AnaliseDocsComponent,
        AlunoAcessoComponent
    ],
    entryComponents: [
        CreateMatriculaComponent,
        ConfirmModalComponent,
        NotasComponent,
        PresencaComponent,
        AgendamentoComponent,
        SetDataModal,
        TransferenciaExternaComponent,
        TransferenciaInternaComponent,
        AlunoMatriculaComponent,
        EstagioCadastroComponent,
        InfosComponent,
        ConfirmMatriculaComponent,
        ConfirmarIniciarAulaModal,
        PedagAlunosComponent,
        ConcluirAulaModal,
        CalendarioTurmaComponent,
        ObservacoesTurmaModal,
        TransferenciaTurmaComponent,
        InfoFinancPedagComponent,
        AnaliseDocModalComponent,
        TurmasInfoAlunosPedagComponent,
        TurmasInfoNotasComponent,
        BoletimAlunoComponent,
        EstagiosDocsComponent,
        EstagioAlunosComponent,
        EstagioEditComponent,
        InfoCadastraisComponent,
        AddAnotacaoComponent,
        DetalheComponent,
        AulaEditarModal
    ]
    
})
export class PedagogicoModule { }

