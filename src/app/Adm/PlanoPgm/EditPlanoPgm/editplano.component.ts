import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CepReturn } from "src/app/_shared/models/cepreturn.model";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Cargos, Unidades } from "src/app/_shared/models/perfil.model";
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { MatSnackBar } from "@angular/material/snack-bar";



//import { TemplateTasks } from 'src/app/shared/models/templateTasks.model';

@Component({
    selector: 'editplanomodal',
    templateUrl: './editplano.component.html',
    styleUrls: ['./editplano.component.scss'],
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
    private originalPlano:any;
    public disabledSpinner = false

    constructor(
        //private service: AdmService,
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fb: FormBuilder,
        private _http: HttpClient,
        public dialogRef: MatDialogRef<PlanoPgmEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.moduloForm = _fb.group({
                id:[''],
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
       // this.plano = this.data['plano']
       // console.log(this.plano)
        this.GetPlano()
    }

    private GetPlano() {

        this._http.get(`${this.baseUrl}/plano-pagamento/${this.data['plano'].id}`)
            .subscribe(resp => {
               // this.plano = resp['plano']
                this.moduloForm.patchValue(resp['plano'])
                this.originalPlano = JSON.parse(JSON.stringify(this.moduloForm.value))
                this.typePacotes = resp['typePacotes']
                this.contratos = resp['contratos']
              //  console.log(this.plano)
            },
                (error) => { console.log(error) },
                () => {
                    this.initProgressBar = 'hidden'
                    this.showContent = true
                   // console.log(this.typePacotes)
                 })
    }

    getContratos(typePacoteId) {
      //  this.moduloForm.get('contratoId').setValue('')
      this.contratos = new Array<any>()
      this.moduloForm.get('contratoId').setValue('')
      this.disabledContrato = true
        this.contratos = new Array<any>();
        this._http.get(`${this.baseUrl}/contrato/type-pacote/${typePacoteId}`)
            .subscribe(resp => {
                this.disabledContrato = false
                this.contratos = resp['contratos']
            },
                (error) => {
                    console.log(error)
                },
                () => {

                })

    }

    get disabledSaveButton(){

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
            this._http.put(`${this.baseUrl}/plano-pagamento`, this.moduloForm.value, {})
                .subscribe(response => {
                }, (err) => { console.log(err) },
                    () => {
                        this.disabledSpinner = false
                        this.dialogRef.close({ clicked: "OK" });
                    });
        }
    }
}