import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, Inject, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { CepReturn } from "src/app/_shared/models/cepreturn.model";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { environment } from "src/environments/environment";

@Component({
    selector: "estagiocadastro-app",
    templateUrl: './estagiocadastro.component.html',
    styleUrls: ['./estagiocadastro.component.scss'],
    animations: [HighlightTrigger]
    //
})

export class EstagioCadastroComponent implements OnInit {

    baseUrl = environment.baseUrl;
    private jwtHelper = new JwtHelperService();
    tokenInfo: TokenInfos = new TokenInfos();
    //public cepReturn: CepReturn = new CepReturn();
    estagioForm: FormGroup

    constructor(
        private _snackBar: MatSnackBar,
        //private CreateMatriculaModal: MatDialog,
        private _fb: FormBuilder,
        private _http: HttpClient,
        public dialogRef: MatDialogRef<EstagioCadastroComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
        //private CreateColaboradoresModal: MatDialog,
        //private EditColaboradoresModal: MatDialog
    ) {
        this.estagioForm = _fb.group({
            nome: ["", [Validators.required]],
            dataInicio: ["", [Validators.required]],
            vagas: ["", [Validators.required]],
            //trimestre: ["",[Validators.required]],
           // inicio: ['', [Validators.required]],
            cep: ['', [Validators.required, Validators.minLength(8)]],
            logradouro: ['', [Validators.required, Validators.minLength(1)]],
            numero: ['', [Validators.required]],
            complemento: [''],
            cidade: ['', [Validators.required, Validators.minLength(1)]],
            uf: ['', [Validators.required, Validators.minLength(2)]],
            bairro: ['', [Validators.required, Validators.minLength(1)]]//,
        })

    }


    ngOnInit() {


        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)
    }


    consultaCEP(CEP: string, form) {
        console.log(CEP);
        console.log(form.controls['cep'].valid);
        console.log(form.controls['cep'].value)
        if (form.controls['cep'].valid) {

            this._http.get(`https://viacep.com.br/ws/${CEP}/json/`, {})
                .subscribe(response => {

                    // console.log(response)
                    form.get('logradouro').setValue(response["logradouro"]);
                    form.get('bairro').setValue(response["bairro"]);
                    form.get('cidade').setValue(response["localidade"]);
                    form.get('uf').setValue(response["uf"]);
                }, err => { console.log(err) },
                    () => {
                        // console.log('finaly') 
                    });
        }
    }

    onSubmit(form: any) {

        this._http.post(`${this.baseUrl}/estagios`, this.estagioForm.value, {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Authorization": "Bear "
            })
        }).subscribe(response => {

        },
            (error) => {
                console.log(error)
                //this.disabledSpinner = false
            },
            () => {
               // this.estagioForm.reset();
               // this.cepReturn = new CepReturn();
                this.dialogRef.close({ clicked: "OK" });

            }
        )
    }

    valor: any
    onFocusOutDateEvent(event: any) {
        var data;
       
        if (event.target.value.length == 10) {
          var data = event.target.value.split('/')
          console.log(data)
          var dataForm: Date = new Date(parseInt(data[2]), parseInt(data[1]) - 1,
            parseInt(data[0]))
         this.estagioForm.get('dataInicio').setValue(dataForm)
          this.valor = dataForm.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })//dataForm.getDay
          //this.valor = dataForm//.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })//dataForm.getDay
        }
    
      }
}