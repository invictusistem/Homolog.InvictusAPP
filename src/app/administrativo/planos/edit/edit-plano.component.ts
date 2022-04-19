import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HighlightTrigger } from "src/app/_shared/animation/animation";
import { environment } from "src/environments/environment";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { HelpersService } from "src/app/_shared/components/helpers/helpers.component";
import { AdmService } from "../../services/adm.service";

@Component({
    selector: 'edit-planomodal',
    templateUrl: './edit-plano.component.html',
    styleUrls: ['./edit-plano.component.scss'],
    animations: [HighlightTrigger]
})

export class PlanoPgmEditComponent implements OnInit {


    baseUrl = environment.baseUrl;
    public initProgressBar = 'visible'
    public saveSpinner = 'hidden'
    public showContent = false
    public disabledContrato = false
    public typePacotes: any[] = new Array<any>()
    public contratos: any[] = new Array<any>()
    public moduloForm: FormGroup;
    private jwtHelper = new JwtHelperService();
    public tokenInfo: TokenInfos = new TokenInfos();
    // public plano: any;
    private originalPlano: any;
    public disabledSpinner = false

    constructor(
        //private service: AdmService,
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fb: FormBuilder,
        private _helper: HelpersService,
        private _admService: AdmService,
        //private _http: HttpClient,
        public dialogRef: MatDialogRef<PlanoPgmEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.moduloForm = _fb.group({
            id: [''],
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
        const token: any = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)
        // this.plano = this.data['plano']
        // console.log(this.plano)
        this.GetPlano()
    }


    private GetPlano() {



        this._admService.GetPlanoById(this.data['plano'].id)
            .subscribe({
                next: (resp: any) => {
                    this.moduloForm.patchValue(resp['plano'])
                    this.originalPlano = JSON.parse(JSON.stringify(this.moduloForm.value))
                    this.typePacotes = resp['typePacotes']
                    this.contratos = resp['contratos']
                    this.initProgressBar = 'hidden'
                    this.showContent = true

                },
                error: (error) => {
                    // console.error(error)
                }
            })

    }

    getContratos(typePacoteId: any) {

        this.contratos = new Array<any>()
        this.moduloForm.get('contratoId')?.setValue('')
        this.disabledContrato = true
        this.contratos = new Array<any>();

        this._admService.GetContratosByTypePacote(typePacoteId)
            .subscribe({
                next: (resp: any) => {
                    this.disabledContrato = false
                    this.contratos = resp['contratos']
                },
                error: (error) => {
                    // console.error(error)
                }
            })
    }

    get disabledSaveButton() {

        if (this.moduloForm.valid &&
            JSON.stringify(this.originalPlano) !=
            JSON.stringify(this.moduloForm.value)) {

            return this.saveSpinner != 'hidden'
        } else {
            return true
        }
    }


    isDisabled = true
    onSubmit(form: any) {
        // console.log(this.plano)
        //  console.log(form.valid)
        if (this.moduloForm.valid) {
            this.saveSpinner = 'visible'
            this.isDisabled = true
            this.disabledSpinner = true

            this._admService.EditPlano(this.moduloForm.value)
                .subscribe(response => {
                }, (err) => {
                    //console.log(err)
                },
                    () => {

                        this.disabledSpinner = false
                        this._helper.openSnackBarSucesso('Plano editado com sucesso.')
                        this.dialogRef.close({ clicked: "OK" });
                    });
        }
    }
}