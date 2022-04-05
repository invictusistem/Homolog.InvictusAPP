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
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { Servico } from '../Adm/testes/testeexterno';
import { GeralComponent } from './geral.component';



const maskConfig: Partial<IConfig> = {
    validation: false,
  };
  
export function tokenGetter() {
    return localStorage.getItem("jwt");
}

@NgModule({
    declarations: [
        GeralComponent,        
        //MyPipe
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
    providers: [CurrencyPipe, DatePipe, { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    {provide: 'IServicoToken', useClass: Servico}
    ],
    exports: [
        GeralComponent
        
    ],
    entryComponents: [
        
    ]
})
export class GeralModule { }

