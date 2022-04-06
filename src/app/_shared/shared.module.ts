import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    BrowserModule,
    CurrencyMaskModule,
    NgxMaskModule.forRoot(maskConfig)
  ],

  declarations: [
    NavBarComponent,
    FooterComponent,
    HomeComponent
  ],

  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    HelpersService,
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
    CurrencyMaskModule,
    // components
    NavBarComponent,
    FooterComponent,
    HomeComponent
  ],
  entryComponents: [

  ]

})

export class SharedModule { }