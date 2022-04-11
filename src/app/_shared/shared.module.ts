import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavBarComponent } from './nav-bar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { HelpersService } from './components/helpers/helpers.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CPFPipe } from './components/pipes/cpf.pipe';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { BaseComponent } from './services/basecomponent.component';
import { CNPJPipe } from './components/pipes/cnpj.pipe';
import { ConfirmAcaoModalComponent } from './components/acao-confirm/confirm-acao.component';
import { MyTimeInput } from './components/mask-time/form-field-customTime-control';
import { ModalConfirmarComponent } from './components/modal-confirmar/modal-confirmar.component';


export const maskConfig: Partial<IConfig> = {
  validation: false,
};

export function GetNgxMaskModuleConfig() {
  return NgxMaskModule.forRoot(maskConfig)
}

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    BrowserModule,
    AngularEditorModule,
    CurrencyMaskModule,    
    GetNgxMaskModuleConfig()
  ],

  declarations: [
    NavBarComponent,
    FooterComponent,
    HomeComponent,
    BaseComponent,
    ConfirmAcaoModalComponent,
    ModalConfirmarComponent,
    CPFPipe,
    CNPJPipe,
    MyTimeInput
  ],

  providers: [
    HelpersService,
    CurrencyPipe, 
    UpperCasePipe, 
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],

  exports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    BrowserModule,
    AngularEditorModule,
    CurrencyMaskModule,
    // components
    BaseComponent,
    NavBarComponent,
    FooterComponent,
    HomeComponent,
    CPFPipe,
    CNPJPipe,
    MyTimeInput
  ],
  entryComponents: [
    ConfirmAcaoModalComponent,
    ModalConfirmarComponent
  ]

})

export class SharedModule { }