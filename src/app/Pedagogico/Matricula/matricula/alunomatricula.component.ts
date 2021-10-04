import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { environment } from "src/environments/environment";
import { Turma, TurmaViewModel } from "src/app/_shared/models/Turma.model";

import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { ConfirmMatriculaComponent } from "../confirmmatricula/confirmamat.component";
import { Observable } from "rxjs";
import { DiaVencimento, Parcelas } from "src/app/_shared/models/utils.model";
import { CienciaCurso, submitMatriculaForm } from "../CreateModal/creatematricula.component";

export const MeioPagamento = [
    { type: 'boleto', value: 'Boleto' },
    { type: 'debito', value: 'Cartão - Débito' },
    { type: 'credito', value: 'Cartão - Crédito' },
    { type: 'pix', value: 'Pix' },
    { type: 'dinheiro', value: 'dinheiro' },
]

@Component({
    selector: 'matriculamodal',
    templateUrl: './alunomatricula.component.html',
    styleUrls: ['./alunomatricula.component.scss'],
    animations: [HighlightTrigger]
})

export class AlunoMatriculaComponent implements OnInit {

    baseUrl = environment.baseUrl;

    cursosDisponiveis: TurmaViewModel[] = new Array<TurmaViewModel>();
    turmasParaMatricular: TurmaViewModel[] = new Array<TurmaViewModel>();
    turmaSelecionada: TurmaViewModel = new TurmaViewModel();
    previAtual: string
    previTerminoAtual: string
    cienciaCurso = CienciaCurso
    showTurmas: boolean = false
    //showTurmaSearch: boolean = true
    showTurmaForm: boolean = false
    message: string = ''
    meioPagamento = MeioPagamento
    diaVencimento = DiaVencimento
    parcelas = Parcelas

    public matriculaTurmaForm: FormGroup;

    constructor(
        private _fb: FormBuilder,
        private http: HttpClient,
        public _modal: MatDialog,
        public dialogRef: MatDialogRef<AlunoMatriculaComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

        this.matriculaTurmaForm = _fb.group({
            cienciaCurso: ['', [Validators.required]],
            meioPagamento: [, [Validators.required]],
            //aVista: [false, [Validators.required]],
            primeiraParcPaga: [, [Validators.required]],
            parcelas: ['', [Validators.required, Validators.min(1)]],
            idAlunoIndicacao: [,[Validators.required]],
            diaVencimento:[,Validators.required]
        })

    }

    ngOnInit() {
        this.data['alunoId']
        //this.getCursos(0,0)
        this.consultarCursos()
    }

    getCursos(actualPage: number, pageSize: number) {

        var itemsPerPage = 5;
        var currentPage = 1;

        this.http.get(`${this.baseUrl}/turmas/cursosUnidade`, {
            //this.http.post("http://api.invictustemp.com.thor.hostazul.com.br/api/identity/login", credentials, {

            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Authorization": "Bear "
            })
        }).subscribe(response => {


            console.log(response)
            Object.assign(this.cursosDisponiveis, response)
            console.log(this.cursosDisponiveis)           
        }, err => { console.log(err) },
            () => {

                console.log('metodo getCursos')
                if (this.cursosDisponiveis.length == 0) {
                    //  this.showSelectCursoSearch = false
                    this.message = 'Não turmas com vagas ou disponíveis.'
                } else if (this.cursosDisponiveis.length > 0) {
                    
                }

            });

    }

    // // consultarCursos(item: any){
    mensagemNoTrumas = "";
    showMessageNoTurmas = false;

    consultarCursos() {      

        let item = "Curso Técnico em Enfermagem"

        this.http.get(`${this.baseUrl}/turmas/pesquisa/${this.data['alunoId']}/?curso=${item}`)
            .subscribe(response => {

                console.log(response)
                this.turmasParaMatricular = Object.assign([], response)


            }, err => {
                console.log(err)
                
                this.mensagemNoTrumas = err['error'].message
                this.showMessageNoTurmas = true
            },
                () => {

                    //this.showTurmaSearch =true
                    // this.showTurmas = true

                    console.log(this.turmasParaMatricular)
                    if (this.turmasParaMatricular.length == 0) {
                        // show form vazia

                        // this.dialogRef.updateSize('900px','630px')
                    } else {
                        //this.showTurmaSearch =false
                        this.showTurmas = true
                        // this.dialogRef.updateSize('900px','630px')
                        // atribuir valores ao formControl
                    }

                });

    }


    get shoNParcelar() {
        var value = this.matriculaTurmaForm.get('meioPagamento').value
        // console.log(this.matriculaTurmaForm.get('meioPagamento').value)
        // console.log(this.matriculaTurmaForm.get('parcelas').value)
        // console.log(this.matriculaTurmaForm.get('parcelas').valid)
        // console.log(this.parcelas[0])
        if (value == "cartaoDébito" || 
        value == "pix" || 
         value == "dinheiro" ||
        //value == "boleto" ||
        value == null) {
            return false
        }else{
            return true
        }

        
    }

    ValidateFormasPagamento(){
        if(this.matriculaTurmaForm.get('meioPagamento').valid){

            var meioPag = this.matriculaTurmaForm.get('meioPagamento').value
            if(meioPag == "cartaoCredito" || meioPag == "boleto"){

                if(this.matriculaTurmaForm.get('parcelas').valid && 
                this.matriculaTurmaForm.get('diaVencimento').valid){
                    
                    return true

                }else{
                    return false
                }
            }else{
                return true
            }

        }else{
            return false
        }
        
    }

    searchAluno(value) {

        if (value == "Indicação Aluno") {
            // TOdo search aluno
        }
    }

    submitMatricula(form: FormGroup) {
        console.log(form)
        console.log('sen matrícula')

        var ciencia = this.matriculaTurmaForm.get('cienciaCurso').value

        console.log(this.matriculaTurmaForm.get('primeiraParcPaga').valid)

        if(!this.ValidateFormasPagamento()){
            return
        }   

        this.matriculaTurmaForm.get('primeiraParcPaga').valid
        console.log(this.matriculaTurmaForm.get('cienciaCurso').valid)


        if(!this.matriculaTurmaForm.get('cienciaCurso').valid)return 


        var submitForm = new submitMatriculaForm()

            // TODO CONTRATOID
            submitForm.idAluno = this.data['alunoId']
            submitForm.idTurma = this.turmaSelecionada.id
            submitForm.ciencia = this.matriculaTurmaForm.get('cienciaCurso').value
            submitForm.meioPagamento = this.matriculaTurmaForm.get('meioPagamento').value
            submitForm.parcelas = this.matriculaTurmaForm.get('parcelas').value
            submitForm.primeiraParceJaPaga = this.matriculaTurmaForm.get('primeiraParcPaga').value
            submitForm.diaVencimento = this.matriculaTurmaForm.get('diaVencimento').value
            console.log(submitForm)
            console.log(this.matriculaTurmaForm.get('diaVencimento').value)


            //this.http.post(`${this.baseUrl}/turmas/turma/?idAluno=${this.data['alunoId']}&idTurma=${this.turmaSelecionada.id}&ciencia=${ciencia}`, {
                this.http.post(`${this.baseUrl}/turmas/turma`, submitForm, {
            }).subscribe(
                () => { },
                (error) => { },
                () => {

                    this.confirmMatriculaModal()
                    //this.dialogRef.close({ clicked: "OK" });
                }
            )
       // }
    }


    confirmMatriculaModal(): void {
        const dialogRef = this._modal
            .open(ConfirmMatriculaComponent, {
                height: 'auto',
                width: '400px',

                data: { Hello: "Hello World" },
                hasBackdrop: true,
                disableClose: true
            });
        // dialogRef.afterClosed().subscribe(result => {
        //     console.log('The dialog was closed');
        //     // this.animal = result;
        // });

        dialogRef.afterClosed().subscribe((data) => {
            console.log(data)
            if (data.clicked === "Sim") {
                //this.getCursos(0, 0);
                console.log('clicou no sim')
                this.downloadContrato()
                //this.indexTab = 2

            } else if (data.clicked === "Cancel") {
                console.log('clicou no cancel')
                this.dialogRef.close({ clicked: "cancel" });
            }
        });
    }

    downloadContrato() {
        var file = "Contrato.pdf";// this.createFileName("EXCEL");
        // this.showSpinner = true;
        // this.testehabilitar = false
        console.log('download contrato')
        this.download().subscribe(data => {
            //console.log(data)
            switch (data.type) {
                case HttpEventType.Response:
                    // this.showSpinner = false;
                    //this.downloadStatus.emit( {status: ProgressStatusEnum.COMPLETE});
                    const downloadedFile = new Blob([data.body], { type: data.body.type });
                    const a = document.createElement('a');
                    a.setAttribute('style', 'display:none;');
                    document.body.appendChild(a);
                    a.download = file;
                    a.href = URL.createObjectURL(downloadedFile);
                    a.target = '_blank';
                    a.click();
                    document.body.removeChild(a);
                    break;
            }
        },
            (err) => {
                //this.showSpinner = false;
                //this.testehabilitar = true;
            },
            () => {

                this.dialogRef.close({ clicked: "OK" });
                //this.showSpinner = false;
                // this.testehabilitar = true;
            }
        );
    }

    download(): Observable<HttpEvent<Blob>> {
        return this.http.request(new HttpRequest(
            'GET', `${this.baseUrl}/document/pdf`, null, {
            reportProgress: true,
            responseType: 'blob'
        }));
    }

    selecionarTurma(turma: Turma) {

        console.log(turma)
        Object.assign(this.turmaSelecionada, turma)
        console.log(this.turmaSelecionada)
        // this.hideCursoSearchAndMessage = false
        //this.showSelectCursoSearch = false
        //this.showTableCursosAndamento = false
        //this.showFormFinal = true
        this.previAtual = `${new Date(this.turmaSelecionada.previsaoAtual).toLocaleDateString()}`
        this.previTerminoAtual = `${new Date(this.turmaSelecionada.previsaoTerminoAtual).toLocaleDateString()}`
        this.showTurmas = false
        this.showTurmaForm = true
    }

    voltar() {
        this.showTurmas = true
        //showTurmaSearch: boolean = true
        this.showTurmaForm = false
    }

    fechar() {
        this.dialogRef.close({ clicked: "Ok" });
    }

}