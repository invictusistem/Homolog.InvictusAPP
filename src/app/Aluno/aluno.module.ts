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
import { AlunoComponent } from './aluno.component';
import { AlunoEstagioComponent } from './alunoestagios/alunoest.component';
import { InscricaoEstComponent } from './alunoestagios/inscestagio/inscricaoest.component';
import { AlunoDocsComponent } from './alunodocs/alunodocs.component';


export function tokenGetter() {
    return localStorage.getItem("jwt");
}

@NgModule({
    declarations: [
        AlunoComponent,
        AlunoEstagioComponent,
        InscricaoEstComponent,
        AlunoDocsComponent
           ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,       
        SharedModule,
        MaterialModule
        
    ],
    //providers: [AuthGuard],
    providers: [CurrencyPipe, DatePipe,{provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL'}],    
    exports: [
        AlunoComponent,
        AlunoEstagioComponent        
    ],
    entryComponents: [  
        InscricaoEstComponent,
        AlunoDocsComponent
    ]
})
export class AlunoModule { }

