import { NgModule } from '@angular/core';
import { GetNgxMaskModuleConfig, SharedModule } from '../_shared/shared.module';
import { AlunoFinancComponent } from './alunos/alunos-financeiro.component';
import { InfoFinancComponent } from './alunos/infos/aluno-informacoes.component';
import { EditFinancComponent } from './alunos/infos/edit/financeiro-edit.component';
import { ReceberComponent } from './alunos/infos/receber/receber.component';
import { FinanceiroComponent } from './financeiro.component';
import { FinanceiroService } from './services/financ.service';

@NgModule({
    declarations: [
        FinanceiroComponent,
        // Alunos
        AlunoFinancComponent,
        // ConfirmarParcelamento,
         InfoFinancComponent,
         ReceberComponent,
         EditFinancComponent
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
        AlunoFinancComponent
    ],
    entryComponents: [
        // Alunos
        // ConfirmarParcelamento,
        InfoFinancComponent,
        ReceberComponent,
        EditFinancComponent
    ]
})

export class FinanceiroModule { }

