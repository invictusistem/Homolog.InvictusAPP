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

@Component({
    selector: 'infosFinancmodal',
    templateUrl: './infofinanc.component.html',
    //styleUrls: ['./infos.component.scss'],
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
        public dialogRef: MatDialogRef<InfoFinancComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

        this.alunoForm = _fb.group({
            id: [''],
            nome: ['', [Validators.required, Validators.minLength(5)]],
            nomeSocial: [''],
            cpf: ['', [Validators.required, Validators.minLength(5)]],
            rg: ['', [Validators.required, Validators.minLength(5)]],
            nascimento: ['', [Validators.required, Validators.minLength(5)]],
            naturalidade: ['', [Validators.required, Validators.minLength(5)]],
            naturalidadeUF: ['', [Validators.required, Validators.minLength(5)]],
            email: ['', [Validators.required, Validators.minLength(5)]],
            telReferencia: ['', [Validators.required, Validators.minLength(5)]],
            nomeContatoReferencia: ['', [Validators.required, Validators.minLength(5)]],
            cienciaCurso: [''],
            telCelular: ['', [Validators.required, Validators.minLength(5)]],
            telResidencial: [''],
            telWhatsapp: [''],
            cep: ['', [Validators.required, Validators.minLength(5)]],
            logradouro: ['', [Validators.required, Validators.minLength(5)]],
            //logradouro: ['', [Validators.required, Validators.minLength(5)]],
            complemento: ['', [Validators.required, Validators.minLength(5)]],
            cidade: ['', [Validators.required, Validators.minLength(5)]],
            uf: ['', [Validators.required, Validators.minLength(2)]],
            bairro: ['', [Validators.required, Validators.minLength(1)]],
            //cienciaCurso: [''],
            observacoes: [''],
            unidadeCadastrada: [''],
            // responsaveis: ['']
            //temRespFin: ['', [Validators.required,Validators.minLength(5)]],

        })

        this.respFinancForm = _fb.group({
            id: [''],
            nome: ['', [Validators.required, Validators.minLength(2)]],
            cpf: ['', [Validators.required, Validators.minLength(11)]],
            rg: ['', [Validators.required, Validators.minLength(9)]],
            nascimento: ['', [Validators.required]],
            parentesco: ['', [Validators.required]],
            naturalidade: ['', [Validators.required]],
            naturalidadeUF: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.minLength(5)]],
            telCelular: [null, [Validators.minLength(0)]],
            telWhatsapp: [null, [Validators.minLength(10)]],
            telResidencial: [null, [Validators.minLength(9)]],
            cep: ['', [Validators.required, Validators.minLength(8)]],
            logradouro: ['', [Validators.required, Validators.minLength(1)]],
            complemento: [''],
            cidade: ['', [Validators.required, Validators.minLength(1)]],
            uf: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
            bairro: ['', [Validators.required, Validators.minLength(1)]],
            observacoes: ['', [Validators.minLength(1), Validators.maxLength(300)]],
            TipoResponsavel: ['', [Validators.minLength(1), Validators.maxLength(300)]],
        })

        this.respMenorForm = _fb.group({
            id: [''],
            nome: ['', [Validators.required, Validators.minLength(2)]],
            cpf: ['', [Validators.required, Validators.minLength(11)]],
            rg: ['', [Validators.required, Validators.minLength(9)]],
            nascimento: ['', [Validators.required]],
            parentesco: ['', [Validators.required]],
            naturalidade: ['', [Validators.required]],
            naturalidadeUF: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.minLength(5)]],
            telCelular: [null, [Validators.minLength(0)]],
            telWhatsapp: [null, [Validators.minLength(10)]],
            telResidencial: [null, [Validators.minLength(9)]],
            cep: ['', [Validators.required, Validators.minLength(8)]],
            logradouro: ['', [Validators.required, Validators.minLength(1)]],
            complemento: [''],
            cidade: ['', [Validators.required, Validators.minLength(1)]],
            uf: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
            bairro: ['', [Validators.required, Validators.minLength(1)]],
            observacoes: ['', [Validators.minLength(1), Validators.maxLength(300)]],
            TipoResponsavel: ['', [Validators.minLength(1), Validators.maxLength(300)]],
        })
        //this.alunoForm.get('logradouro').disable()
        //this.alunoForm.get('cidade').disable()
        //this.alunoForm.get('uf').disable()
    }

    ngOnInit() {

        this.nome = this.data['aluno'].nome
        console.log(this.data['aluno'])
        this.getInfoFinancAlunos(this.data['aluno'].id)
    }

    getInfoFinancAlunos(alunoId: number){

        this._http.get(`${this.baseUrl}/financeiro/aluno-debitos/v2/${alunoId}`)
        .subscribe(resp => {
            this.debitos = Object.assign([], resp['debitos']);
        },
        (error)=> { console.log(error)},
        () => {
            console.log(this.debitos);
        })
    }

    public boletoUrl = ""

    getBoleto(debs:any){

        this._http.get(`${this.baseUrl}/financeiro/aluno-debitos/aluno-getboletomoq/${debs.boletoId}`)
        .subscribe(resp => {
            console.log(resp['boletoUrl'])
            this.boletoUrl = resp['boletoUrl']
        },
        (error)=> { console.log(error)},
        () => {

            //window.open(this.boletoUrl,'_blank');//
             window.open(this.boletoUrl);
            //console.log(this.debitos);
        })

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

    // onSubmit(form: FormGroup) {
    //     let alunoUpdate = JSON.stringify(this.alunoForm.value)
    //     console.log(alunoUpdate)
    //     this._http.put(`${this.baseUrl}/adm/aluno/1`, alunoUpdate, {
    //         headers: new HttpHeaders({
    //             "Content-Type": "application/json",
    //             "Authorization": "Bear "
    //         })

    //     }).subscribe(resp => {

    //     },
    //         (error) => { console.log(error) },
    //         () => {
    //             this.originalAluno = this.alunoForm.value
    //         })
    // }

    onSubmitMenor(form: FormGroup) {

    }

    sendByEmail(){
        
    }

    openEdit(debs): void {
        const dialogRef = this._modal
            .open(EditFinancComponent, {
                height: 'auto',
            width: '1000px',
            autoFocus: false,
            //maxHeight: '90vh',
            maxWidth:'115vh',

                data: { debito: debs, aluno: this.data['aluno'] },
                hasBackdrop: true,
                disableClose: true
            });

        dialogRef.afterClosed().subscribe(data => {
            console.log(data)
            if (data.clicked === "PAGO") {
                this.getInfoFinancAlunos(this.data['aluno'].id)
                //this.openSnackBar()
                console.log('afte close ok')
            } else if (data.clicked === "Cancel") {
                // Do nothing. Cancel any events that navigate away from the
                // component.
            }

        });
    }


    clicou() {
        console.log('clicou')
    }


}