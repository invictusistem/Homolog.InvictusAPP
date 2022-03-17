import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import { CustomersComponent } from './customers/customers.component';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
//import { HomeComponent } from './home.component';
import { SharedModule } from '../_shared/shared.module';

import { MaterialModule } from '../_shared/material/material.module';

import { AngularEditorModule } from '@kolkov/angular-editor';


import { IConfig, NgxMaskModule } from 'ngx-mask';
import { NewMatriculaComponent } from './newmatricula.component';
import { Servico } from '../Adm/_TESTES/testeexterno';
import { NovaMatriculaComponent } from './NovaMatricula/novamatricula.component';
import { CreateNovaMatriculaComponent } from './NovaMatricula/CreateMatricula/createnovamatricula.component';
import { ConfirmNovaMatriculaComponent } from './NovaMatricula/CreateMatricula/Confirm/confirmnova.component';
import { NewMatriculaService } from './services/newmatricula.service';
import { RelatorioMatriculaComponent } from './NovaMatricula/Relatoriomatricula/relatoriomatricula.component';


const maskConfig: Partial<IConfig> = {
    validation: false,
  };
  
export function tokenGetter() {
    return localStorage.getItem("jwt");
}

@NgModule({
    declarations: [
        NewMatriculaComponent,
        NovaMatriculaComponent,
        CreateNovaMatriculaComponent,
        ConfirmNovaMatriculaComponent,
        RelatorioMatriculaComponent
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
    ],
    //providers: [AuthGuard],
    providers: [NewMatriculaService, CurrencyPipe, DatePipe, { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    {provide: 'IServicoToken', useClass: Servico}
    ],
    exports: [
        NewMatriculaComponent,
        NovaMatriculaComponent
    ],
    entryComponents: [
        CreateNovaMatriculaComponent,
        ConfirmNovaMatriculaComponent,
        RelatorioMatriculaComponent
    ]
})
export class NewMatriculaModule { }

