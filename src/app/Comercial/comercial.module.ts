import { HttpClientModule } from '@angular/common/http';
import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import { CustomersComponent } from './customers/customers.component';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from "@auth0/angular-jwt";

import { CommonModule, CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
//import { HomeComponent } from './home.component';
import { SharedModule } from '../_shared/shared.module';

import { MaterialModule } from '../_shared/material/material.module';

import { ComercialComponent } from './comercial.component';

import { AddLeadComponent } from './AddLead/addlead.component';
import { Servico } from '../Adm/_TESTES/testeexterno';
import { LeadsComponent } from './Leads/leads.component';


import { CurrencyMaskModule } from 'ng2-currency-mask';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { LeadIndividualCriarComponent } from './AddLead/criarlead/criar-lead.component';
import { LeadExportComponent } from './AddLead/leadexport/lead-export.component';



// import { CustomersComponent } from '../customers/customers.component';
const maskConfig: Partial<IConfig> = {
    validation: false,
  };
export function tokenGetter() {
    return localStorage.getItem("jwt");
}

@NgModule({
    declarations: [
        ComercialComponent,
        
        AddLeadComponent,
        LeadsComponent,
        LeadIndividualCriarComponent,
        LeadExportComponent
        //LoginComponent,
        //CustomersComponent,
        //AppComponent
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
    // providers: [AuthGuard],
    providers: [CurrencyPipe, UpperCasePipe,DatePipe, { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    {provide: 'IServicoToken', useClass: Servico}
    ],
    exports: [
        ComercialComponent,
        AddLeadComponent,
        LeadsComponent
        //SharedModule
        //, CustomersComponent
    ],
    entryComponents: [
        LeadIndividualCriarComponent,
        LeadExportComponent
        // FormFieldCustomControlExample, 
        //MyTelInput,
        // CreateUserComponent,
        // EditUserComponent,
        // CreateUnidadeComponent,
        // EditUnidadeComponent,
        // CreateColaboradoresComponent,
        // EditColaboradoresComponent,
        // CreateCursoComponent,
        // EditCursoComponent,
        //   DialogOverviewExampleDialog,
        //   EditTemplateModel
    ]
})
export class ComercialModule { }

