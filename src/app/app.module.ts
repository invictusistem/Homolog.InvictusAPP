import { NgModule } from '@angular/core';
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
  bootstrap: [AppComponent]
})
export class AppModule { }
