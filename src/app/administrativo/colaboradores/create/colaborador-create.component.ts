import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HighlightTrigger } from "src/app/_shared/animation/animation";
import { environment } from "src/environments/environment";
import { HelpersService } from "src/app/_shared/components/helpers/helpers.component";
import { AdmService } from "../../services/adm.service";
import { BaseComponent } from "src/app/_shared/services/basecomponent.component";

@Component({
    selector: 'createcolaboradoresrmodal',
    templateUrl: './colaborador-create.component.html',
    styleUrls: ['./colaborador-create.component.scss'],
    animations: [HighlightTrigger]
})

export class CreateColaboradoresComponent extends BaseComponent implements OnInit {

    // infoSpinner: SpinnerParams = {
    //     diameter: 100,
    //     marginleft: 42.5,
    //     margintop: 10
    // }

    //spinners
    mostrarModalPrincipal = true


    baseUrl = environment.baseUrl;
    //public cepReturn: CepReturn = new CepReturn();
    public colaboradorForm: FormGroup;
    //private jwtHelper = new JwtHelperService();
    //public tokenInfo: TokenInfos = new TokenInfos();
    public validadeEmailMsg = false
    public validadeCPFMsg = false
    public disabledSpinner = false
    public showContent = false
    public disabledSaveButton = 'hidden'
    public initProgressBar = 'visible'
    showForm = false
    cargos: any[] = new Array<any>()
    mensagem = "";
    public showMensagem = 'hidden'
    public msgErros: any

    constructor(

        //private _snackBar: MatSnackBar,
        //override _helper: HelpersService,
        override _snackBar: MatSnackBar,
        private _admService: AdmService,
        //baseComp: BaseComponent,
        private _fb: FormBuilder,
        private http: HttpClient,
        public dialogRef: MatDialogRef<CreateColaboradoresComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {        

        super(_snackBar);
        this.colaboradorForm = _fb.group({
            nome: ['', [Validators.required, Validators.minLength(5)]],
            email: ['', [Validators.required, Validators.email]],
            cpf: ['', [Validators.required, Validators.minLength(11)]],
            celular: [null, [Validators.required, Validators.minLength(5)]],
            cargoId: ['', [Validators.required]],
            ativo: [true, [Validators.required]],
            cep: ['', [Validators.required, Validators.minLength(8)]],
            logradouro: ['', [Validators.required, Validators.minLength(1)]],
            complemento: [''],
            numero: ['', [Validators.required]],
            cidade: ['', [Validators.required, Validators.minLength(1)]],
            uf: ['', [Validators.required, Validators.minLength(2)]],
            bairro: ['', [Validators.required, Validators.minLength(1)]]//,

        })
    }
    ngOnInit() {

        console.log(this.tokenInfo)
       
        //const token: any = localStorage.getItem('jwt')
        //this.tokenInfo = this.GetTokenInfos()//this.jwtHelper.decodeToken(token)
        this.getCargos();
    }


    getCargos() {

        this.http.get(`${this.baseUrl}/parametro/value/Cargo`)
            .subscribe({
                next: (response: any) => {
                    this.cargos = Object.assign([], response['values'])
                    this.dialogRef.addPanelClass('mycreatecolab-class')
                    this.initProgressBar = 'hidden'
                    this.showContent = true
                    this.mostrarModalPrincipal = false
                    this.showForm = true
                    this.funcaoTestar()
                },
                error: (error) => {
                    console.error(error)
                }
            })
    }

    onSubmit(form: FormGroup) {
        this.showMensagem = 'hidden'

        if (this.colaboradorForm.valid) {
            this.disabledSpinner = true

            this.disabledSaveButton = 'visible'
            this.http.post(`${this.baseUrl}/colaboradores`, this.colaboradorForm.value, {
            }).subscribe(response => {
            }, (err) => {
                if (err['status'] == 409) {
                    this.msgErros = err['error'].msg
                    this.showMensagem = 'visible'
                    this.disabledSaveButton = 'hidden'
                } else {
                    // this._helper?.openSnackBarErrorDefault()

                    this.dialogRef.close({ clicked: "Ok" });
                }



            },
                () => {

                    //this._helper?.openSnackBarSucesso('Colaborador salvo com sucesso')
                    //this.openSnackBarSucessoTESTE('Colaborador salvo com sucesso')
                    this.openSnackBarSucesso('Colaborador salvo com sucesso')
                    // this._helper.CloseModalWithOK();
                    this.dialogRef.close({ clicked: "Ok" });
                    this.disabledSaveButton = 'hidden'
                });
        }
    }


    cpfValidation = false
    emailValidation = false
    funcaoTestar() {
        let cpf = false
        this.cpfValidation = cpf
    }


    showEndereco = 'hidden'
    consultaCEP(CEP: string) {
        // console.log(CEP);
        if (this.colaboradorForm.get('cep')?.valid) {


            this._admService.CepConsulta(this.colaboradorForm.get('cep')?.value)
                .subscribe(response => {

                    this.colaboradorForm.get('logradouro')?.setValue(response["logradouro"].toUpperCase());
                    this.colaboradorForm.get('bairro')?.setValue(response["bairro"].toUpperCase());
                    this.colaboradorForm.get('cidade')?.setValue(response["localidade"].toUpperCase());
                    this.colaboradorForm.get('uf')?.setValue(response["uf"].toUpperCase());

                }, err => { },
                    () => {

                        this.showEndereco = 'visible'
                    });
        }
    }

    onOkClick() {
        //console.log("I do nothing");
        this.dialogRef.close({ clicked: "Ok" });
    }


    get disabledButton() {
        if (this.colaboradorForm.valid) {
            return this.disabledSaveButton != 'hidden'
        } else {
            return true
        }
    }


}

export class VerOCPF {

}