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
    selector: 'boletimalunomodal',
    templateUrl: './boletimaluno.component.html',
    styleUrls: ['./boletimaluno.component.scss'],
    animations: [HighlightTrigger]
})

export class BoletimAlunoComponent implements OnInit {

    baseUrl = environment.baseUrl;
    tabs = ['Financeiro', 'Responsável Financeiro', 'Responsável (menor)'
        , 'Financeiro', 'Documentação'];

    public showAluno: boolean = false
    public showRespFinanc: boolean = false
    public showRespMenor: boolean = false
    public nome: string = ''
    public aluno: Aluno = new Aluno();
    public debitos: Debito[] = new Array<Debito>();

    public originalAluno: any
    public originalRespFin: any
    public originalRespMenor: any

    private respFinId: number = 0;
    private respMenorId: number = 0;

    public alunoForm: FormGroup;
    public respFinancForm: FormGroup;
    public respMenorForm: FormGroup;

    constructor(
        private _fb: FormBuilder,
        private _http: HttpClient,
        private _modal: MatDialog,
        // private _service: PedagService,
        public dialogRef: MatDialogRef<BoletimAlunoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {


    }

    ngOnInit() {

        console.log(this.data['aluno'])
      this.aluno = this.data['aluno']
      this.GetBoletim(this.data['aluno'].id)
    }

    notasBoletim: any[] = new Array<any>();
    private GetBoletim(alunoId){

        this._http.get(`${this.baseUrl}/pedag/notasboletim/0/${alunoId}`)
        .subscribe(resp => {
            this.notasBoletim = resp['boletim']
        },
        (error) => { console.log(error)},
        () => { 

        })
    }


}