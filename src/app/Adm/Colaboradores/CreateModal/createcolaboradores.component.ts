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

@Component({
    selector: 'createcolaboradoresrmodal',
    templateUrl: './createcolaboradores.component.html',
    styleUrls: ['./createcolaboradores.component.scss'],
    animations: [HighlightTrigger]
})

export class CreateColaboradoresComponent implements OnInit {

    // infoSpinner: SpinnerParams = {
    //     diameter: 100,
    //     marginleft: 42.5,
    //     margintop: 10
    // }

    //spinners
    mostrarModalPrincipal = true


    baseUrl = environment.baseUrl;
    public cepReturn: CepReturn = new CepReturn();
    public colaboradorForm: FormGroup;
    private jwtHelper = new JwtHelperService();
    public tokenInfo: TokenInfos = new TokenInfos();
    public validadeEmailMsg = false
    public validadeCPFMsg = false
    public disabledSpinner = false
    showForm = false
    cargos: any[] = new Array<any>()
    mensagem = "";
    showMensagem = false
    msgErros: any

    constructor(
        private _snackBar: MatSnackBar,
        private _helper: HelpersService,
        private _fb: FormBuilder,
        private http: HttpClient,
        public dialogRef: MatDialogRef<CreateColaboradoresComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

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

        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)
        this.getCargos();
    }

    getCargos() {

        this.http.get(`${this.baseUrl}/parametro/value/Cargo`)
            .subscribe(response => {
                this.cargos = Object.assign([], response['values'])
            }, (err) => {
                console.log(err)
            },
                () => {
                    console.log(this.cargos)
                    this.mostrarModalPrincipal = false
                    this.showForm = true

                });
    }

    onSubmit(form: FormGroup) {
        this.showMensagem = false

        if (this.colaboradorForm.valid) {
            this.disabledSpinner = true

            this.disabledSaveButton = true
            this.http.post(`${this.baseUrl}/colaboradores`, this.colaboradorForm.value, {
            }).subscribe(response => {
            }, (err) => {
                if (err['status'] == 409) {

                }
                console.log(err['error'].msg)
                this.msgErros = err['error'].msg
                this.showMensagem = true
                this.disabledSaveButton = false
                this.disabledSaveButton = false
            },
                () => {

                    this._helper.openSnackBar('Colaborador salvo com sucesso')
                   // this._helper.CloseModalWithOK();
                    this.dialogRef.close({ clicked: "Ok" });
                    this.disabledSaveButton = false
                });
        }
    }

    // openSnackBar() {
    //     this._snackBar.open('Colaborador salvo com sucesso.', '', {
    //         horizontalPosition: 'center',
    //         verticalPosition: 'top',
    //         panelClass: 'green-snackbar',
    //         duration: 3 * 1000,
    //     });
    // }


    showEndereco = false
    consultaCEP(CEP: string) {
        console.log(CEP);
        if (CEP.length == 10) {


            //var mystring = "crt/r2002_2";
            CEP = CEP.replace('-', '');
            CEP = CEP.replace('.', '');
            console.log(CEP);
            this.http.get(`https://viacep.com.br/ws/${CEP}/json/`, {})
                .subscribe(response => {

                    //  console.log(response)
                    // this.cepReturn = new CepReturn(
                    //     response["logradouro"],
                    //     response["bairro"],
                    //     response["localidade"],
                    //     response["uf"]);
                    //console.log(this.cepReturn)
                    this.colaboradorForm.get('logradouro').setValue(response["logradouro"].toUpperCase());
                    this.colaboradorForm.get('bairro').setValue(response["bairro"].toUpperCase());
                    this.colaboradorForm.get('cidade').setValue(response["localidade"].toUpperCase());
                    this.colaboradorForm.get('uf').setValue(response["uf"].toUpperCase());
                    //this.bairro = this.cepReturn.bairro
                    // const token = (<any>response).accessToken;
                    // console.log(response)
                    // localStorage.setItem("jwt", token);
                    // this.invalidLogin = false;
                    // this.router.navigate(["/main"]);
                }, err => { console.log(err) },
                    () => {
                        //  console.log('finaly')
                        this.showEndereco = true
                    });
        }
    }

    onOkClick() {
        //console.log("I do nothing");
        this.dialogRef.close({ clicked: "Ok" });
    }

    disabledSaveButton = false
    get disabledButton() {
        if (this.colaboradorForm.valid) {
            return this.disabledSaveButton
        } else {
            return true
        }
    }


}