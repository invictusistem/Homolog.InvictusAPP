import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, Inject, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AdmService } from "src/app/Adm/services/adm.services";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { HelpersService } from "src/app/_shared/components/helpers/helpers.component";
import { CepReturn } from "src/app/_shared/models/cepreturn.model";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { environment } from "src/environments/environment";
import { PedagogicoService } from "../../service/pedagogico.service";

@Component({
    selector: "estagioedit-app",
    templateUrl: './estagio-edit.component.html',
    styleUrls: ['./estagio-edit.component.scss'],
    animations: [HighlightTrigger]
    //
})

export class EstagioEditComponent implements OnInit {

    //baseUrl = environment.baseUrl;
    private jwtHelper = new JwtHelperService();
    tokenInfo: TokenInfos = new TokenInfos();
    //public cepReturn: CepReturn = new CepReturn();
    public initProgressBar = 'visible'
    public saveBar = 'hidden'
    private originalEstagio: any
    public estagioForm: FormGroup
    //public estagio: any;
    //public showForm = false;

    constructor(
        //private _snackBar: MatSnackBar,
        //private CreateMatriculaModal: MatDialog,
        private _pedagService: PedagogicoService,
        private _helper: HelpersService,
        private _admService: AdmService,
        private _fb: FormBuilder,
        //private _http: HttpClient,
        public dialogRef: MatDialogRef<EstagioEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
        //private CreateColaboradoresModal: MatDialog,
        //private EditColaboradoresModal: MatDialog
    ) {
        this.estagioForm = _fb.group({
            id:[''],
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
        
        this.GetEstagio();
    }

    GetEstagio() {

        this._pedagService.GetEstagio(this.data['estagio'].id)
            .subscribe(
                sucesso => { this.GetEstagioSucesso(sucesso) },
                falha => { this.GetEstagioFalha(falha) }
            )
    }

    private GetEstagioSucesso(response){
        
        this.estagioForm.patchValue(response['estagio']);
        this.originalEstagio = JSON.parse(JSON.stringify(this.estagioForm.value))
        this.dialogRef.addPanelClass('myestagioedit-class')
        this.initProgressBar = 'hidden'
    }

    private GetEstagioFalha(error){
        this.initProgressBar = 'hidden'
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

                       // this.styleVisibilityEndereco = 'visible'
                    });
        }
    }

    get desabilitar() {
          
        if (this.estagioForm.valid &&
            JSON.stringify(this.originalEstagio) !=
            JSON.stringify(this.estagioForm.value)) {

            return this.saveBar != 'hidden'
        } else {
            return true
        }
}

    public Salvar(form: any) {
        // console.log(this.estagioForm.value)
         if (this.estagioForm.valid) {
             this.saveBar = 'visible'
             this._pedagService.EditEstagio(this.estagioForm.value)
                 .subscribe(
                     sucesso => { this.SalvarSucesso() },
                     falha => { this.SalvarFalha(falha) }
                 )
         }
     }
 
     private SalvarSucesso() {
         this._helper.openSnackBarSucesso('Estágio editado com sucesso')
         this.dialogRef.close({ clicked: true });
     }
 
     private SalvarFalha(error) {
         this.saveBar = 'hidden'
         // if (err['status'] == 409) {
         //     this.msgErros = err['error'].msg
         //     this.showMensagem = 'visible'
         //     this.disabledSaveButton = 'hidden'
         // }else{
         //     this._helper.openSnackBarErrorDefault()
 
         //      this.dialogRef.close({ clicked: "Ok" });
         // }
     } 
}