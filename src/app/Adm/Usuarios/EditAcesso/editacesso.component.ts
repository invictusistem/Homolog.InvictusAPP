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
import { AdmService } from "../../Services/adm.services";

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
    public mostrarModalPrincipal = true
    public initProgressBar = 'visible'
    public saveProgressBar = 'hidden'
    public disabledEnvio = false
    public showContent = false

    acessoView: any[] = new Array<any>()
    editedAcessoView: any[] = new Array<any>()

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
        console.log(this.data['usuario'])
        this.getAcessos()
    }

    getAcessos() {

        this._admService.GetUsuarioAcessos(this.data['usuario'].id)
            .subscribe(
                sucesso => { this.getAcessosSucesso(sucesso) },
                falha => { this.getAcessosFalha(falha) }
            )
    }

    enviarLogin(){

        this.disabledEnvio = true
        this._admService.envioAcesso(this.data['usuario'].email)
            .subscribe(
                sucesso => { this.enviarLoginSucesso(sucesso) },
                falha => { this.enviarLoginFalha(falha) }
            )

    }

    enviarLoginSucesso(resp){
        this._helper.openSnackBarSucesso("E-mail com informações de acesso enviado com sucesso.")
        this.disabledEnvio = false
    }

    enviarLoginFalha(error){
        this._helper.openSnackBarErrorDefault()
        this.disabledEnvio = false
    }

    varJson
    getAcessosSucesso(sucesso) {
        Object.assign(this.acessoView, sucesso['acessos'])
        this.varJson = JSON.parse(JSON.stringify(sucesso['acessos']))
        Object.assign(this.editedAcessoView, sucesso['acessos'])
        this.dialogRef.addPanelClass('editacesso-class')
        this.initProgressBar = 'hidden'
        this.showContent = true
        
        
        
    }

    getAcessosFalha(error) {


    }

    saveAcesso() {
        this.saveProgressBar = 'visible'
        this._admService.editAcessos(this.editedAcessoView)
            .subscribe(
                sucesso => { this.saveAcessoSucesso(sucesso) },
                falha => { this.saveAcessoError(falha) }
            )
    }

    saveAcessoSucesso(sucesso) {
        this.saveProgressBar = 'hidden'
        this.dialogRef.close({ close: true })
    }

    saveAcessoError(falha) {
        this.saveProgressBar = 'hidden'
    }

    disabledSaveButton = false
    get disabledButton() {

        // console.log(JSON.stringify(this.varJson))
        // console.log(JSON.stringify(this.editedAcessoView))
        if (this.saveProgressBar == 'visible') return true

        if (JSON.stringify(this.varJson) ===
            JSON.stringify(this.editedAcessoView)) {
            return true
        } else {
            return false
        }



        // if (this.myrForm.valid) {
        //     return this.disabledSaveButton
        // } else {
        //     return true
        // }
    }


}
// export class UnidadesAcessoViewModel{
//     constructor(
//         public id?: string,
//         public descricao?: string,
//         public sigla?: string,
//         public unidadeId?: string,
//         public acesso?: Boolean
//     ){}
// }