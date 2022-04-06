import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
<<<<<<< HEAD
import { AuthInterceptor } from './_auth/auth.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavBarComponent } from './nav-bar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { HelpersService } from './components/helpers/helpers.component';

=======
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
>>>>>>> 9e83502d2b00e7d28a3b83c8649ad3b5fa628a86

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
<<<<<<< HEAD
    BrowserModule,
    CurrencyMaskModule,
    NgxMaskModule.forRoot(maskConfig)
  ],

  declarations: [
    NavBarComponent,
    FooterComponent,
    HomeComponent
=======
    BrowserModule
  ],

  declarations: [
>>>>>>> 9e83502d2b00e7d28a3b83c8649ad3b5fa628a86
  ],

  providers: [
<<<<<<< HEAD
    HelpersService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
=======
   
>>>>>>> 9e83502d2b00e7d28a3b83c8649ad3b5fa628a86
  ],

  exports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
<<<<<<< HEAD
    RouterModule,
    BrowserModule,
    CurrencyMaskModule,
    // components
    NavBarComponent,
    FooterComponent,
    HomeComponent
  ],
  entryComponents: [

=======
    RouterModule,   
    BrowserModule
  ],
  entryComponents: [
>>>>>>> 9e83502d2b00e7d28a3b83c8649ad3b5fa628a86
  ]

})

export class SharedModule { }