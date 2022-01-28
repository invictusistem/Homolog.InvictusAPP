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
import { Cargo } from "../../Adm-Models/cargos.model";

@Component({
    selector: 'createprofessormodal',
    templateUrl: './createprofessor.component.html',
    styleUrls: ['./createprofessor.component.scss'],
    animations: [HighlightTrigger]
})

export class CreateProfessorComponent implements OnInit {

    baseUrl = environment.baseUrl;
    public cepReturn: CepReturn = new CepReturn();
    public colaboradorForm: FormGroup;
    private jwtHelper = new JwtHelperService();
    public tokenInfo: TokenInfos = new TokenInfos();
    public validadeEmailMsg = false
    public validadeCPFMsg = false
    public disabledSpinner = false
    //cargos = Cargos;
    mensagem = "";
    showMensagem = false
    //public bairro: string = null;
    //@Input() disabled = true;
    unidades = Unidades;//: string[] = new Array("Campo Grande II", "Jacarepaguá");
    constructor(
        //private service: AdmService,
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fb: FormBuilder,
        private http: HttpClient,
        public dialogRef: MatDialogRef<CreateProfessorComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.colaboradorForm = _fb.group({
            // templateName: ['', [Validators.required, Validators.minLength(5)]],
            // newCat: [,[Validators.required, Validators.minLength(3)]],
            // newFunc: [, [Validators.required, Validators.minLength(3)]]
            nome: ['', [Validators.required, Validators.minLength(5)]],
            email: ['', [Validators.required, Validators.email]],
            cpf: ['', [Validators.required, Validators.minLength(11)]],
            celular: [null, [Validators.required, Validators.minLength(5)]],
            cargoId: [0, [Validators.required]],
            ativo: [true, [Validators.required]],
            cep: ['', [Validators.required, Validators.minLength(8)]],
            logradouro: ['', [Validators.required, Validators.minLength(1)]],
            complemento: [''],
            numero: ['', [Validators.required]],
            cidade: ['', [Validators.required, Validators.minLength(1)]],
            uf: ['', [Validators.required, Validators.minLength(2)]],
            bairro: ['', [Validators.required, Validators.minLength(1)]]//,
            //celular: [new MyTel('', '', ''), [Validators.required, Validators.minLength(1)]]
        })
    }

    ngOnInit() {
        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)
        console.log(this.tokenInfo.Unidade);
        console.log(this.tokenInfo.Codigo);
        console.log(this.tokenInfo);
    }
    showForm = false
    // showForm = false
    cargos: Cargo[] = new Array<Cargo>()
    getCargos() {

        this.http.get(`${this.baseUrl}/unidade/cargo`)
            .subscribe(response => {
                this.cargos = Object.assign([], response)
            }, (err) => {
                console.log(err)
            },
                () => {
                    console.log(this.cargos)
                    // this.showForm = true
                });
    }


    disabledSaveButton = false
    get disabledButton() {
        if (this.colaboradorForm.valid) {
            return this.disabledSaveButton
        } else {
            return true
        }
    }

    onSubmit(form: FormGroup) {
        this.showMensagem = false
        console.log(form)
        console.log(form.value)
        console.log(form.valid)
        //var cel = `${form['celular'].value}`
        //console.log(cel)
        // this.dialogRef.close();
        if (this.colaboradorForm.valid) {
            //  this.disabledSpinner = true
            // console.log('form valid')
            // const novoColaborador = JSON.stringify(form.value);
            //this.save(novoColaborador)
            // let newTemplate = this.mapForm(tempForm)
            this.disabledSaveButton = true
            this.http.post(`${this.baseUrl}/professor`, this.colaboradorForm.value, {})
                .subscribe(response => {

                    console.log(response)
                    // this.colaboradores = Object.assign([], response['data'])
                    // console.log(this.colaboradores)
                    // this.dialogRef.close();
                }, (err) => {
                    console.log(err)
                    this.disabledSpinner = false
                    console.log(err['error'].mensagem)
                    this.mensagem = err['error'].mensagem
                    this.showMensagem = true
                    this.disabledSaveButton = true
                },
                    () => {
                        //console.log(response)
                        this.openSnackBar()

                        //this.showMensagem = false
                        this.dialogRef.close({ clicked: "Ok" });
                        this.disabledSaveButton = true
                    });
        }
    }

    openSnackBar() {
        this._snackBar.open('Professor salvo com sucesso.', '', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'green-snackbar',
            duration: 3 * 1000,
        });
    }

    buscarEmail(event: any) {
        if (this.colaboradorForm.get('email').valid) {
            this.validadeEmailMsg = false
            this.http.get(`${this.baseUrl}/adm/aluno/email/${event.target.value}`, {
                headers: new HttpHeaders({
                    "Content-Type": "application/json",
                    "Authorization": "Bear "
                })
            }).subscribe(response => {

            }, (err) => {
                if (err['status'] == 409) {
                    this.validadeEmailMsg = true
                    this.colaboradorForm.get('email').setErrors({ 'incorrect': true });
                }
            },
                () => {
                    this.colaboradorForm.get('email').setErrors(null);
                });

            //this.colaboradorForm.get('email').setErrors({ 'incorrect': true });

        }
    }

    buscarCPF(event: any) {
        // console.log(event.target.value)
        console.log(this.colaboradorForm.get('cpf').value)
        console.log(this.colaboradorForm.get('cpf').valid)
        console.log(this.colaboradorForm.get('cpf').value.length)
        if (this.colaboradorForm.get('cpf').valid) {
            this.validadeCPFMsg = false
            let cpf = this.colaboradorForm.get('cpf').value
            //this.http.get(`${this.baseUrl}/adm/aluno/cpf/${event.target.value}`, {
            this.http.get(`${this.baseUrl}/adm/aluno/cpf/${cpf}`, {
                headers: new HttpHeaders({
                    "Content-Type": "application/json",
                    "Authorization": "Bear "
                })
            }).subscribe(response => {

            }, (err) => {
                if (err['status'] == 409) {
                    this.validadeCPFMsg = true
                    this.colaboradorForm.get('cpf').setErrors({ 'incorrect': true });
                }
            },
                () => {
                    this.colaboradorForm.get('cpf').setErrors(null);
                });

            //this.colaboradorForm.get('email').setErrors({ 'incorrect': true });

        }
    }
    // https://viacep.com.br/ws/01001000/json/
    showEndereco = false
    consultaCEP(CEP: string) {
        console.log(CEP);

        this.http.get(`https://viacep.com.br/ws/${CEP}/json/`, {

        }
        )
            .subscribe(response => {

                console.log(response)
                // this.cepReturn = new CepReturn(
                //     response["logradouro"],
                //     response["bairro"],
                //     response["localidade"],
                //     response["uf"]);
                //console.log(this.cepReturn)
                this.colaboradorForm.get('logradouro').setValue(response["logradouro"]);
                this.colaboradorForm.get('bairro').setValue(response["bairro"]);
                this.colaboradorForm.get('cidade').setValue(response["localidade"]);
                this.colaboradorForm.get('uf').setValue(response["uf"]);
                //this.bairro = this.cepReturn.bairro
                // const token = (<any>response).accessToken;
                // console.log(response)
                // localStorage.setItem("jwt", token);
                // this.invalidLogin = false;
                // this.router.navigate(["/main"]);
            }, err => { console.log(err) },
                () => {
                    console.log('finaly')
                    this.showEndereco = true
                });
    }

    onOkClick() {
        //console.log("I do nothing");
        this.dialogRef.close({ clicked: "Ok" });
    }

}