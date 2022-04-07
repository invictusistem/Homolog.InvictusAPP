import { NgModule } from "@angular/core";
import { IConfig, NgxMaskModule } from "ngx-mask";
import { GetNgxMaskModuleConfig, maskConfig, SharedModule } from "../_shared/shared.module";
import { AdmComponent } from "./administrativo.component";
import { BolsasComponent } from "./bolsas/bolsas.component";
import { CreateBolsaComponent } from "./bolsas/create/create-bolsa.component";
import { EditBolsaComponent } from "./bolsas/edit/edit-bolsa.component";
import { ShowSenhaComponent } from "./bolsas/show/show-senha.component";
import { ColaboradoresComponent } from "./colaboradores/colaboradores.component";
import { CreateColaboradoresComponent } from "./colaboradores/create/colaborador-create.component";
import { EditColaboradoresComponent } from "./colaboradores/edit/colaborador-edit.component";
import { CargoCreateComponent } from "./configuracoes/cargo-create/cargo-create.component";
import { CargoEditComponent } from "./configuracoes/cargo-edit/cargo-edit.component";
import { ConfiguracoesComponent } from "./configuracoes/configuracoes.component";
import { DocTemplateComponent } from "./configuracoes/doc-create/doc-create.component";
import { MateriaTemplateComponent } from "./configuracoes/materia-create/mat-create.component";
import { ContratoComponent } from "./contratos/contrato.component";
import { CreateContratoComponent } from "./contratos/create/contrato-create.component";
import { EditarContratoComponent } from "./contratos/edit/contrato-edit.component";
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
        ColaboradoresComponent,
        // Configurações
        ConfiguracoesComponent,
        MateriaTemplateComponent,
        DocTemplateComponent,
        CargoEditComponent,
        CargoCreateComponent,
        // Contratos
        ContratoComponent,
        EditarContratoComponent,
        CreateContratoComponent
    ],
    imports: [
        SharedModule,
        GetNgxMaskModuleConfig()
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
        ColaboradoresComponent,
        // Configurações
        ConfiguracoesComponent,
        // Contratos
        ContratoComponent        
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
        // Configurações
        MateriaTemplateComponent,
        DocTemplateComponent,
        CargoEditComponent,
        CargoCreateComponent,
        // Contratos
        EditarContratoComponent,
        CreateContratoComponent
    ]
})
export class AdmModule { }

