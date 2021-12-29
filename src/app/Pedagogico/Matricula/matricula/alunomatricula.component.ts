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
import { SpinnerParams } from "src/app/_shared/models/spinner.model";

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

    infoSpinner: SpinnerParams = {
        diameter: 100,
        marginleft: 42.5,
        margintop: 10
    }

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
    public respMenor: FormGroup;
    public respFinForm: FormGroup;
    public temRespFinm: FormGroup;
    public planoPgmAluno: FormGroup

    constructor(
        private _fb: FormBuilder,
        private http: HttpClient,
        public _modal: MatDialog,
        public dialogRef: MatDialogRef<AlunoMatriculaComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

        this.planoPgmAluno = _fb.group({
            //descricao: ['', [Validators.required]],
            valor: [0.00, [Validators.required]],
            taxaMatricula: [0.00, [Validators.required]],
            confirmacaoPagmMat: [false, [Validators.required]],
            bonusPontualidade: [0.00, [Validators.required]],
            parcelas: [22, [Validators.required]],
            planoId: ['', [Validators.required]],
            diaDefault: [''],
            valorParcela: [0, [Validators.required, Validators.min(1)]],
            infoParcelas: ['']
            // temRespFin: [false]
            /*
            
             
            */

        })


        this.temRespFinm = _fb.group({
            temRespFin: [false]
        })




        this.respFinForm = _fb.group({
            nome: ['', [Validators.required, Validators.minLength(2)]],
            tipo: ['Responsável financeiro'],
            cpf: ['', [Validators.required, Validators.minLength(11)]],
            rg: ['', [Validators.required]],
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
            numero: [''],
            complemento: [''],
            cidade: ['', [Validators.required, Validators.minLength(1)]],
            uf: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
            bairro: ['', [Validators.required, Validators.minLength(1)]],
            // observacoes: ['', [Validators.minLength(1), Validators.maxLength(300)]]

        })


        this.respMenor = _fb.group({

            nome: ['', [Validators.required, Validators.minLength(2)]],
            tipo: ['Responsável menor'],
            cpf: ['', [Validators.required, Validators.minLength(11)]],
            rg: ['', [Validators.required]],
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
            numero: [''],
            complemento: [''],
            cidade: ['', [Validators.required, Validators.minLength(1)]],
            uf: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
            bairro: ['', [Validators.required, Validators.minLength(1)]],
            // observacoes: ['', [Validators.minLength(1), Validators.maxLength(300)]],

            //temRespFin: [false]

        })
        this.matriculaTurmaForm = _fb.group({
            responsave: []
            // cienciaCurso: ['', [Validators.required]],
            // meioPagamento: [, [Validators.required]],
            // primeiraParcPaga: [, [Validators.required]],
            // parcelas: ['', [Validators.required, Validators.min(1)]],
            // idAlunoIndicacao: [, [Validators.required]],
            // diaVencimento: [, Validators.required]
        })

    }

    ngOnInit() {
        this.data['aluno']
        // console.log(this.data['aluno'])

        this.hidden = 'visible'
        //this.getCursos(0,0)
        this.consultarCursos()
    }

    modelChanged(newObj) {
        // console.log(newObj.checked)
        this.temRespFinm.get('temRespFin').setValue(newObj.checked);
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


            //   console.log(response)
            Object.assign(this.cursosDisponiveis, response)
            //console.log(this.cursosDisponiveis)
        }, err => { console.log(err) },
            () => {

                //  console.log('metodo getCursos')
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
    typePacotes: any[] = new Array<any>()
    showSelectedTypes = false
    showMessageNoTypes = false
    mensagemNoType = ""
    mostrarModalPrincipal = true
    consultarCursos() {

        this.http.get(`${this.baseUrl}/pedag/matricula/${this.data['aluno'].id}`)
            .subscribe(response => {
                this.typePacotes = Object.assign([], response)['types']

            }, err => {
                //  console.log(err)
                this.hidden = 'hidden'
                if (err['error'].status == 404) {
                    this.mensagemNoType = "Não há cursos disponíveis para o aluno.";
                }
                this.showMessageNoTypes = true
            },
                () => {
                    this.planoPgmAluno.get('valorParcela').setValue(1000.50)
                    this.planoPgmAluno.get('valorParcela').disable()
                    this.GetDefaultDay()
                    this.mostrarModalPrincipal = false
                    this.showSelectedTypes = true
                    this.hidden = 'hidden'

                });
    }



    get valorParcela() {

        var preco = parseFloat('1000')
        // var precoFloat = preco.toFixed(2)
        //console.log(precoFloat)
        let precofinal = preco.toFixed(2)

        let parcelas = this.planoPgmAluno.get('parcelas').value

        let valorTotal = this.planoPgmAluno.get('valor').value

        let valorParcela = parseFloat(valorTotal) / parseFloat(parcelas)

        let parcela = valorParcela.toFixed(2)

        return parcela
    }

    turmas: any[] = new Array<any>()
    showTurmasEncontradas = false
    hidden = 'hidden'
    pesquisarTurmas(typeId) {
        //console.log(typeId)
        this.hidden = 'visible'
        this.showTurmasEncontradas = false
        this.http.get(`${this.baseUrl}/turma/${typeId}`)
            .subscribe(response => {
                this.turmas = Object.assign([], response['turmas'])

            }, err => {
                //  console.log(err['error'].status)
                this.hidden = 'hidden'
                if (err['error'].status == 404) {
                    this.mensagemNoTrumas = "Não há turmas disponíveis para o tipo de curso nesta unidade";
                }

                // this.mensagemNoTrumas = err['error'].message
                this.showMessageNoTurmas = true
            },
                () => {
                    this.hidden = 'hidden'
                    this.showTurmasEncontradas = true
                    // this.dialogRef.addPanelClass('myalunomat-class')
                });


    }

    turma: any
    showMatriculaContainer = false
    planos: any[]
    menorIdade = false
    showContent = false
    buscar(turmaId) {
        this.hidden = 'visible'
        this.http.get(`${this.baseUrl}/turma/get/${turmaId}/${this.data['aluno'].id}`)
            .subscribe(response => {

                this.turma = Object.assign({}, response['turma'])
                this.planosPgm = Object.assign([], response['planos'])
                this.menorIdade = response['menor']
                // console.log(this.menorIdade)
                if (!this.menorIdade) {
                    this.respMenor.disable()
                }

            }, err => {
                // console.log(err)
                this.hidden = 'hidden'
                this.mensagemNoTrumas = err['error'].message
                this.showMessageNoTurmas = true
            },
                () => {
                    this.hidden = 'hidden'

                    this.dialogRef.addPanelClass('myalunomat-class')
                    this.showContent = true
                    // this.showSelectedTypes = false
                    //this.showMatriculaContainer = true
                });

    }

    voltar() {
        this.showSelectedTypes = true
        this.showMatriculaContainer = false
        this.respFinForm.reset()
        this.respFinForm.reset()
    }






    consultaCEPFin(cep) {
        // console.log(CEP);

        if (this.respFinForm.get('cep').valid) {
            this.http.get(`https://viacep.com.br/ws/${cep}/json/`, {})
                .subscribe(response => {
                    //   console.log(response["logradouro"])

                    this.respFinForm.get('logradouro').setValue(response["logradouro"].toUpperCase());
                    this.respFinForm.get('bairro').setValue(response["bairro"].toUpperCase());
                    this.respFinForm.get('cidade').setValue(response["localidade"].toUpperCase());
                    this.respFinForm.get('uf').setValue(response["uf"].toUpperCase());

                }, err => {
                    //  console.log(err)
                },
                    () => {
                        // console.log('finaly')
                        //this.showDivEndereco = true
                    });
        }
    }

    get respFinvalid() {
        // console.log(this.respFinForm.valid)
        return true
    }

    consultaCEPRespMenor(cep) {
        // console.log(CEP);

        if (this.respMenor.get('cep').valid) {
            this.http.get(`https://viacep.com.br/ws/${cep}/json/`, {})
                .subscribe(response => {

                    this.respMenor.get('logradouro').setValue(response["logradouro"].toUpperCase());
                    this.respMenor.get('bairro').setValue(response["bairro"].toUpperCase());
                    this.respMenor.get('cidade').setValue(response["localidade"].toUpperCase());
                    this.respMenor.get('uf').setValue(response["uf"].toUpperCase());

                }, err => {
                    //console.log(err)
                },
                    () => {
                        // console.log('finaly')
                        //this.showDivEndereco = true
                    });
        }
    }

    get respmenorvalid() {
        // console.log(this.respMenor.valid)
        return true
    }

    planosPgm: any[] = new Array<any>();
    verPlano = false
    showPlano = false
    //todasparcelas: any[] = new Array<any>();

    get todasparcelas() {

        let parcelas = new Array<any>()
        let qntParcelas = this.planoPgmAluno.get('parcelas').value
        for (let index = 0; index < qntParcelas; index++) {

            parcelas.push({
                parcelaNo: index + 1,
                vencimento: this.setData(index),
                valor: this.valorParcela
            })
        }


        return parcelas

    }

    setData(number) {

        // let dateNow = new Date();
        // let initialDate = new Date()
        // initialDate.setDate(10)

        // if (dateNow.getDate() > 10) {
        //     initialDate.setMonth(initialDate.getMonth() + 1)
        // } else {

        // }

        // console.log(initialDate)
        // this.planoPgmAluno.get('diaDefault').setValue(initialDate)
        let data = new Date(this.planoPgmAluno.get('diaDefault').value)
        data.setMonth(data.getMonth() + number)
        return data

    }


    buscaPlanoPgm(planoId) {
        this.verPlano = false
        this.http.get(`${this.baseUrl}/plano-pagamento/${planoId}`)
            .subscribe(response => {

                this.planoSelecionado = Object.assign([], response)['plano']

            }, err => {
                // console.log(err)

                //this.mensagemNoTrumas = err['error'].message
                //this.showMessageNoTurmas = true
            },
                () => {
                    this.verPlano = true
                    //console.log(this.planoSelecion ado)   
                    console.log(this.planoSelecionado)

                    this.planoPgmAluno.get('valor').setValue(this.planoSelecionado.valor)
                    this.planoPgmAluno.get('taxaMatricula').setValue(this.planoSelecionado.taxaMatricula)
                    this.planoPgmAluno.get('bonusPontualidade').setValue(this.planoSelecionado.bonusPontualidade)
                    //  this.planoPgmAluno.get('parcelas').setValue(this.planoSelecionado.parcelas)
                    this.planoPgmAluno.get('planoId').setValue(this.planoSelecionado.id)
                    this.showPlano = true
                    /*
                                        valor
                    taxaMatricula
                    bonusPontualidade
                    parcelas
                    planoId
                    */

                });
    }

    visPrevia() {

    }

    get verValidPln() {
        // console.log(this.planoPgmAluno.valid)
        return true
    }

    submeter() {
        console.log(this.respMenor.value)
    }

    // onFocusEvent(event){

    //     console.log(this.planoPgmAluno.get('parcelas').value)

    //     let parcelas = this.planoPgmAluno.get('parcelas').value

    //     let valorTotal = this.planoPgmAl uno.get('parcelas').value
    // }


    planoSelecionado: any
    // get verPlano() {
    //     console.log(this.planoSelecionado)

    //     if (this.planoSelecionado == undefined) {
    //         return false
    //     } else {
    //         return true
    //     }

    // }

    disabldSaveButton = false
    // get disabledButton(){


    //     return disabldSaveButton
    // }

    salvarMat() {
        this.planoPgmAluno.get('infoParcelas').setValue(this.todasparcelas)
        console.log(this.planoPgmAluno.value)
        if (!this.planoPgmAluno.valid) return
        if (this.menorIdade) {
            if (!this.respMenor.valid) return
        }

        if (this.temRespFinm.get('temRespFin').value) {
            if (!this.respFinForm.valid) return
        }
        this.disabldSaveButton = true
        console.log(this.planoPgmAluno.value)
        let form = {
            plano: this.planoPgmAluno.value,
            menorIdade: this.menorIdade,
            respMenor: this.respMenor.value,
            temRespFin: this.temRespFinm.get('temRespFin').value,
            respFin: this.respFinForm.value,
        }

        this.http.post(`${this.baseUrl}/pedag/matricula/${this.turma.id}/${this.data['aluno'].id}`, form, {})
            .subscribe(response => {

            }, err => {
                console.log(err)


            },
                () => {

                    this.dialogRef.close({ clicked: "Ok" });
                });

    }



    diaDefault
    GetDefaultDay() {

        let dateNow = new Date();
        let initialDate = new Date()
        initialDate.setDate(10)

        if (dateNow.getDate() > 10) {
            initialDate.setMonth(initialDate.getMonth() + 1)
        } else {

        }

        console.log(initialDate)
        this.planoPgmAluno.get('diaDefault').setValue(initialDate)

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
        } else {
            return true
        }


    }

    ValidateFormasPagamento() {
        if (this.matriculaTurmaForm.get('meioPagamento').valid) {

            var meioPag = this.matriculaTurmaForm.get('meioPagamento').value
            if (meioPag == "cartaoCredito" || meioPag == "boleto") {

                if (this.matriculaTurmaForm.get('parcelas').valid &&
                    this.matriculaTurmaForm.get('diaVencimento').valid) {

                    return true

                } else {
                    return false
                }
            } else {
                return true
            }

        } else {
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

        if (!this.ValidateFormasPagamento()) {
            return
        }

        this.matriculaTurmaForm.get('primeiraParcPaga').valid
        console.log(this.matriculaTurmaForm.get('cienciaCurso').valid)


        if (!this.matriculaTurmaForm.get('cienciaCurso').valid) return


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



    fechar() {
        this.dialogRef.close({ clicked: "Ok" });
    }

}