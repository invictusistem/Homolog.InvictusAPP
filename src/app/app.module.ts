import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { JwtModule } from "@auth0/angular-jwt";
import { MaterialModule } from './_shared/material/material.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from './_shared/shared.module';


import { AppRoutingModule } from './app-routing.module';
import { AdmModule } from './Adm/adm.module';
import { PedagogicoModule } from './Pedagogico/pedagogico.module';
import { ComercialModule } from './Comercial/comercial.module';
import { UserComponent } from './_Auth/user/user.component';
import { LoginComponent } from './_Auth/user/login/login.component';
//import { AuthInterceptor } from './_Auth/auth.interceptor';
import { DataService } from './_services/data.service';
import { AlunoModule } from './Aluno/aluno.module';
import { FinanceiroModule } from './Financeiro/financeiro.module';
import { NewMatriculaModule } from './NewMatricula/newmatricula.module';
import { GeralModule } from './Geral/geral.module';


export function tokenGetter() {
  return localStorage.getItem("jwt");
}

console.log('app module')

@NgModule({
  declarations: [
    //HomeComponent,
    LoginComponent,
    //CustomersComponent,
    UserComponent,
    AppComponent
  ],
  imports: [

    HttpClientModule,
    BrowserModule,
    //CommonModule,
    FormsModule,
    SharedModule,
    AdmModule,
    PedagogicoModule,
    ComercialModule,
    AlunoModule,
    FinanceiroModule,
    GeralModule,
    //Adm2Module,
    //LoginModule,
    AppRoutingModule,
    NewMatriculaModule
   // MaterialModule,
    //AppRoutingModule,
    //BrowserAnimationsModule,
    // routing,
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: tokenGetter,
    //     allowedDomains: ["localhost:44370"],
    //     disallowedRoutes: []
    //   }
    // })
  ],
  providers: [
    // DataService,
    // {
    //    provide: HTTP_INTERCEPTORS,
    //    useClass: AuthInterceptor,
    //    multi: true
    // }
 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
