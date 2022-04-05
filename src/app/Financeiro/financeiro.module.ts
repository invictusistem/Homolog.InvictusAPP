import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import { CustomersComponent } from './customers/customers.component';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from "@auth0/angular-jwt";

import { CommonModule, CurrencyPipe, DatePipe, registerLocaleData, UpperCasePipe } from '@angular/common';
//import { HomeComponent } from './home.component';
import { SharedModule } from '../_shared/shared.module';

import { MaterialModule } from '../_shared/material/material.module';
import { ValidateFormsService } from '../_shared/models/aluno.model';
import { FinanceiroComponent } from './financeiro.component';
import { AlunoFinancComponent } from './alunos/alunofinanc.component';
import { BalancoComponent } from './balanco/balanco.component';
import { ConferenciaComponent } from './balanco/conferenca/conferencia.component';
import { InfoFinancComponent } from './alunos/infoFinanc/infofinanc.component';
import { FinCaixaComponent } from './caixa/fincaixa.component';
import { FornecedoresComponent } from './fornecedores/fornecedores.component';
import { VendaCaixaComponent } from './caixa/venda/vendacaixa.component';
import { FinRelatorioComponent } from './relatorio/fin-relatorio.component';
import { VendaPesquisaComponent } from './caixa/venda/venda-pesquisa.component.ts/venda-pesquisa.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { EditFinancComponent } from './alunos/infoFinanc/EditFinanc/edit-financ.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CreateFornecedorComponent } from './fornecedores/createfornecedor/createfornecedor.component';
import { EditFornecedorComponent } from './fornecedores/editfornecedor/editfornecedor.component';
import { Servico } from '../Adm/_TESTES/testeexterno';
import { UnidadeBalancoComponent } from './unidadebalanco/unidadebalanco.component';
import { FornecedorVendaComponent } from './fornecedores/cadastrovenda/fornecedorcadvenda.component';
import { FornecedorCompraComponent } from './fornecedores/cadastrocompra/fornecedorcadcompra.component';
import { ReparcelamentoComponent } from './alunos/Reparcelamento/reparcelamento.component';
import { ConfirmarParcelamento } from './alunos/Reparcelamento/Confirmar/reapconfirmar.component';
import { CaixaDiarioComponent } from './caixa/caixadiario/caixadiario.component';
import { VendaUnidadeComponent } from './caixa/vendaUnidade/vendaunidade.component';
import localePt from '@angular/common/locales/pt';
import { ReceberComponent } from './alunos/infoFinanc/Receber/receber.component';
import { FinanceiroService } from './models/financ.service';
// import { CustomersComponent } from '../customers/customers.component';
registerLocaleData(localePt)
export function tokenGetter() {
    return localStorage.getItem("jwt");
}

const maskConfig: Partial<IConfig> = {
    validation: false,
};

@NgModule({
    declarations: [
        FinanceiroComponent,
        AlunoFinancComponent,
        BalancoComponent,
        ConferenciaComponent,
        FinCaixaComponent,
        InfoFinancComponent,
        FornecedoresComponent,
        CreateFornecedorComponent,
        EditFornecedorComponent,
        VendaCaixaComponent,
        FinRelatorioComponent,
        VendaPesquisaComponent,
        EditFinancComponent,
        UnidadeBalancoComponent,
        FornecedorVendaComponent,
        FornecedorCompraComponent,
        ReparcelamentoComponent,
        ConfirmarParcelamento,
        CaixaDiarioComponent,
        VendaUnidadeComponent,
        ReceberComponent
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
    //     providers: [AuthGuard],
    providers: [FinanceiroService, CurrencyPipe, UpperCasePipe, DatePipe,
        { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
        // {provide: 'ValidateForms', useClass: ValidateFormsService},
        // { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
        { provide: 'IServicoToken', useClass: Servico }
    ],
    //bootstrap: [AppComponent]
    exports: [
        FinanceiroComponent,
        AlunoFinancComponent,
        BalancoComponent,
        FinCaixaComponent,
        FornecedoresComponent,
        UnidadeBalancoComponent
        // MatriculaComponent,
        // TurmasComponent,
        // TransferenciaComponent,
        // ConfigComponent
    ],
    entryComponents: [
        ConferenciaComponent,
        InfoFinancComponent,
        CreateFornecedorComponent,
        VendaCaixaComponent,
        FinRelatorioComponent,
        VendaPesquisaComponent,
        EditFornecedorComponent,
        EditFinancComponent,
        FornecedorVendaComponent,
        FornecedorCompraComponent,
        ReparcelamentoComponent,
        ConfirmarParcelamento,
        CaixaDiarioComponent,
        VendaUnidadeComponent,
        ReceberComponent
        // CreateMatriculaComponent,
        // ConfirmModalComponent,
        // NotasComponent,
        // PresencaComponent,
        // AgendamentoComponent,
        // SetDataModal,
        // TransferenciaExternaComponent,
        // TransferenciaInternaComponent,
        // AlunoMatriculaComponent,
        // EstagioCadastroComponent,
        // InfosComponent,
        // ConfirmMatriculaComponent
        // FormFieldCustomControlExample, 
        //MyTelInput,
        //   DialogOverviewExampleDialog,
        //   EditTemplateModel
    ]

})
export class FinanceiroModule { }

