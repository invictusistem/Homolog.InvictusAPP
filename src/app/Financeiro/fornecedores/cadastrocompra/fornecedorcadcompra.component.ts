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
import { MeioPagamento } from "src/app/Pedagogico/Matricula/CreateModal/creatematricula.component";
import { DatePipe } from "@angular/common";

@Component({
    selector: 'fornecedorcadvendamodal',
    templateUrl: './fornecedorcadcompra.component.html',
   // styleUrls: ['./createfornecedor.component.scss'],
    animations: [HighlightTrigger]
})

export class FornecedorCompraComponent implements OnInit {
  
    baseUrl = environment.baseUrl;
    public cepReturn: CepReturn = new CepReturn();
    public fornecedorForm: FormGroup;
    private jwtHelper = new JwtHelperService();
    public tokenInfo: TokenInfos = new TokenInfos();
    public fornecedor: Fornecedor = new Fornecedor();
    public validadeEmailMsg = false
    public validadeCPFMsg = false
    cargos = Cargos;
    mensagem = "";
    showMensagem = false
    meioPagamento = MeioPagamento
    
    unidades = Unidades;
    constructor(
        private _datepipe: DatePipe,
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fb: FormBuilder,
        private http: HttpClient,
        public dialogRef: MatDialogRef<FornecedorCompraComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

        this.fornecedorForm = _fb.group({
            dataVencimento: ['', [Validators.required]],
            valor: ['', [Validators.required]],
            comentario: [''],
            meioPagamento: ['',[Validators.required]],
            descricaoTransacao: ['', [Validators.required]],
            //comentario: [''],
            // nomeContato: ['', [Validators.required]],
            // cep: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(8)]],
            // logradouro: [''],
            // complemento: [''],
            // cidade: ['', [Validators.required]],
            // uf: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(2)]],//,
            // bairro: ['', [Validators.required]],//,
            // observacoes: ['']//,
            
        })
    }

    ngOnInit() {
        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)
        this.fornecedor = Object.assign({}, this.data['fornecedor']);

        // console.log(this.tokenInfo.Unidade);
        // console.log(this.tokenInfo.Codigo);
        // console.log(this.tokenInfo);
       // this.fornecedorForm.get('email').setErrors({ 'incorrect': true });
        //this.fornecedorForm.get('cnpj_cpf').setErrors({ 'incorrect': true });
        
    }
    dataVencimento:any;
    onFocusOutDateEvent(event: any) {
        if (event.target.value.length == 10) {
            var data = event.target.value.split('/')
            var dataForm: Date = new Date(parseInt(data[2]), parseInt(data[1]) - 1,
                parseInt(data[0]), 0, 0, 0)

            this.dataVencimento = dataForm.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })//dataForm.getDay

            this.fornecedorForm.get('dataVencimento').setValue(dataForm.toJSON())
        } else {
            this.fornecedorForm.get('dataVencimento').setValue('')
        }
    }

    onSubmit(form: FormGroup) {

       
        console.log(form.value)
        if (form.valid) {
          
            //const novofornecedor = JSON.stringify(form.value);

           // console.log(novofornecedor)


            this.http.post(`${this.baseUrl}/financeiro/fornecedor-contas-pagar/?fornecedorId=${this.data['fornecedor'].id}`, form.value, {
            }).subscribe(response => {

                //console.log(response)
               
            }, (err) => { console.log(err) },
                () => {
                    
                    this.dialogRef.close({ clicked: "Ok" });
                });
        }
    }

    openSnackBar() {
        this._snackBar.open('Colaborador salvo com sucesso.', '', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'green-snackbar',
            duration: 3 * 1000,
        });
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