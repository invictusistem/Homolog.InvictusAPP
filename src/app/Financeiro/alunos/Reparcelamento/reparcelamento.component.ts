import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { environment } from "src/environments/environment";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { Aluno } from "src/app/_shared/models/aluno.model";
import { CepReturn } from "src/app/_shared/models/cepreturn.model";
import { Debito, InfoFinanceiras } from "src/app/_shared/models/InfoFinanceiras.model";
import { ConfirmarParcelamento } from "./Confirmar/reapconfirmar.component";


@Component({
    selector: 'reparcelamentomodal',
    templateUrl: './reparcelamento.component.html',
    //styleUrls: ['./infos.component.scss'],
    animations: [HighlightTrigger]
})

export class ReparcelamentoComponent implements OnInit {

    baseUrl = environment.baseUrl;
    tabs = ['Financeiro', 'Responsável Financeiro', 'Responsável (menor)'
        , 'Financeiro', 'Documentação'];

    public showAluno: boolean = false
    public showRespFinanc: boolean = false
    public showRespMenor: boolean = false
    public nome: string = ''
    public aluno: Aluno = new Aluno();
    // public debitos: Debito[] = new Array<Debito>();
    public debitos: ReparcelamentoDebito[] = new Array<ReparcelamentoDebito>();
    public turma: any
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
        public dialogRef: MatDialogRef<ReparcelamentoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {

        this.nome = this.data['aluno'].nome
        console.log(this.data['aluno'])
        this.getInfoFinancAlunos(this.data['aluno'].matriculaId)
    }

    getInfoFinancAlunos(matriculaId) {

        this._http.get(`${this.baseUrl}/financeiro/debitos/${matriculaId}`)
            .subscribe(resp => {
                this.debitos = Object.assign([], resp['debitos']);
                this.turma = Object.assign({}, resp['turma']);
                this.debitos.forEach(element => {

                    element.selected = false;

                });
            },
                (error) => { console.log(error) },
                () => {
                    console.log(this.debitos);
                })
    }

    public boletoUrl = ""

    public cepReturn: CepReturn = new CepReturn();

    public localidade = ''
    public uf = ''


    saveEditAluno() {

        console.log(this.aluno)

    }

    valorEntrada = 0
    parcelas = 0

    juros = 0
    desconto = 0
    acrescimo = 0

    totalValor = 0
    get totalSelecionado() {
        //console.log('parcelar')
        this.totalValor = 0
        this.debitos.forEach(element => {
            if (element.selected == true) {
                this.totalValor += element.valor
            }
        });
        //console.log(`R$ ${this.totalValor.toFixed(2)}`)
        return `R$ ${this.totalValor.toFixed(2)}`
    }

    totalFinal = 0
    get totalParcelar() {
        //console.log('parcelar')
        this.totalFinal = this.totalValor + this.juros - this.desconto + this.acrescimo

        return `R$ ${this.totalFinal.toFixed(2)}`
    }

    //vencimento: any;


    vencimento: any
    onFocusOutDateEvent(event: any) {
        var data;

        if (event.target.value.length == 10) {
            var data = event.target.value.split('/')
            console.log(data)
            var dataForm: Date = new Date(parseInt(data[2]), parseInt(data[1]) - 1,
                parseInt(data[0]))

            this.vencimento = dataForm.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })//dataForm.getDay
            //this.valor = dataForm//.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })//dataForm.getDay
        }


    }

    debitosIds: any[] = new Array<any>()

    calcular(): void {
        this.debitos.forEach(element => {
            if (element.selected == true) {
                this.totalValor += element.valor
                this.debitosIds.push(element.id)
            }
        });
        console.log(this.debitosIds)
        const dialogRef = this._modal
            .open(ConfirmarParcelamento, {
                height: 'auto',
                width: '600px',
                autoFocus: false,
               // maxHeight: '90vh',

                data: { totalFinal: this.totalFinal, debitosIds: this.debitosIds,
                    parcelas: this.parcelas, vencimento: this.vencimento,
                valorEntrada: this.valorEntrada },
                hasBackdrop: true,
                disableClose: true
            });

        dialogRef.afterClosed().subscribe(data => {
            this.getInfoFinancAlunos(this.data['aluno'].id)

            if (data.clicked === "Ok") {
                this.getInfoFinancAlunos(this.data['aluno'].id)
            } else if (data.clicked === "Cancel") {
                
            }
        });
    }
}












export class ReparcelamentoDebito {
    constructor(
        public id?: string,
        public vencimento?: Date,
        public dataPagamento?: Date,
        public valor?: number,
        public valorPago?: number,
        public juros?: number,
        public jurosFixo?: number,
        public multa?: string,
        public multaFixo?: string,
        public desconto?: string,
        public diasDesconto?: string,
        public statusBoleto?: string,
        public reparcelamentoId?: string,
        public centroCustoUnidadeId?: string,
        public informacaoDebitoId?: string,
        //public BoletoResponseInfo InfoBoletos { get; private set; }
        public  id_unico?: string,
        public id_unico_original?: string,
        public status?: string,
        public msg?: string,
        public nossonumero?: string,
        public linkBoleto?: string,
        public linkGrupo?: string,
        public linhaDigitavel?: string,
        public pedido_numero?: string,
        public banco_numero?: string,
        public token_facilitador?: string,
        public credencial?: string,
        public selected?: boolean
    ) {

    }
}