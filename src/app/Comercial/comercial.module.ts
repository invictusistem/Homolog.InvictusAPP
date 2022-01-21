import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import { CustomersComponent } from './customers/customers.component';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from "@auth0/angular-jwt";

import { CommonModule } from '@angular/common';
//import { HomeComponent } from './home.component';
import { SharedModule } from '../_shared/shared.module';

import { MaterialModule } from '../_shared/material/material.module';

import { ComercialComponent } from './comercial.component';
import { ExportLeadComponent } from './ExportarLead/exportar.component';
import { LeadsComponent } from './Leads/leads.component';
import { AddLeadComponent } from './AddLead/addlead.component';
import { LeadExportComponent } from './AddLead/leadexport/lead-export.component';
import { LeadIndividualCriarComponent } from './AddLead/criarlead/criar-lead.component';


// import { CustomersComponent } from '../customers/customers.component';

export function tokenGetter() {
    return localStorage.getItem("jwt");
}

@NgModule({
    declarations: [
        ComercialComponent,
        ExportLeadComponent,
        LeadsComponent,
        AddLeadComponent,
        LeadExportComponent,
        LeadIndividualCriarComponent
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

        //HttpClientModule,
        //BrowserModule,
        //CommonModule,
        //FormsModule,
        //ReactiveFormsModule,

        SharedModule,
        //MaterialModule,
        //AppRoutingModule,
        //BrowserAnimationsModule,    
    ],
    // providers: [AuthGuard],
    providers: [],
    //bootstrap: [AppComponent]
    exports: [
        ComercialComponent,
        LeadsComponent,
        AddLeadComponent
        //SharedModule
        //, CustomersComponent
    ],
    entryComponents: [
        ExportLeadComponent,
        LeadExportComponent,
        LeadIndividualCriarComponent
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

