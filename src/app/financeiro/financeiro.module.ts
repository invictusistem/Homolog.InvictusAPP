import { NgModule } from '@angular/core';
import { GetNgxMaskModuleConfig, SharedModule } from '../_shared/shared.module';
import { AlunoFinancComponent } from './alunos/alunos-financeiro.component';
import { InfoFinancComponent } from './alunos/infos/aluno-informacoes.component';
import { EditFinancComponent } from './alunos/infos/edit/financeiro-edit.component';
import { ReceberComponent } from './alunos/infos/receber/receber.component';
import { ConfirmarParcelamento } from './alunos/reparcelamento/confirmar/reparcelamento-confirmar.component';
import { ReparcelamentoComponent } from './alunos/reparcelamento/reparcelamento.component';
import { FinCaixaComponent } from './caixa/fincaixa.component';
import { FinanceiroComponent } from './financeiro.component';
import { CreateFornecedorComponent } from './fornecedores/create/fornecedor-create.component';
import { EditFornecedorComponent } from './fornecedores/edit/fornecedor-edit.component';
import { FornecedoresComponent } from './fornecedores/fornecedores.component';
import { FinanceiroService } from './services/financ.service';

@NgModule({
    declarations: [
        FinanceiroComponent,
        // Alunos
        AlunoFinancComponent,
        ReparcelamentoComponent,
        ConfirmarParcelamento,
        // ConfirmarParcelamento,
         InfoFinancComponent,
         ReceberComponent,
         EditFinancComponent,
         // Caixa
         FinCaixaComponent,
         // Fornecedores
         FornecedoresComponent,
         CreateFornecedorComponent,
         EditFornecedorComponent
    ],
    imports: [
        SharedModule,
        GetNgxMaskModuleConfig()
    ],
    providers: [
        FinanceiroService
    ],
    exports: [
        FinanceiroComponent,
        // Alunos
        AlunoFinancComponent,
        //Caixa
        FinCaixaComponent,
        // Fornecedores
        FornecedoresComponent
    ],
    entryComponents: [
        // Alunos
        ConfirmarParcelamento,
        ReparcelamentoComponent,
        InfoFinancComponent,
        ReceberComponent,
        EditFinancComponent,
        // Fornecedores
        CreateFornecedorComponent,
        EditFornecedorComponent
    ]
})

export class FinanceiroModule { }

