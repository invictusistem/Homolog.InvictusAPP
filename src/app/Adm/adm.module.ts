// Angular
import { CommonModule, CurrencyPipe, DatePipe, UpperCasePipe } from "@angular/common";
import { DEFAULT_CURRENCY_CODE, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { IConfig, NgxMaskModule } from "ngx-mask";// Components
import { MaterialModule } from "../_shared/material/material.module";
import { SharedModule } from "../_shared/shared.module";
import { AdmComponent } from "./adm.component";
import { AdmService } from "./services/adm-service.service";

import { UnidadesComponent } from "./unidades/unidades.component";

const maskConfig: Partial<IConfig> = {
    validation: false,
};

export function tokenGetter() {
    return localStorage.getItem("jwt");
}

@NgModule({
    declarations: [
        AdmComponent,
        UnidadesComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        SharedModule,
        MaterialModule,
        AngularEditorModule,
        NgxMaskModule.forRoot(maskConfig),
        CurrencyMaskModule
    ],
    //providers: [AuthGuard],
    providers: [AdmService, CurrencyPipe, UpperCasePipe, DatePipe,
        { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' }
    ],
    exports: [
        AdmComponent,
        UnidadesComponent
    ],
    entryComponents: [
    ]
})
export class AdmModule { }

