import { NgModule } from '@angular/core';
import { GetNgxMaskModuleConfig, SharedModule } from '../_shared/shared.module';
import { AlunoSiaComponent } from './aluno.component';
import { EstagioSiaComponent } from './estagio/estagio-sia.component';
import { EstagiosiaDocumentacaoComponent } from './estagio/documentos/estagiosia-documentacao.component';
import { AlunoSiaService } from './services/aluno-sia.service';

@NgModule({
    declarations: [
        AlunoSiaComponent,
        EstagioSiaComponent,
        EstagioSiaComponent,
        EstagiosiaDocumentacaoComponent,
        EstagiosiaDocumentacaoComponent
        // AlunoEstagioComponent,
        // InscricaoEstComponent,
        // AlunoDocsComponent
           ],
    imports: [
        SharedModule,
        GetNgxMaskModuleConfig()
    ],
    providers: [
        AlunoSiaService
    ],    
    exports: [
        AlunoSiaComponent,
        EstagioSiaComponent
        //AlunoEstagioComponent        
    ],
    entryComponents: [  
        EstagiosiaDocumentacaoComponent
        // InscricaoEstComponent,
        // AlunoDocsComponent
    ]
})
export class AlunoModule { }

