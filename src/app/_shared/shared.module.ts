// Metas:
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material/material.module';
import { NavBarComponent } from './nav-bar/navbar.component';
import { FooterComponent } from './footer/footer.component';

import { HomeComponent } from './home/home.component';


import { AuthGuard } from '../_Auth/auth.guard';
//import { AuthInterceptor } from '../_Auth/auth.interceptor';
import { DataService } from '../_services/data.service';
import { MyTelInput } from './customMasks/maskTelBr/form-field-custom-control-example';
import { MyDateInput } from './customMasks/maskDate/form-field-customDate-control';
import { MyTimeInput } from './customMasks/maskTimeStan/form-field-customTime-control';
import { MyCurrencyInput } from './customMasks/maskCurrency/form-fiels-customCurreny-control';
import { PhoneMaskDirective } from './directives/phone-mask.directive';
import { CPFMaskDirective } from './directives/cpf-mask.directive';
import { AuthInterceptor } from '../_Auth/auth.interceptor';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { SanitizeHtmlPipe } from './pipes/sanitizePipe.component';
//import { CommonModule } from '@angular/common';
// Components:
//import { HomeComponent } from './home/home.component';
// import { SideBarComponent } from './sidebar/sidebar.component';
//import { NavBarComponent } from './navbar/navbar.component';
//import { DataService } from './data.service';

//import { MainComponent } from './main/main.component';

//import { MaterialModule } from './material/material.module';
//import { ErrorMessageComponent } from './components/errorMessage/message.component';
//import { ConfirmMessageComponent } from './components/errorMessage/confirmDialog/confirm.component';





@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    //routing,
    BrowserModule
    
    //TemplateModule,
    // No need to export as these modules don't expose any components/directive etc'
    //HttpClientModule,
    // HttpClientJsonpModule
    // ReactiveFormsModule
  ],

  declarations: [
    NavBarComponent
    , FooterComponent
    //, MainComponent
    , HomeComponent,
    MyTelInput,
    MyDateInput,
    MyTimeInput,
    MyCurrencyInput,
    PhoneMaskDirective,
    CPFMaskDirective,
    SanitizeHtmlPipe
    //HomeComponent,
    //MainComponent,
    //ErrorMessageComponent,
    //ConfirmMessageComponent


  ],
   //providers: [AuthGuard],
  providers: [
   // UnsavedGuard
  //   DataService,
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
    RouterModule,// Modules
    //MainComponent,
    CommonModule,
    MyTelInput,
    MyDateInput,
    MyTimeInput,
    MyCurrencyInput,
    PhoneMaskDirective,
    CPFMaskDirective,
    SanitizeHtmlPipe,
    //ErrorMessageComponent,
    //ConfirmMessageComponent,
    
    //FormsModule,
    BrowserModule,
    //TemplateModule,
    ReactiveFormsModule,
    FooterComponent,
    //MainComponent,
    HomeComponent,
        //RouterModule,
    //HomeComponent,
    NavBarComponent
  ],

})

export class SharedModule { }