import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './_shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AdmModule } from './Adm/adm.module';
import { PedagogicoModule } from './Pedagogico/pedagogico.module';
import { ComercialModule } from './Comercial/comercial.module';
import { UserComponent } from './_Auth/user/user.component';
import { LoginComponent } from './_Auth/user/login/login.component';
import { AlunoModule } from './Aluno/aluno.module';
import { FinanceiroModule } from './Financeiro/financeiro.module';
import { NewMatriculaModule } from './NewMatricula/newmatricula.module';
import { GeralModule } from './Geral/geral.module';
import { TrocaSenhaComponent } from './_Auth/user/trocaSenha/troca-senha.component';
import { SelectUnidadeComponent } from './_Auth/user/login/selecionarUnidade/selectunidade.component';


export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    LoginComponent,
    UserComponent,
    TrocaSenhaComponent,
    AppComponent,
    SelectUnidadeComponent
  ],
  imports: [

    HttpClientModule,
    BrowserModule,
    FormsModule,
    SharedModule,
    AdmModule,
    PedagogicoModule,
    ComercialModule,
    AlunoModule,
    FinanceiroModule,
    GeralModule,
    AppRoutingModule,
    NewMatriculaModule
  ],
  providers: [
 ],
 entryComponents: [
  TrocaSenhaComponent,
  SelectUnidadeComponent  
],
  bootstrap: [AppComponent]
})
export class AppModule { }
