import { NgModule } from "@angular/core";
import { GetNgxMaskModuleConfig, SharedModule } from "../_shared/shared.module";
import { AlunoAcessoComponent } from "./alunos-acesso/aluno-acesso.component";
import { DetalheComponent } from "./alunos-acesso/edit/detalhe.component";
import { AlunoComponent } from "./alunos/aluno.component";
import { BoletimAlunoComponent } from "./alunos/boletim/boletim.component";
import { AlunoEditComponent } from "./alunos/edit/aluno-edit.component";
import { InfoFinancPedagComponent } from "./alunos/financeiro-informacoes/infofinanc.component";
import { AddAnotacaoComponent } from "./alunos/informacoes-matricula/anotacoes/add-anotacao.component";
import { CertificadoComponent } from "./alunos/informacoes-matricula/certificado/certificado.component";
import { InfosComponent } from "./alunos/informacoes-matricula/infos.component";
import { AlunoMatriculaComponent } from "./alunos/matricular/aluno-matricula.component";
import { ConfirmMatriculaComponent } from "./alunos/matricular/confirmar/confirmamat.component";
import { PedagogicoComponent } from "./pedagogico.component";
import { PedagogicoService } from "./services/pedagogico.service";

@NgModule({
    declarations: [
        PedagogicoComponent,
        // Alunos
        AlunoComponent,
        AlunoEditComponent,
        AlunoMatriculaComponent,
        ConfirmMatriculaComponent,
        InfoFinancPedagComponent,
        InfosComponent,
        CertificadoComponent,
        AddAnotacaoComponent,
        BoletimAlunoComponent,
        // Alunos Acesso
        AlunoAcessoComponent,
        DetalheComponent

    ],
    imports: [
        SharedModule,
        GetNgxMaskModuleConfig()
    ],
    providers: [
        PedagogicoService
    ],
    exports: [
        PedagogicoComponent,
        // Alunos
        AlunoComponent,
        // Alunos Acesso
        AlunoAcessoComponent
    ],
    entryComponents: [
        // Alunos        
        AlunoEditComponent,
        AlunoMatriculaComponent,
        ConfirmMatriculaComponent,
        InfoFinancPedagComponent,
        InfosComponent,
        CertificadoComponent,
        AddAnotacaoComponent,
        BoletimAlunoComponent,
        // Alunos Acesso
        DetalheComponent
    ]
    
})
export class PedagogicoModule { }

