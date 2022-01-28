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
import { FinanceiroService } from "../../models/financ.service";

@Component({
    selector: 'editfornecedormodal',
    templateUrl: './editfornecedor.component.html',
    styleUrls: ['./editfornecedor.component.scss'],
    animations: [HighlightTrigger]
})

export class EditFornecedorComponent implements OnInit {

    //baseUrl = environment.baseUrl;
    //public cepReturn: CepReturn = new CepReturn();
    public fornecedorForm: FormGroup;
    private jwtHelper = new JwtHelperService();
    public tokenInfo: TokenInfos = new TokenInfos();
    //public validadeEmailMsg = false
    //public validadeCPFMsg = false
    //cargos = Cargos;
    //mensagem = "";
    //showMensagem = false
    public initProgressBar = 'visible'
    public showForm = false
    public saveSpinner = 'hidden'
    fornecedor: any;
    originalFornecedor: any;

    //unidades = Unidades;
    constructor(
        //private _snackBar: MatSnackBar,
        //private router: Router,
        private _fb: FormBuilder,
        private _finService: FinanceiroService,
        //private http: HttpClient,
        public dialogRef: MatDialogRef<EditFornecedorComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

        this.fornecedorForm = _fb.group({
            id: [''],
            razaoSocial: ['', [Validators.required]],
            ie_rg: [''],
            cnpj_cpf: ['', [Validators.required, Validators.minLength(11)]],
            email: ['', [Validators.required, Validators.email]],
            telContato: [''],
            whatsApp: [''],
            nomeContato: ['', [Validators.required]],
            cep: ['', [Validators.required, Validators.minLength(8)]],
            logradouro: ['', [Validators.required]],
            complemento: [''],
            cidade: ['', [Validators.required, Validators.minLength(2)]],
            numero: ['', [Validators.required]],
            uf: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],//,
            bairro: ['', [Validators.required]],
            ativo: [''],
            unidadeId: ['']
        })
    }

    ngOnInit() {

        this.GetFornecedor();
        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)


    }

    private GetFornecedor() {

        this._finService.GetFornecedorById(this.data['fornecedor'])
            .subscribe(
                sucesso => { this.GetFornecedorSucesso(sucesso) },
                falha => { this.GetFornecedorFalha(falha) }
            )
    }

    GetFornecedorSucesso(resp) {
        this.fornecedorForm.patchValue(resp['fornecedor']);
        this.originalFornecedor = JSON.parse(JSON.stringify(this.fornecedorForm.value))
        this.dialogRef.updateSize('680px', '605px')
        //this.dialogRef.addPanelClass('myfornecedoredit-class')
        this.initProgressBar = 'hidden'
        this.showForm = true
    }

    GetFornecedorFalha(error) {
        this.initProgressBar = 'hidden'
    }


    public SaveEdit() {
        if (!this.fornecedorForm.valid) return

        this.saveSpinner = 'visible'

        this._finService.EditFornecedor(this.fornecedorForm.value)
            .subscribe(
                sucesso => { this.SaveEditSucesso(sucesso) },
                falha => { this.SaveEditFalha(falha) }
            )
    }

    private SaveEditSucesso(resp) {
        this.dialogRef.close();
    }

    private SaveEditFalha(error) {

    }

    public ConsultaCEP(CEP: string) {
        //console.log(CEP);
        if (CEP.length == 10) {


            //var mystring = "crt/r2002_2";
            CEP = CEP.replace('-', '');
            CEP = CEP.replace('.', '');
            console.log(CEP);
            this._finService.CepConsulta(CEP)
                .subscribe(response => {

                    this.fornecedorForm.get('logradouro').setValue(response["logradouro"].toUpperCase());
                    this.fornecedorForm.get('bairro').setValue(response["bairro"].toUpperCase());
                    this.fornecedorForm.get('cidade').setValue(response["localidade"].toUpperCase());
                    this.fornecedorForm.get('uf').setValue(response["uf"].toUpperCase());

                }, err => { console.log(err) })
        }
    }

    get disabledButton() {
        console.log(this.fornecedorForm.valid)
        if (this.fornecedorForm.valid &&
            JSON.stringify(this.originalFornecedor) !=
            JSON.stringify(this.fornecedorForm.value)) {
            return this.saveSpinner != 'hidden'
        } else {
            return true
        }
    }
}

