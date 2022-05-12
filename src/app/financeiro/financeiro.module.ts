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
import { FinancConfigsComponent } from './configuracoes/financ-configs.component';
import { BancosConfigComponent } from './configuracoes/bancos/bancos-config.component';
import { CentrocustoConfigComponent } from './configuracoes/centro-custos/centrocusto-config.component';
import { FormarecebimentoConfigComponent } from './configuracoes/forma-recebimento/formarecebimento-config.component';
import { MeiopagamentoConfigComponent } from './configuracoes/meio-pagamento/meiopagamento-config.component';
import { PlanocontasConfigComponent } from './configuracoes/plano-contas/planocontas-config.component';
import { BancocreateConfigComponent } from './configuracoes/bancos/create/bancocreate-config.component';
import { CaixaEscolaComponent } from './caixa-escola/caixa-escola.component';

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
        // Caixa Escola
        CaixaEscolaComponent,
        // Fornecedores
        FornecedoresComponent,
        CreateFornecedorComponent,
        EditFornecedorComponent,
        // Configurações
        FinancConfigsComponent,
        BancosConfigComponent,
        CentrocustoConfigComponent,
        FormarecebimentoConfigComponent,
        MeiopagamentoConfigComponent,
        PlanocontasConfigComponent
        
        //BancocreateConfigComponent
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
        // Caixa Escola
        CaixaEscolaComponent,
        // Fornecedores
        FornecedoresComponent,
        // Configurações
        FinancConfigsComponent
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
        EditFornecedorComponent,
        // Configurações
        BancosConfigComponent,
        CentrocustoConfigComponent,
        FormarecebimentoConfigComponent,
        MeiopagamentoConfigComponent,
        PlanocontasConfigComponent
    ]
})

export class FinanceiroModule { }

