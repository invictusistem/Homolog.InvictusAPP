import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { environment } from "src/environments/environment";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { Aluno } from "src/app/_shared/models/aluno.model";
import { CepReturn } from "src/app/_shared/models/cepreturn.model";
import { Debito, InfoFinanceiras } from "src/app/_shared/models/InfoFinanceiras.model";

@Component({
    selector: 'editfinancmodal',
    templateUrl: './edit-financ.component.html',
    styleUrls: ['./edit-financ.component.scss'],
    animations: [HighlightTrigger]
})

export class EditFinancComponent implements OnInit {

    baseUrl = environment.baseUrl;

    public aluno: any;// = new Aluno();
    public debito: any;//Debito = new Debito();
    public turma: any

    constructor(
        private _fb: FormBuilder,
        private _http: HttpClient,
        private _modal: MatDialog,
        // private _service: PedagService,
        public dialogRef: MatDialogRef<EditFinancComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {

        this.aluno = Object.assign({}, this.data['aluno'])
        this.debito = Object.assign({}, this.data['debito'])
        this.turma = Object.assign({}, this.data['turma'])
        // this.nome = this.data['aluno'].nome
        console.log(this.aluno)
        console.log(this.debito)
        console.log(this.turma)
        //this.getInfoFinancAlunos(this.data['aluno'].id)
    }


    quitar(debitoId) {

        this._http.put(`${this.baseUrl}/financeiro/boleto-pagar/${debitoId}`, {})
            .subscribe(resp => {

            },
                (error) => { console.log(error) },
                () => {
                    this.dialogRef.close({ clicked: "PAGO" })
                })
        //boleto-pagar/{idDebito}

    }

    public cepReturn: CepReturn = new CepReturn();
    //public logradouro = ''
    //public bairro = ''
    public localidade = ''
    public uf = ''


    saveEditAluno() {

        console.log(this.aluno)

        //this.alunoForm.value



    }

    onSubmit(form: FormGroup) {


    }




}