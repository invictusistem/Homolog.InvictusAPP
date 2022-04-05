import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './_shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './_shared/material/material.module';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [

    HttpClientModule,
    BrowserModule,
    FormsModule,
    MaterialModule,
    SharedModule,    
    AppRoutingModule
  ],
  providers: [
 ],
 entryComponents: [ 
],
  bootstrap: [AppComponent]
})
export class AppModule { }
