import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CepReturn } from "src/app/_shared/models/cepreturn.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Cargos, Unidades } from "src/app/_shared/models/perfil.model";
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SpinnerParams } from "src/app/_shared/models/spinner.model";
import { HelpersService } from "src/app/_shared/components/helpers/helpers.component";
import { AdmService } from "../../services/adm.services";

@Component({
    selector: 'editacessomodal',
    templateUrl: './editacesso.component.html',
    styleUrls: ['./editacesso.component.scss'],
    animations: [HighlightTrigger]
})

export class EditAcessoComponent implements OnInit {


    public myrForm: FormGroup;
    private jwtHelper = new JwtHelperService();
    public tokenInfo: TokenInfos = new TokenInfos();
    mostrarModalPrincipal = true    
    
    public initProgressBar = 'visible'
    public showContent = false

    constructor(        
        private _admService: AdmService,
        private _helper: HelpersService,
        private _fb: FormBuilder,        
        public dialogRef: MatDialogRef<EditAcessoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

        this.myrForm = _fb.group({
            nome: ['', [Validators.required, Validators.minLength(5)]],
            
        })
    }
   

    ngOnInit() {
        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token) 
        this.initProgressBar = 'hidden'
        this.showContent = true
        this.dialogRef.addPanelClass('editacesso-class')       

    }

    onSubmit(form: any){

    }

    disabledSaveButton = false
    get disabledButton() {
        // setUserAcess
        if (this.myrForm.valid) {
            return this.disabledSaveButton
        } else {
            return true
        }
    }


}
export class UnidadesAcessoViewModel{
    constructor(
        public id?: string,
        public descricao?: string,
        public sigla?: string,
        public unidadeId?: string,
        public acesso?: Boolean
    ){}
}