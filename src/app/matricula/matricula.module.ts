import { NgModule } from "@angular/core";
import { GetNgxMaskModuleConfig, SharedModule } from "../_shared/shared.module";
import { NovaMatriculaCreateComponent } from "./cadastro/create/matricula-criar.component";
import { MatriculaCadastroComponent } from "./cadastro/matricula-cadastro.component";
import { RelatorioMatriculaComponent } from "./cadastro/relatorio/matricula-relatorio.component";
import { MatriculaComponent } from "./matricula.component";
import { MatriculaService } from "./services/matricula.service";

@NgModule({
    declarations: [
        MatriculaComponent,
        MatriculaCadastroComponent,
        NovaMatriculaCreateComponent,
        RelatorioMatriculaComponent
    ],
    imports: [
        SharedModule,
        GetNgxMaskModuleConfig()
    ],
    //providers: [AuthGuard],
    providers: [
        MatriculaService
    ],
    exports: [
        MatriculaComponent,
        MatriculaCadastroComponent
    ],
    entryComponents: [
        NovaMatriculaCreateComponent,
        RelatorioMatriculaComponent
    ]
})
export class MatriculaModule { }