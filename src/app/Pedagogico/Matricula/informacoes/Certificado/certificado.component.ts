import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { PedagogicoService } from "src/app/Pedagogico/service/pedagogico.service";

@Component({
    selector: 'certificadomodal',
    templateUrl: './certificado.component.html',
    styleUrls: ['./certificado.component.scss'],
    animations: [HighlightTrigger]
})

export class CertificadoComponent implements OnInit {
   
    public initProgressBar = 'visible'
    public showContent = false
    private jwtHelper = new JwtHelperService();
    tokenInfo: TokenInfos = new TokenInfos();   

    constructor(       
        private _modal: MatDialog,
        private _pedagService: PedagogicoService,
        public dialogRef: MatDialogRef<CertificadoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

    }

    ngOnInit() {
      
        this.GetCertificado();
    }

    public GetCertificado(){

        this._pedagService.GetCertificado(this.data['matricula'].id)
                .subscribe(
                    sucesso => { this.processarSucesso(sucesso) },
                    falha => { this.processarFalha(falha) }
                );
    }

    private processarSucesso(response){
        this.initProgressBar = 'hidden'
        this.showContent = true
    }

    private processarFalha(error){
        this.initProgressBar = 'hidden'
        this.showContent = true
    }

   


}