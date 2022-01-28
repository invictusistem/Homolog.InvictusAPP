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
import { FinanceiroService } from "../../models/financ.service";

@Component({
    selector: 'createfornecedormodal',
    templateUrl: './createfornecedor.component.html',
    styleUrls: ['./createfornecedor.component.scss'],
    animations: [HighlightTrigger]
})

export class CreateFornecedorComponent implements OnInit {
  
    baseUrl = environment.baseUrl;
    public saveSpinner = 'hidden'
    public enderecoContainer = 'hidden'
    public cepReturn: CepReturn = new CepReturn();
    public fornecedorForm: FormGroup;
    private jwtHelper = new JwtHelperService();
    public tokenInfo: TokenInfos = new TokenInfos();
    public validadeEmailMsg = false
    public validadeCPFMsg = false
    cargos = Cargos;
    mensagem = "";
    showMensagem = false
    
    unidades = Unidades;
    constructor(
        private _snackBar: MatSnackBar,
        private _finService: FinanceiroService,
        //private router: Router,
        private _fb: FormBuilder,
        private _http: HttpClient,
        public dialogRef: MatDialogRef<CreateFornecedorComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

        this.fornecedorForm = _fb.group({
            razaoSocial: ['', [Validators.required]],
            ie_rg: [''],
            cnpj_cpf: ['', [Validators.required, Validators.minLength(11)]],
            email: ['', [Validators.required, Validators.email]],
            telContato: [''],
            whatsApp: [''],
            nomeContato: ['', [Validators.required]],
            cep: ['', [Validators.required, Validators.minLength(8)]],
            logradouro: [''],
            complemento: [''],
            numero: ['', [Validators.required]],
            cidade: ['', [Validators.required]],
            uf: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(2)]],//,
            bairro: ['', [Validators.required]],//,
            ativo:[true],
            unidadeId:['']
        })
    }

    ngOnInit() {
        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)
        this.fornecedorForm.get('unidadeId').setValue(this.tokenInfo.UnidadeId)
        // console.log(this.tokenInfo.Unidade);
        // console.log(this.tokenInfo.Codigo);
        // console.log(this.tokenInfo);
       // this.fornecedorForm.get('email').setErrors({ 'incorrect': true });
        //this.fornecedorForm.get('cnpj_cpf').setErrors({ 'incorrect': true });
        
    }
   

    onSubmit(form) {

       
       // console.log(form.value)
        if (this.fornecedorForm.valid) {

            this.saveSpinner = 'visible'
          
            this._finService.SaveFornecedor(this.fornecedorForm.value)
                .subscribe(
                    sucesso => { this.onSubmitSucess(sucesso) },
                    falha => { this.onSubmitFalha(falha) }
                )}
    }

    onSubmitSucess(resposta){
        this.saveSpinner = 'hidden'
        this.dialogRef.close({})
    }

    onSubmitFalha(error){
        this.saveSpinner = 'hidden'
    }

    openSnackBar() {
        this._snackBar.open('Colaborador salvo com sucesso.', '', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'green-snackbar',
            duration: 3 * 1000,
        });
    }

    get disabledButton(){

        if(this.fornecedorForm.valid){
            return this.saveSpinner != 'hidden'
        }else{
            return true
        }
    }

    // buscarEmail(event: any) {
    //     if (this.fornecedorForm.get('email').valid) {
    //         this.validadeEmailMsg = false
    //         this.http.get(`${this.baseUrl}/adm/aluno/email/${event.target.value}`, {
    //         }).subscribe(response => {

    //         }, (err) => {
    //             if (err['status'] == 409) {
    //                 this.validadeEmailMsg = true
    //                 this.fornecedorForm.get('email').setErrors({ 'incorrect': true });
    //             }
    //         },
    //             () => {
    //                 this.fornecedorForm.get('email').setErrors(null);
    //             });
    //     }
    // }

    // buscarCPF(event: any) {
    //     // console.log(event.target.value)
    //     console.log(this.fornecedorForm.get('cnpj_cpf').value)
    //     console.log(this.fornecedorForm.get('cnpj_cpf').valid)
    //     console.log(this.fornecedorForm.get('cnpj_cpf').value.length)
    //     if (this.fornecedorForm.get('cnpj_cpf').valid) {
    //         this.validadeCPFMsg = false
    //         let cpf = this.fornecedorForm.get('cnpj_cpf').value
    //         //this.http.get(`${this.baseUrl}/adm/aluno/cpf/${event.target.value}`, {
    //         this.http.get(`${this.baseUrl}/adm/aluno/cpf/${cpf}`, {
    //             headers: new HttpHeaders({
    //                 "Content-Type": "application/json",
    //                 "Authorization": "Bear "
    //             })
    //         }).subscribe(response => {

    //         }, (err) => {
    //             if (err['status'] == 409) {
    //                 this.validadeCPFMsg = true
    //                 this.fornecedorForm.get('cnpj_cpf').setErrors({ 'incorrect': true });
    //             }
    //         },
    //             () => {
    //                 this.fornecedorForm.get('cnpj_cpf').setErrors(null);
    //             });
    //     }
    // }
   

    consultaCEP(CEP: string) {
        console.log(CEP);
        if (this.fornecedorForm.get('cep').valid) {


            //var mystring = "crt/r2002_2";
            CEP = CEP.replace('-', '');
            CEP = CEP.replace('.', '');
            console.log(CEP);
            this._http.get(`https://viacep.com.br/ws/${CEP}/json/`, {})
                .subscribe(response => {

                    this.fornecedorForm.get('logradouro').setValue(response["logradouro"].toUpperCase());
                    this.fornecedorForm.get('bairro').setValue(response["bairro"].toUpperCase());
                    this.fornecedorForm.get('cidade').setValue(response["localidade"].toUpperCase());
                    this.fornecedorForm.get('uf').setValue(response["uf"].toUpperCase());
                    
                }, err => { console.log(err) },
                    () => {
                        //  console.log('finaly')
                      //  this.showEndereco = true
                    });
        }
    }

    onOkClick() {
        //console.log("I do nothing");
        this.dialogRef.close({ clicked: "Ok" });
    }
    
}