import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HelpersService } from "src/app/_shared/components/helpers/helpers.component";

@Component({
    selector: 'createplanopgmmodal',
    templateUrl: './create-planopgm.component.html',
    styleUrls: ['./create-planopgm.component.scss'],
    animations: [HighlightTrigger]
})

export class PlanoPgmCreateComponent implements OnInit {


    baseUrl = environment.baseUrl;
    public disabledContrato = true
    public initProgressBar = 'visible'
    public saveSpinner = 'hidden'
    public typePacotes: any
    public moduloForm: FormGroup;
    private jwtHelper = new JwtHelperService();
    public tokenInfo: TokenInfos = new TokenInfos();
    public disabledSpinner = false
    public contratos: any[] = new Array<any>();
    constructor(
        private _snackBar: MatSnackBar,
        private router: Router,
        private _helper: HelpersService,
        private _fb: FormBuilder,
        private _http: HttpClient,
        public dialogRef: MatDialogRef<PlanoPgmCreateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.moduloForm = _fb.group({
            typePacoteId: ['', [Validators.required]],
            descricao: ['', [Validators.required]],
            valor: ['', [Validators.required]],
            taxaMatricula: [0.00],
            materialGratuito: ['', [Validators.required]],
            valorMaterial: [0.00],
            bonusPontualidade: [0.00],
            contratoId: ['', [Validators.required]],
            ativo: [true]

        })
    }

    ngOnInit() {
        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)
        this.GetTypes()
    }

    private GetTypes() {

        this._http.get(`${this.baseUrl}/typepacote`)
            .subscribe(resp => {
                this.typePacotes = resp['typePacotes']
            },
                (error) => { 
                    //console.log(error) 
                },
                () => {
                    this.initProgressBar = 'hidden'
                })
    }

    getContratos(typePacoteId) {
        this.moduloForm.get('contratoId').setValue('')
        this.initProgressBar = 'visible'
        this.disabledContrato = true
        this.contratos = new Array<any>();
        this._http.get(`${this.baseUrl}/contrato/type-pacote/${typePacoteId}`)
            .subscribe(resp => {
                this.disabledContrato = false
                this.contratos = resp['contratos']
            },
                (error) => {
                    this.initProgressBar = 'hidden'
                    //console.log(error)
                },
                () => {
                    this.initProgressBar = 'hidden'
                })

    }

    get disabledSaveButton() {

        if (this.moduloForm.valid) {
            return this.saveSpinner != 'hidden'
        } else {
            return true
        }

    }

    onSubmit(form: any) {
      //  console.log(form.value)
        if (this.moduloForm.valid) {
            this.saveSpinner = 'visible'
            this.disabledSpinner = true
            this._http.post(`${this.baseUrl}/plano-pagamento`, form.value, {})
                .subscribe(response => {
                }, (err) => { console.log(err) },
                    () => {
                        this._helper.openSnackBarSucesso("Plano criado com sucesso.")
                        this.dialogRef.close({ clicked: "Ok" });
                    });
        }
    }
}