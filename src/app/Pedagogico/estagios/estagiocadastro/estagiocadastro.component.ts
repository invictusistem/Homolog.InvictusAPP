import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, Inject, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AdmService } from "src/app/Adm/Services/adm.services";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { HelpersService } from "src/app/_shared/components/helpers/helpers.component";
import { CepReturn } from "src/app/_shared/models/cepreturn.model";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { environment } from "src/environments/environment";
import { PedagogicoService } from "../../service/pedagogico.service";

@Component({
    selector: "estagiocadastro-app",
    templateUrl: './estagiocadastro.component.html',
    styleUrls: ['./estagiocadastro.component.scss'],
    animations: [HighlightTrigger]
})

export class EstagioCadastroComponent implements OnInit {

    private jwtHelper = new JwtHelperService();
    tokenInfo: TokenInfos = new TokenInfos();
    public disabledSaveButton = 'hidden'
    public styleVisibilityEndereco = 'hidden'
    public estagioForm: FormGroup

    constructor(
        private _helper: HelpersService,
        private _admService: AdmService,
        private _pedagService: PedagogicoService,
        private _fb: FormBuilder,
        public dialogRef: MatDialogRef<EstagioCadastroComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.estagioForm = _fb.group({
            nome: ["", [Validators.required]],
            dataInicio: ["", [Validators.required]],
            vagas: ["", [Validators.required]],
            cnpj: ["", [Validators.required, Validators.minLength(14)]],
            cep: ['', [Validators.required, Validators.minLength(8)]],
            logradouro: ['', [Validators.required, Validators.minLength(1)]],
            numero: ['', [Validators.required]],
            complemento: [''],
            cidade: ['', [Validators.required, Validators.minLength(1)]],
            uf: ['', [Validators.required, Validators.minLength(2)]],
            bairro: ['', [Validators.required, Validators.minLength(1)]],
            ativo: [true]
        })

    }


    ngOnInit() {


        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)
    }


    consultaCEP(CEP: string) {
        if (this.estagioForm.get('cep').valid) {


            this._admService.CepConsulta(this.estagioForm.get('cep').value)
                .subscribe(response => {

                    this.estagioForm.get('logradouro').setValue(response["logradouro"].toUpperCase());
                    this.estagioForm.get('bairro').setValue(response["bairro"].toUpperCase());
                    this.estagioForm.get('cidade').setValue(response["localidade"].toUpperCase());
                    this.estagioForm.get('uf').setValue(response["uf"].toUpperCase());

                }, err => {
                    this._helper.openSnackBarError('Ocorreu um erro ao pesquisas o CEP. Procure o administrador do sistema.')
                },
                    () => {

                        this.styleVisibilityEndereco = 'visible'
                    });
        }
    }

    get saveButtom() {
        if (this.estagioForm.valid) {
            return this.disabledSaveButton != 'hidden'
        } else {
            return true
        }
    }

    public Salvar(form: any) {
       // console.log(this.estagioForm.value)
        if (this.estagioForm.valid) {
            this.disabledSaveButton = 'visible'
            this._pedagService.AddEstagio(this.estagioForm.value)
                .subscribe(
                    sucesso => { this.SalvarSucesso() },
                    falha => { this.SalvarFalha(falha) }
                )
        }
    }

    private SalvarSucesso() {
        this._helper.openSnackBarSucesso('Estágio salvo com sucesso')
        this.dialogRef.close({ clicked: true });
    }

    private SalvarFalha(error) {
        this.disabledSaveButton = 'hidden'
        // if (err['status'] == 409) {
        //     this.msgErros = err['error'].msg
        //     this.showMensagem = 'visible'
        //     this.disabledSaveButton = 'hidden'
        // }else{
        //     this._helper.openSnackBarErrorDefault()

        //      this.dialogRef.close({ clicked: "Ok" });
        // }
    }

    valor: any
    onFocusOutDateEvent(event: any) {
        var data;

        if (event.target.value.length == 10) {
            var data = event.target.value.split('/')
            //console.log(data)
            var dataForm: Date = new Date(parseInt(data[2]), parseInt(data[1]) - 1,
                parseInt(data[0]))
            this.estagioForm.get('dataInicio').setValue(dataForm)
            this.valor = dataForm.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })//dataForm.getDay
            //this.valor = dataForm//.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })//dataForm.getDay
        }

    }
}