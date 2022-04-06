import { CurrencyPipe, DatePipe, UpperCasePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../_shared/shared.module";
import { AdmComponent } from "./administrativo.component";
import { BolsasComponent } from "./bolsas/bolsas.component";
import { CreateBolsaComponent } from "./bolsas/create/create-bolsa.component";
import { EditBolsaComponent } from "./bolsas/edit/edit-bolsa.component";
import { ShowSenhaComponent } from "./bolsas/show/show-senha.component";
import { PlanoPgmComponent } from "./planos/plano.component";
import { AdmService } from "./services/adm.service";


@NgModule({
    declarations: [
        AdmComponent,
        // Plano
        PlanoPgmComponent,        
        BolsasComponent,
       CreateBolsaComponent,
        ShowSenhaComponent,
        EditBolsaComponent,
    ],
    imports: [
        SharedModule
    ],
    providers: [
        AdmService,
        CurrencyPipe,
        UpperCasePipe,
        DatePipe
    ],
    exports: [
        AdmComponent,
        //plano
        PlanoPgmComponent,
        // Bolsas
        BolsasComponent

    ],
    entryComponents: [
        // Bolsas
        CreateBolsaComponent,
        ShowSenhaComponent,
        EditBolsaComponent
    ]
})
export class AdmModule { }

