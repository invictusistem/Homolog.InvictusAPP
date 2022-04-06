import { NgModule } from '@angular/core';
<<<<<<< HEAD
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Components
import { LoginComponent } from './_shared/_auth/user/login/login.component';
import { UserComponent } from './_shared/_auth/user/user.component';
import { TrocaSenhaComponent } from './_shared/_auth/user/troca-senha/troca-senha.component';
import { SelectUnidadeComponent } from './_shared/_auth/user/login/selecionar-unidade/select-unidade.component';
import { AppComponent } from './app.component';
import { SharedModule } from './_shared/shared.module';
import { AdmModule } from './administrativo/administrativo.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    TrocaSenhaComponent,
    SelectUnidadeComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    AdmModule
  ],
  providers: [],
  entryComponents: [
    TrocaSenhaComponent,
    SelectUnidadeComponent  
  ],
=======
import { AppComponent } from './app.component';
import { SharedModule } from './_shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,    
    AppRoutingModule
  ],
  providers: [
 ],
 entryComponents: [ 
],
>>>>>>> 9e83502d2b00e7d28a3b83c8649ad3b5fa628a86
  bootstrap: [AppComponent]
})
export class AppModule { }
