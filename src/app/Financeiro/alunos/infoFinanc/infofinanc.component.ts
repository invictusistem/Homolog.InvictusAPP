import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { environment } from "src/environments/environment";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { Aluno } from "src/app/_shared/models/aluno.model";
import { CepReturn } from "src/app/_shared/models/cepreturn.model";
import { Debito, InfoFinanceiras } from "src/app/_shared/models/InfoFinanceiras.model";
import { EditFinancComponent } from "./EditFinanc/edit-financ.component";
import { ReceberComponent } from "./Receber/receber.component";
import { ReceberComponentModal } from "../../models/financ-modal.config";
import { HelpersService } from "src/app/_shared/components/helpers/helpers.component";

@Component({
    selector: 'infosFinancmodal',
    templateUrl: './infofinanc.component.html',
    styleUrls: ['./infofinanc.component.scss'],
    animations: [HighlightTrigger]
})

export class InfoFinancComponent implements OnInit {

    baseUrl = environment.baseUrl;
    tabs = ['Financeiro', 'Responsável Financeiro', 'Responsável (menor)'
        , 'Financeiro', 'Documentação'];

    public showAluno: boolean = false
    public showRespFinanc: boolean = false
    public showRespMenor: boolean = false
    public nome: string = ''
    public aluno: any;// = new any Aluno = new Aluno();
    public debitos: any[] = new Array<any>();// Debito[] = new Array<Debito>();
    public turma: any;
    public initialSpinner = 'visible'
public showcontent = false
    public originalAluno: any
    public originalRespFin: any
    public originalRespMenor: any

    private respFinId: number = 0;
    private respMenorId: number = 0;

    // public alunoForm: FormGroup;
    // public respFinancForm: FormGroup;
    // public respMenorForm: FormGroup;

    constructor(
        private _helper: HelpersService,
        private _fb: FormBuilder,
        private _http: HttpClient,
        private _modal: MatDialog,
        // private _service: PedagService,
        public dialogRef: MatDialogRef<InfoFinancComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {


    }

    ngOnInit() {

        this.nome = this.data['aluno'].nome
       // console.log(this.data['aluno'])
        this.aluno = Object.assign({}, this.data['aluno'])
        this.GetInfoFinancAlunos(this.data['aluno'].matriculaId)
    }

    private GetInfoFinancAlunos(matriculaId) {
        this.initialSpinner = 'visible'
        this._http.get(`${this.baseUrl}/financeiro/debitos/${matriculaId}`)
            .subscribe(resp => {
                this.debitos = Object.assign([], resp['debitos']);
                this.turma = Object.assign({}, resp['turma']);
                //console.log(this.debitos)
            },
                (error) => { 
                    this._helper.openSnackBarErrorDefault()
                    this.showcontent = false
                    this.initialSpinner = 'hidden'
                    //console.log(error)
                 },
                () => {
                    this.dialogRef.addPanelClass('infofinanc-class')
                    this.showcontent = true
                    this.initialSpinner = 'hidden'
                  //  console.log(this.debitos);
                })
    }

    public boletoUrl = ""

    getBoleto(debs: any) {


        window.open(debs.linkBoleto);


        // this._http.get(`${this.baseUrl}/financeiro/aluno-debitos/aluno-getboletomoq/${debs.boletoId}`)
        // .subscribe(resp => {
        //     console.log(resp['boletoUrl'])
        //     this.boletoUrl = resp['boletoUrl']
        // },
        // (error)=> { console.log(error)},
        // () => {

        //      window.open(this.boletoUrl);
        // })

    }

    sendByEmail(debs) {

    }

    openEdit(debs): void {
        const dialogRef = this._modal
            .open(EditFinancComponent, {
                height: 'auto',
                width: '1000px',
                //autoFocus: false,
                //maxHeight: '90vh',
               // maxWidth: '115vh',

                data: { debito: debs, aluno: this.data['aluno'], turma: this.turma },
                hasBackdrop: true,
                disableClose: true
            });

        dialogRef.afterClosed().subscribe(data => {
           // console.log(data)
            if (data.clicked === "PAGO") {
               // this.GetInfoFinancAlunos(this.data['aluno'].id)
                //this.openSnackBar()
              //  console.log('afte close ok')
            } else if (data.clicked === "Cancel") {
                // Do nothing. Cancel any events that navigate away from the
                // component.
            }

        });
    }

    receber(debs): void {
        const dialogRef = this._modal
            .open(ReceberComponent, ReceberComponentModal(debs, this.aluno));
        dialogRef.afterClosed().subscribe((data) => {

            if(data.clicked == true){
                this.GetInfoFinancAlunos(this.data['aluno'].matriculaId)
            }

        });
    }



}