import { NgModule } from "@angular/core";
import { SharedModule } from "../_shared/shared.module";
import { AdmComponent } from "./administrativo.component";
import { BolsasComponent } from "./bolsas/bolsas.component";
import { CreateBolsaComponent } from "./bolsas/create/create-bolsa.component";
import { EditBolsaComponent } from "./bolsas/edit/edit-bolsa.component";
import { ShowSenhaComponent } from "./bolsas/show/show-senha.component";
import { ColaboradoresComponent } from "./colaboradores/colaboradores.component";
import { CreateColaboradoresComponent } from "./colaboradores/create/colaborador-create.component";
import { EditColaboradoresComponent } from "./colaboradores/edit/colaborador-edit.component";
import { PlanoPgmCreateComponent } from "./planos/create/create-plano.component";
import { PlanoPgmEditComponent } from "./planos/edit/edit-plano.component";
import { PlanoPgmComponent } from "./planos/plano.component";
import { AdmService } from "./services/adm.service";


@NgModule({
    declarations: [
        AdmComponent,
        // Planos
        PlanoPgmComponent,
        PlanoPgmEditComponent,
        PlanoPgmCreateComponent,
        // Bolsas
        BolsasComponent,
        CreateBolsaComponent,
        ShowSenhaComponent,
        EditBolsaComponent,
        // Colaboradores
        CreateColaboradoresComponent,
        EditColaboradoresComponent,
        ColaboradoresComponent

    ],
    imports: [
        SharedModule
    ],
    providers: [
        AdmService
    ],
    exports: [
        AdmComponent,
        //planos
        PlanoPgmComponent,
        // Bolsas
        BolsasComponent,
        // Colaboradores
        ColaboradoresComponent

    ],
    entryComponents: [
        // Planos
        PlanoPgmEditComponent,
        PlanoPgmCreateComponent,
        // Bolsas
        CreateBolsaComponent,
        ShowSenhaComponent,
        EditBolsaComponent,
        // Colaboradores
        CreateColaboradoresComponent,
        EditColaboradoresComponent,
    ]
})
export class AdmModule { }

