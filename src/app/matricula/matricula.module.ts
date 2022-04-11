import { NgModule } from "@angular/core";
import { GetNgxMaskModuleConfig, SharedModule } from "../_shared/shared.module";
import { MatriculaCadastroComponent } from "./cadastro/matricula-cadastro.component";
import { MatriculaComponent } from "./matricula.component";
import { MatriculaService } from "./services/matricula.service";

@NgModule({
    declarations: [
        MatriculaComponent,
        MatriculaCadastroComponent
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
    ]
})
export class MatriculaModule { }