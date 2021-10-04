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


const maskConfig: Partial<IConfig> = {
    validation: false,
  };
  
export function tokenGetter() {
    return localStorage.getItem("jwt");
}

@NgModule({
    declarations: [
        NewMatriculaComponent,
        NovaMatriculaComponent
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
    providers: [CurrencyPipe, DatePipe, { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    {provide: 'IServicoToken', useClass: Servico}
    ],
    exports: [
        NewMatriculaComponent,
        NovaMatriculaComponent
    ],
    entryComponents: [
        
    ]
})
export class NewMatriculaModule { }

