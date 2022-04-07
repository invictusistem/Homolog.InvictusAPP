import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DomSanitizer } from "@angular/platform-browser";
import { HighlightTrigger } from "src/app/_shared/animation/animation";
import { environment } from "src/environments/environment";
import { TokenInfos } from "src/app/_shared/models/token.model";

@Component({
    selector: 'editcontratomodal',
    templateUrl: './contrato-edit.component.html',
    styleUrls: ['./contrato-edit.component.scss'],
    animations: [HighlightTrigger]
})

export class EditarContratoComponent implements OnInit {
    public htmlContent: any;
    showSpinnerSearch = true
    baseUrl = environment.baseUrl;
    //public cepReturn: CepReturn = new CepReturn();
    public contratoForm: FormGroup;
    private jwtHelper = new JwtHelperService();
    public tokenInfo: TokenInfos = new TokenInfos();
    public validadeEmailMsg = false
    public validadeCPFMsg = false
    //cargos = Cargos;
    mensagem = "";
    showMensagem = false
    public contrato: any;
    public originalContrato: any;
    public showForm = false

    //unidades = Unidades;
    constructor(
        private sanitizer: DomSanitizer,
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fb: FormBuilder,
        private _http: HttpClient,
        public dialogRef: MatDialogRef<EditarContratoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.contratoForm = _fb.group({
            titulo: ['', [Validators.required]],
            conteudo: ['', [Validators.required]],

        })
    }

    ngOnInit() {
        const token:any = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)
        this.GetContrato(this.data['contrato'].id)
    }

    private GetContrato(contratoId: number) {

        this._http.get(`${this.baseUrl}/contrato/${contratoId}`)
        .subscribe({
            next: (resp: any) => { 
                this.contrato = Object.assign({}, resp['contrato'])
                this.originalContrato = Object.assign({}, resp['contrato']) 
                this.showForm = true
                    this.showSpinnerSearch = false
			},
            error: (error) => { 
                this.showSpinnerSearch = false
			}
        })
    }
    
    onSubmit(form: any) {

        console.log(form.valid)
        console.log(form.value)
        console.log(this.contrato)

        if (form.valid) {
            this._http.put(`${this.baseUrl}/contrato`, this.contrato, {})
                .subscribe(resp => {

                }, (error) => { console.log(error) },
                    () => {
                        this.dialogRef.close({ clicked: "Ok" });
                    })

        }

    }

    disabledButton(form: any) {
       // console.log(form.valid)
       //angular.equals(obj1, obj2)

       if (form.valid) {
        
            return false
        } else {
        
            return true
        }
        // if ((JSON.stringify(this.contrato) !== JSON.stringify(this.originalContrato)) && 
        // form.valid) {
        
        //     return false
        // } else {
        
        //     return true
        // }
    }

    // safeHTML(unsafe: string) {
    //     return this.sanitizer.bypassSecurityTrustHtml(unsafe);
    // }


}