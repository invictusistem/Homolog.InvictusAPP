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
    selector: "estagioedit-app",
    templateUrl: './estagio-edit.component.html',
    styleUrls: ['./estagio-edit.component.scss'],
    animations: [HighlightTrigger]
    //
})

export class EstagioEditComponent implements OnInit {

    baseUrl = environment.baseUrl;
    private jwtHelper = new JwtHelperService();
    tokenInfo: TokenInfos = new TokenInfos();
    //public cepReturn: CepReturn = new CepReturn();
    estagioForm: FormGroup
    public estagio: any;
    public showForm = false;

    constructor(
        private _snackBar: MatSnackBar,
        //private CreateMatriculaModal: MatDialog,
        private _fb: FormBuilder,
        private _http: HttpClient,
        public dialogRef: MatDialogRef<EstagioEditComponent>,
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

        this.GetEstagio();
    }

    GetEstagio() {
        let estagioId = this.data['estagioId'];

        this._http.get(`${this.baseUrl}/estagios/${estagioId}`)
            .subscribe(response => {

                this.estagio = Object.assign({}, response['estagio'])

            },
                (error) => {
                    console.log(error)
                },
                () => {
                    
                    this.showForm = true
                }
            )
    }

    consultaCEP() {
        console.log(this.estagio.cep);
        // console.log(form.controls['cep'].valid);
        // console.log(form.controls['cep'].value)
        let CEP = this.estagio.cep
        if (this.estagio.cep.length == 8) {

            this._http.get(`https://viacep.com.br/ws/${CEP}/json/`, {})
                .subscribe(response => {

                    this.estagio.logradouro = response["logradouro"]
                    this.estagio.bairro = response["bairro"]
                    this.estagio.cidade = response["localidade"]
                    this.estagio.uf = response["uf"]
                }, err => { console.log(err) },
                    () => {

                    });
        }
    }

    onSubmit(form: any) {

        this._http.put(`${this.baseUrl}/estagios/editar`, this.estagio, { })
        .subscribe(response => {

        },
            (error) => {
                console.log(error)
            },
            () => {
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