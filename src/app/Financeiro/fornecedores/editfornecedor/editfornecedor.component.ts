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
import { Fornecedor } from "../../FinanceiroModels/fornecedor.model";

@Component({
    selector: 'editfornecedormodal',
    templateUrl: './editfornecedor.component.html',
    //styleUrls: ['./editfornecedor.component.scss'],
    animations: [HighlightTrigger]
})

export class EditFornecedorComponent implements OnInit {
  
    baseUrl = environment.baseUrl;
    public cepReturn: CepReturn = new CepReturn();
    public fornecedorForm: FormGroup;
    private jwtHelper = new JwtHelperService();
    public tokenInfo: TokenInfos = new TokenInfos();
    public validadeEmailMsg = false
    public validadeCPFMsg = false
    cargos = Cargos;
    mensagem = "";
    showMensagem = false
    fornecedor: Fornecedor = new Fornecedor();
    originalFornecedor: Fornecedor = new Fornecedor();
    
    unidades = Unidades;
    constructor(
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fb: FormBuilder,
        private http: HttpClient,
        public dialogRef: MatDialogRef<EditFornecedorComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

        this.fornecedorForm = _fb.group({
            razaoSocial: ['', [Validators.required]],
            ie_rg: ['', [Validators.required]],
            cnpj_cpf: ['', [Validators.required, Validators.minLength(11)]],
            email: ['', [Validators.required, Validators.email]],
            telContato: ['', [Validators.required, Validators.minLength(9)]],
            whatsApp: ['', [Validators.required, Validators.minLength(9)]],
            nomeContato: ['', [Validators.required]],
            cep: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(8)]],
            logradouro: [''],
            complemento: [''],
            cidade: ['', [Validators.required, Validators.minLength(2)]],
            uf: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(2)]],//,
            bairro: ['', [Validators.required]],//,
            observacoes: ['']//,
            
        })
    }

    ngOnInit() {
        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)
        // console.log(this.tokenInfo.Unidade);
        // console.log(this.tokenInfo.Codigo);
        // console.log(this.tokenInfo);
        this.fornecedorForm.get('email').setErrors({ 'incorrect': true });
        this.fornecedorForm.get('cnpj_cpf').setErrors({ 'incorrect': true });
        this.originalFornecedor = Object.assign({}, this.data['fornecedor'])
        this.fornecedor = Object.assign({}, this.data['fornecedor'])
        

        
    }
   

    onSubmit(form: FormGroup) {
       
        if (form.valid) {
          

            this.http.put(`${this.baseUrl}/adm/fornecedor`, this.fornecedor, {
            }).subscribe(response => {

                console.log(response)
               
            }, (err) => { console.log(err) },
                () => {
                    this.data['fornecedor'] = this.fornecedor
                    this.dialogRef.close({ clicked: "Ok", changeEntity: this.fornecedor });
                });
        }
    }

    fechar(){

        this.fornecedor = this.originalFornecedor
        this.data['fornecedor'] = this.originalFornecedor
        this.dialogRef.close({ clicked: "Cancel" });

    }

    openSnackBar() {
        this._snackBar.open('Colaborador salvo com sucesso.', '', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'green-snackbar',
            duration: 3 * 1000,
        });
    }

    buscarEmail(event: any) {
        if (this.fornecedorForm.get('email').valid) {
            this.validadeEmailMsg = false
            this.http.get(`${this.baseUrl}/adm/aluno/email/${event.target.value}`, {
            }).subscribe(response => {

            }, (err) => {
                if (err['status'] == 409) {
                    this.validadeEmailMsg = true
                    this.fornecedorForm.get('email').setErrors({ 'incorrect': true });
                }
            },
                () => {
                    this.fornecedorForm.get('email').setErrors(null);
                });
        }
    }

    buscarCPF(event: any) {
        // console.log(event.target.value)
        console.log(this.fornecedorForm.get('cnpj_cpf').value)
        console.log(this.fornecedorForm.get('cnpj_cpf').valid)
        console.log(this.fornecedorForm.get('cnpj_cpf').value.length)
        if (this.fornecedorForm.get('cnpj_cpf').valid) {
            this.validadeCPFMsg = false
            let cpf = this.fornecedorForm.get('cnpj_cpf').value
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
                    this.fornecedorForm.get('cnpj_cpf').setErrors({ 'incorrect': true });
                }
            },
                () => {
                    this.fornecedorForm.get('cnpj_cpf').setErrors(null);
                });
        }
    }
   

    consultaCEP(CEP: string) {
     

        this.http.get(`https://viacep.com.br/ws/${CEP}/json/`, {})
            .subscribe(response => {
                this.fornecedorForm.get('logradouro').setValue(response["logradouro"]);
                this.fornecedorForm.get('bairro').setValue(response["bairro"]);
                this.fornecedorForm.get('cidade').setValue(response["localidade"]);
                this.fornecedorForm.get('uf').setValue(response["uf"]);
                
            }, err => { console.log(err) },
                () => { });
    }

    onOkClick() {
        //console.log("I do nothing");
        this.dialogRef.close({ clicked: "Ok" });
    }
    
}