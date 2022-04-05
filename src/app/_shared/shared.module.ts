import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material/material.module';
import { NavBarComponent } from './nav-bar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { MyTelInput } from './customMasks/maskTelBr/form-field-custom-control-example';
import { MyDateInput } from './customMasks/maskDate/form-field-customDate-control';
import { MyTimeInput } from './customMasks/maskTimeStan/form-field-customTime-control';
import { MyCurrencyInput } from './customMasks/maskCurrency/form-fiels-customCurreny-control';
import { PhoneMaskDirective } from './directives/phone-mask.directive';
import { CPFMaskDirective } from './directives/cpf-mask.directive';
import { AuthInterceptor } from '../_Auth/auth.interceptor';
import { SanitizeHtmlPipe } from './pipes/sanitizePipe.component';
import { CNPJPipe } from './pipes/cnpjPipe';
import { CPFPipe } from './pipes/cpfPipe';
import { SpinnerComponent } from './components/spinner.component';
import { SafePipe } from './pipes/safe.pipe';
import { ConfirmModalComponent } from './components/ConfirmModal/confirm-modal.component';
import { HelpersService } from './components/helpers/helpers.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { MyCurrencyPipe } from './pipes/mycurrencypipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectUnidadeComponent } from '../_Auth/user/login/selecionarUnidade/selectunidade.component';
import { IdadePipe } from './pipes/idadePipe';
import { DatePastDirective } from './directives/date-past.directive';
import { ConfirmAcaoModalComponent } from './components/ConfirmarAcao/confirm-acao.component';
import { OnlynumberDirective } from './directives/onlynumbers.directive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    BrowserModule,
    AlertModule.forRoot()
  ],

  declarations: [
    NavBarComponent
    , FooterComponent
    , HomeComponent,
    MyTelInput,
    MyDateInput,
    MyTimeInput,
    MyCurrencyInput,
    PhoneMaskDirective,
    CPFMaskDirective,
    SanitizeHtmlPipe,
    CNPJPipe,
    CPFPipe,
    OnlynumberDirective,
    IdadePipe,
    MyCurrencyPipe,
    SpinnerComponent,
    SafePipe,
    ConfirmModalComponent,
    ConfirmAcaoModalComponent,
    DatePastDirective
    //SelectUnidadeComponent
  ],
  providers: [
    HelpersService,   
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    CommonModule,
    MyTelInput,
    MyDateInput,
    MyTimeInput,
    MyCurrencyInput,
    PhoneMaskDirective,
    CPFMaskDirective,
    SanitizeHtmlPipe,
    CNPJPipe,
    CPFPipe,
    OnlynumberDirective,
    IdadePipe,
    MyCurrencyPipe,
    SpinnerComponent,
    SafePipe,
    BrowserModule,
    ReactiveFormsModule,
    FooterComponent,
    HomeComponent,
    NavBarComponent,
    DatePastDirective
  ],
  entryComponents: [
    ConfirmModalComponent,
    ConfirmAcaoModalComponent
    //SelectUnidadeComponent
  ]

})

export class SharedModule { }