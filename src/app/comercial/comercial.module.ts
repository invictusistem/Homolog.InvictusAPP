import { NgModule } from '@angular/core';
import { GetNgxMaskModuleConfig, SharedModule } from '../_shared/shared.module';
import { ComercialService } from './services/comercial.service';
import { ComercialComponent } from './comercial.component';


@NgModule({
    declarations: [
        ComercialComponent
    ],
    imports: [
        SharedModule,
        GetNgxMaskModuleConfig()  
    ],
    providers:  [
        ComercialService
    ],
    exports: [
        ComercialComponent
    ],
    entryComponents: [
    ]
})
export class ComercialModule { }
