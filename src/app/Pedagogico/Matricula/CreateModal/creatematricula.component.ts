import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest } from "@angular/common/http";
import { CepReturn } from "src/app/_shared/models/cepreturn.model";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

import { Aluno, DataTrans, IValidateForms } from "src/app/_shared/models/aluno.model";
import { ConfirmModalComponent } from "../confirmDialog/confirm.component";
import { Turma, TurmaViewModel } from "src/app/_shared/models/Turma.model";
import { MyDate } from "src/app/_shared/customMasks/maskDate/nyDate.model";
import { MyTel } from "src/app/_shared/customMasks/maskTelBr/mytel.model";
import { Cargos, Unidades } from "src/app/_shared/models/perfil.model";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { ConfirmMatriculaComponent } from "../confirmmatricula/confirmamat.component";
import { Observable } from "rxjs";
import { DiaVencimento, Parcelas } from "src/app/_shared/models/utils.model";
//import { CheckedRespFinanc, CheckedRespMenor, CienciaCurso, Parentesco, RespostaResFinanceiro } from "src/app/_shared/models/utils.model";
//import { TemplateTasks } from 'src/app/shared/models/templateTasks.model';

export const Parentesco = [
    { type: 'pais', value: 'Pai/Mãe' },
    { type: 'filhos', value: 'Filho/Filha' },
    { type: 'avos', value: 'Avô/Avó' },
    { type: 'sobrinhos', value: 'Sobinho(a)' },
    { type: 'tio', value: 'Tio(a)' },
    { type: 'conjuge', value: 'Conjugê' },
    { type: 'irmao', value: 'Irmão/Irmã' }

]

export const RespostaResFinanceiro = [
    { type: true, value: 'Sim' },
    { type: false, value: 'Não' }
]

export const CienciaCurso = [
    { type: 'Balcão', value: 'Balcão' },
    { type: 'Indicação Aluno', value: 'Indicação Aluno' },
    { type: 'Rádio', value: 'Rádio' },
    { type: 'Vendendor Externo', value: 'Vendendor Externo' },
    { type: 'Outros', value: 'Outros' }
]

export const MeioPagamento = [
    { type: 'boleto', value: 'Boleto' },
    { type: 'debito', value: 'Cartão - Débito' },
    { type: 'credito', value: 'Cartão - Crédito' },
    { type: 'pix', value: 'Pix' },
    { type: 'dinheiro', value: 'Dinheiro' },
]


export const Cursos = [
    { type: 'Enfermagem', value: 'Técnico em Enfermagem' },
    { type: 'Necropsia', value: 'Aux. Necrópsia' }
]

export const CheckedRespFinanc = {
    sim: true, nao: false
}

export const CheckedRespMenor = {
    sim: true, nao: false
}

@Component({
    selector: 'creatematriculamodal',
    templateUrl: './creatematricula.component.html',
    styleUrls: ['./creatematricula.component.scss'],
    animations: [HighlightTrigger]
})

export class CreateMatriculaComponent implements OnInit, OnDestroy {


    /*           show tabs  CLENA WITH DESTROY  */
    showSerch = true
    showAlunoResponseList = false
    showFormCadastro = false
    showFormCadastroTab = false
    showPerguntaRespFinanc = true
    checkedRespFinanc = CheckedRespFinanc
    checkedRespMenor = CheckedRespMenor
    parcelas = Parcelas
    diaVencimento = DiaVencimento
    showFormRespFinanc = false
    showTabMenorIdade = false
    showMatricula = false
    showSelectCursoSearch = false
    hideCursoSearchAndMessage = true
    showTableCursosAndamento = false
    showFormFinal = false

    mensagem = "";
    showMensagem = false

    idAlunoCadastradoRetorno: number = 0; //mudar depois pra GUID

    showEndercoField = false
    /*           END */
    alunoCriadoId: number = null;
    dataTrans: DataTrans = new DataTrans();
    alunoSelecionadoDoCadastro: Aluno = new Aluno()
    cienciaCurso = CienciaCurso
    meioPagamento = MeioPagamento
    dataHoje: Date;
    parentesco = Parentesco
    cursoPesquisa = Cursos
    //tabspayment: any
    haTurmas = false
    dataTeste: Date = new Date();
    indexTab: number = 0

    baseUrl = environment.baseUrl;
    public cepReturn: CepReturn = new CepReturn();
    public cepReturn2: CepReturn = new CepReturn();
    public cepReturn3: CepReturn = new CepReturn();

    cargos = Cargos;
    respFinanceiro = RespostaResFinanceiro;
    alunoResponse: Aluno[] = new Array<Aluno>();
    showParcelas = true

    previAtual: string
    previTerminoAtual: string


    cursos: Turma[] = new Array<Turma>()
    // turmaAndamento: Turma[] = new Array<Turma>();
    turmaAndamento: TurmaViewModel[] = new Array<TurmaViewModel>();
    messageturmas: boolean = false
    //public bairro: string = null;
    //@Input() disabled = true;
    selectedForm: FormGroup
    unidades = Unidades;//: string[] = new Array("Campo Grande II", "Jacarepaguá");
    // @Output() newItemEvent = new EventEmitter<string>();
    // addNewItem(value: string) {
    //     this.newItemEvent.emit(value);
    //     console.log(value)
    //   }
    public cpfForm: FormGroup;
    public colaboradorForm: FormGroup;
    public responsavelFinancForm: FormGroup;
    public responsavelMenorForm: FormGroup;
    public matriculaTurmaForm: FormGroup;

    constructor(
        //private service: AdmService,
        @Inject('ValidateForms') private _validateFomService: IValidateForms,

        private CreateMatriculaModal: MatDialog,
        private ConfirmModal: MatDialog,
        private router: Router,
        private _fb: FormBuilder,
        private http: HttpClient,
        public dialogRef: MatDialogRef<CreateMatriculaComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.selectedForm = _fb.group({
            selecionar: new FormControl(0)
        })

        this.cpfForm = _fb.group({
            cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]]
        })

        this.colaboradorForm = _fb.group({
            nome: ['', [Validators.required, Validators.minLength(2)]],
            nomeSocial: [''],
            cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
            rg: ['', [Validators.required]],
            nascimento: ['', [Validators.required]],
            naturalidade: ['', [Validators.required]],
            naturalidadeUF: ['', [Validators.required]],
            temRespFin: [false, [Validators.required]],
            email: ['', [Validators.required, Validators.minLength(5), Validators.email]],
            telReferencia: [null, [Validators.minLength(0)]],
            nomeContatoReferencia: ['', [Validators.required, Validators.minLength(2)]],
            telCelular: [null, [Validators.minLength(0)]],
            telWhatsapp: [null, [Validators.minLength(10)]],
            telResidencial: [null, [Validators.minLength(9)]],
            cep: ['', [Validators.required, Validators.minLength(8)]],
            logradouro: ['', [Validators.required, Validators.minLength(1)]],
            complemento: [''],
            cidade: ['', [Validators.required, Validators.minLength(1)]],
            uf: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
            bairro: ['', [Validators.required, Validators.minLength(1)]],
            cienciaCurso: [''],
            unidadeCadastrada: [0],
            observacoes: ['', [Validators.minLength(1), Validators.maxLength(300)]]
        })

        this.responsavelFinancForm = _fb.group({
            nome: ['', [Validators.required, Validators.minLength(2)]],
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
            complemento: [''],
            cidade: ['', [Validators.required, Validators.minLength(1)]],
            uf: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
            bairro: ['', [Validators.required, Validators.minLength(1)]],
            observacoes: ['', [Validators.minLength(1), Validators.maxLength(300)]]
        })

        this.responsavelMenorForm = _fb.group({
            nome: ['', [Validators.required, Validators.minLength(2)]],
            cpf: ['', [Validators.required, Validators.minLength(11)]],
            rg: ['', [Validators.required]],
            nascimento: ['', [Validators.required]],
            parentesco: ['', [Validators.required]],
            naturalidade: ['', [Validators.required]],
            naturalidadeUF: ['', [Validators.required]],
            eRespFinanc: [true, [Validators.required]],
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
            observacoes: ['', [Validators.minLength(1), Validators.maxLength(300)]]
        })

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

    // markAvista() {
    //     let value: boolean = this.matriculaTurmaForm.get('aVista').value
    //     this.matriculaTurmaForm.get('aVista').setValue(!value)
    //     console.log(this.matriculaTurmaForm.get('aVista').value)
    //     this.showParcelas = !this.matriculaTurmaForm.get('aVista').value
    // }

    markPrimeiraParc() {
        let value: boolean = this.matriculaTurmaForm.get('primeiraParcPaga').value
        this.matriculaTurmaForm.get('primeiraParcPaga').setValue(!value)
        console.log(this.matriculaTurmaForm.get('primeiraParcPaga').value)
        this.showParcelas = !this.matriculaTurmaForm.get('primeiraParcPaga').value
    }

    // let fileToUpload = <File>files[0];
    //    const formData = new FormData();
    //    formData.append('file', fileToUpload, fileToUpload.name);

    getValue() {
        //console.log(this.colaboradorForm.get('nascimento').value)
        return new MyDate('', '', '')
    }
    ngOnDestroy() {
        console.log('destroy')
        this.showSerch = true
        this.showAlunoResponseList = false
        this.showFormCadastro = false
        this.showFormCadastroTab = false
        this.showPerguntaRespFinanc = true
        this.checkedRespFinanc.sim = true// = CheckedRespFinanc
        this.checkedRespFinanc.nao = false// = CheckedRespFinanc
        this.checkedRespMenor.sim = true// CheckedRespMenor
        this.checkedRespMenor.nao = false// = CheckedRespMenor
        this.showFormRespFinanc = false
        this.showTabMenorIdade = false
        this.showMatricula = false
        this.showSelectCursoSearch = false
        this.showTableCursosAndamento = false
        this.showFormFinal = false
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

    ngOnInit() {
        //this.showFormCadastro = false;
        //this.tabspayment = Tabs.filter(tabs => tabs);
        //this.temRespFinanceiro = true;
        //this.colaboradorForm.get['temRespFinanceiro'].set(false)
        //this.dataHoje = new Date()
        //console.log(this.dataHoje)
        this.colaboradorForm.get('email').setErrors({ 'incorrect': true });
    }


    onInputChange(event) {
        console.log(event)
        let newVal = event.replace(/\D/g, '');
        // if (backspace && newVal.length <= 6) {
        //   newVal = newVal.substring(0, newVal.length - 1);
        // }
        if (newVal.length === 0) {
            newVal = '';
        } else if (newVal.length <= 3) {
            newVal = newVal.replace(/^(\d{0,3})/, '$1');
        } else if (newVal.length <= 6) {
            newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '$1.$2');
        } else if (newVal.length <= 9) {
            newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,3})/, '$1.$2.$3');
        } else if (newVal.length <= 11) {
            newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/, '$1.$2.$3-$4');
        } else {
            newVal = newVal.substring(0, 11);
            newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/, '$1.$2.$3-$4');
        }
        return newVal;
    }

    atualCPF: string = "";
    resposta: any
    HasMessage: any
    consulta(form: FormGroup) {
        //console.log(`${email}+${cpf}+${nome}`)
        console.log(this.cpfForm.value)
        console.log(this.cpfForm.valid)
        if (!this.cpfForm.valid) {
            // TODO: sendo form alert: selecionar ao menos um
            return;
        }
        this.showMensagem = false

        let cpf = this.cpfForm.get('cpf').value
        console.log(cpf)
        //this.atualCPF = cpf
        this.http.get(`${this.baseUrl}/matricula/?query=${cpf}`)
            //this.http.get(`${this.baseUrl}/matricula/?email=${email}&cpf=${cpf}&nome=${nome}`)
            .subscribe(response => {
                //console.log(response['message'])
                this.resposta = response
                // console.log(this.resposta['message'] == null)
                this.HasMessage = response['message']
                //this.alunoResponse = Object.assign([], response)

            }, err => { console.log(err) },
                () => {
                    console.log(this.alunoResponse)

                    if (this.HasMessage != "") {

                        this.showMensagem = true
                        this.mensagem = this.resposta['message']
                        console.log(this.mensagem)
                    } else {
                        //if (this.alunoResponse.length == 0) {
                        // show form vazia

                        //this.atualCPF = cpf
                        this.atualCPF = this.onInputChange(this.cpfForm.get('cpf').value);
                        console.log(this.atualCPF)
                        this.colaboradorForm.get('cpf').setValue(this.cpfForm.get('cpf').value)

                        this.showSerch = false
                        this.showFormCadastro = true
                        this.showFormCadastroTab = true

                        // this.dialogRef.updateSize('900px','630px')
                        // } else if (this.alunoResponse.length == 1) {
                        // this.showSerch = false
                        // this.showFormCadastro = true
                        // this.showFormCadastroTab = true
                        // this.dialogRef.updateSize('900px','630px')
                        // atribuir valores ao formControl
                        // } else if (this.alunoResponse.length > 1) {
                        //this.showAlunoResponseList = true
                        //this.dialogRef.updateSize('900px','auto')
                        //}
                    }

                });
    }



    voltar() {
        this.hideCursoSearchAndMessage = false
        this.showSelectCursoSearch = false
        this.showTableCursosAndamento = true
        this.showFormFinal = false
    }

    selecionarAluno(aluno: Aluno) {
        console.log(aluno)
        this.showAlunoResponseList = false
        this.showFormCadastro = true
        this.showFormCadastroTab = true
        this.showSerch = false
    }

    searchAluno(value) {

        if (value == "Indicação Aluno") {
            // TOdo search aluno
        }
    }

    onFocusOutDateEvent(event: any) {
        console.log(event.target.value);
        console.log(this.colaboradorForm.get('nascimento').value)
        var dataForm: Date = new Date(this.colaboradorForm.get('nascimento').value)
        //console.log(dataForm)
        // console.log(dataForm.dia)
        //var nascimento = new Date(parseInt(dataForm?.ano), parseInt(dataForm?.mes) - 1, parseInt(dataForm?.dia));
        //console.log(nascimento)
        let timeDiff = Math.abs(Date.now() - dataForm.getTime());
        let age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
        console.log(age)
        if (age < 18 && age != NaN) {
            this.showTabMenorIdade = true
            this.showPerguntaRespFinanc = false
            this.showFormRespFinanc = false
            this.colaboradorForm.get('temRespFin').setValue(true)
        } else if (age > 18 && age != NaN) {
            this.showTabMenorIdade = false
            this.showPerguntaRespFinanc = true
            if (this.checkedRespFinanc.sim == true) {
                this.showFormRespFinanc = false
            } else {
                this.showFormRespFinanc = true
            }
        }
    }
    eHRespMenorEFinan(boleano: boolean) {
        console.log(boleano)
        if (boleano) {
            this.showFormRespFinanc = !boleano
            this.showPerguntaRespFinanc = false
            // set tru in form
            this.responsavelMenorForm.get('eRespFinanc').setValue(true)
            this.colaboradorForm.get('temRespFin').setValue(false)
        } else {
            this.showFormRespFinanc = !boleano
            this.showPerguntaRespFinanc = false
            this.checkedRespFinanc.sim = false
            this.checkedRespFinanc.nao = true
            this.responsavelMenorForm.get('eRespFinanc').setValue(false)
            this.colaboradorForm.get('temRespFin').setValue(true)
        }
    }

    eHRespFinan(boleano: boolean) {
        // console.log(boleano)
        if (boleano) {
            this.showFormRespFinanc = !boleano
            this.checkedRespFinanc.sim = true
            this.checkedRespFinanc.nao = false
            this.colaboradorForm.get('temRespFin').setValue(false)
        } else {
            this.showFormRespFinanc = !boleano
            this.checkedRespFinanc.sim = false
            this.checkedRespFinanc.nao = true
            this.colaboradorForm.get('temRespFin').setValue(true)
        }
    }

    turmasParaMatricular: TurmaViewModel[] = new Array<TurmaViewModel>()


    consultarCursos(item: any) {
        console.log(item)
        console.log('consultarCursos')
        if (item == "") {
            // TODO: sendo form alert: selecionar ao menos um
            return;
        }

        // cpf = ""

        //this.http.get(`${this.baseUrl}/turmas/pesquisa/?curso=${item}`) // pesquisav2/{typePacoteId}
        this.http.get(`${this.baseUrl}/turmas/pesquisav2/${item}`) // pesquisav2/{typePacoteId}
            .subscribe(response => {

                console.log(response)
                this.turmasParaMatricular = Object.assign([], response)


            }, err => {
                console.log(err)
            },
                () => {

                    this.showTableCursosAndamento = true

                    console.log(this.turmasParaMatricular)
                    // if (this.alunoResponse.length == 0) {
                    //     // show form vazia
                    //     this.showForm = true
                    //     this.showSerch = false
                    //     // this.dialogRef.updateSize('900px','630px')
                    // } else if (this.alunoResponse.length == 1) {
                    //     this.showForm = true
                    //     this.showSerch = false
                    //     // this.dialogRef.updateSize('900px','630px')
                    //     // atribuir valores ao formControl
                    // } else if (this.alunoResponse.length > 1) {
                    //     this.showAlunoResponseList = true
                    //     //this.dialogRef.updateSize('900px','auto')
                    // }

                });

    }

    alterar(item: boolean) {
        this.colaboradorForm.get('temRespFinanceiro').setValue(item)
        console.log(this.colaboradorForm.get('temRespFinanceiro').value)
    }


    selectPayment(item: any) {

    }
    fechar() {
        this.dialogRef.close({ clicked: "Ok" });
    }


    turmaSelecionada: TurmaViewModel = new TurmaViewModel();
    temDesconto: number;
    horarioTurma: string = ""
    selecionarTurma(turma: Turma) {
        console.log(turma)
        Object.assign(this.turmaSelecionada, turma)
        console.log(this.turmaSelecionada)
        this.horarioTurma = `${this.turmaSelecionada.initialHourOne} às ${this.turmaSelecionada.finalHourOne}`
        this.hideCursoSearchAndMessage = false
        this.showSelectCursoSearch = false
        this.showTableCursosAndamento = false
        this.showFormFinal = true
        this.previAtual = `${new Date(this.turmaSelecionada.previsaoAtual).toLocaleDateString()}`
        this.previTerminoAtual = `${new Date(this.turmaSelecionada.previsaoTerminoAtual).toLocaleDateString()}`
    }



    showRespFinanceiro = false
    testeinvalid() {
        this.colaboradorForm.get('email').setErrors({ 'incorrect': true });
        // .setErrors({'incorrect': true});
    }

    validadeEmailMsg = false
    buscarEmail(event: any) {
        if (this.colaboradorForm.get('email').valid) {
            this.validadeEmailMsg = false
            this.http.get(`${this.baseUrl}/adm/aluno/email/${event.target.value}`, {
                headers: new HttpHeaders({
                    "Content-Type": "application/json",
                    "Authorization": "Bear "
                })
            }).subscribe(response => {

            }, (err) => {
                if (err['status'] == 409) {
                    this.validadeEmailMsg = true
                    this.colaboradorForm.get('email').setErrors({ 'incorrect': true });
                }
            },
                () => {
                    this.colaboradorForm.get('email').setErrors(null);
                });

            //this.colaboradorForm.get('email').setErrors({ 'incorrect': true });

        }
    }

    onSubmit(form: FormGroup) {


        // console.log(form.value)
        // console.log(form)
        // console.log(form.valid)
        console.log(this.colaboradorForm.value)
        console.log(this.colaboradorForm.valid)
        console.log(this.responsavelFinancForm.value)
        console.log(this.responsavelFinancForm.valid)
        console.log(this.responsavelMenorForm.value)
        console.log(this.responsavelMenorForm.valid)

        //var unidade = 'CGI'
        //this.colaboradorForm.get('unidadeCadastrada').setValue(unidade)
        var validar = this._validateFomService.ValidarForms(
            form,
            this.responsavelFinancForm,
            this.responsavelMenorForm, form.get('nascimento').value)

        console.log(validar['data'])
        console.log(validar['isValid'])
        if (validar['isValid']) {
            console.log('form valid')

            this.http.post(`${this.baseUrl}/matricula`, validar['data'], {
                headers: new HttpHeaders({
                    "Content-Type": "application/json",
                    "Authorization": "Bear "
                })
            }).subscribe(response => {

                console.log(response)
                this.alunoCriadoId = response['alunoCriado']
            }, (err) => {
                console.log(err)
            },
                () => {
                    this.confirmModal()
                });
        }
    }

    respAlunoDto
    respMenorDto



    // https://viacep.com.br/ws/01001000/json/
    cursosDisponiveis: TurmaViewModel[] = new Array<TurmaViewModel>();
    cursosType: any[] = new Array<any>()
    async getCursos(actualPage: number, pageSize: number) {

        var itemsPerPage = 5;
        var currentPage = 1;

        //await this.http.get(`${this.baseUrl}/turmas/cursosUnidade`)
        await this.http.get(`${this.baseUrl}/turmas/cursosUnidadev2`)
        .subscribe(response => {


            console.log(response)
           // Object.assign(this.cursosDisponiveis, response) //cursosType
            Object.assign(this.cursosType, response) //cursosType
            console.log(this.cursosDisponiveis)
           
        }, err => { console.log(err) },
            () => {

                this.showMatricula = true
                this.showFormCadastroTab = false
                this.showFormRespFinanc = false
                this.showTabMenorIdade = false
                //this.showSelectCursoSearch = true

                this.indexTab = 3;
                console.log('metodo getCursos')
                if (this.cursosType.length == 0) {
                    this.showSelectCursoSearch = false
                } else if (this.cursosType.length > 0) {
                    this.showSelectCursoSearch = true
                }

                if (this.cursosType.length == 0) {
                    this.showSelectCursoSearch = false
                } else if (this.cursosType.length > 0) {
                    this.showSelectCursoSearch = true
                }

               

            });

    }

    consultaCEPMen(CEP: string) {
        console.log(CEP);

        this.http.get(`https://viacep.com.br/ws/${CEP}/json/`, {

        }
        )
            .subscribe(response => {

                console.log(response)
                this.cepReturn3 = new CepReturn(
                    response["logradouro"],
                    response["bairro"],
                    response["localidade"],
                    response["uf"]);
                console.log(this.cepReturn)
                this.responsavelMenorForm.get('logradouro').setValue(response["logradouro"]);
                this.responsavelMenorForm.get('bairro').setValue(response["bairro"]);
                this.responsavelMenorForm.get('cidade').setValue(response["localidade"]);
                this.responsavelMenorForm.get('uf').setValue(response["uf"]);
                //this.bairro = this.cepReturn.bairro
                // const token = (<any>response).accessToken;
                // console.log(response)
                // localStorage.setItem("jwt", token);
                // this.invalidLogin = false;
                // this.router.navigate(["/main"]);
            }, err => {
                console.log(err)
                this.showEndercoField = true
            },
                () => {
                    console.log('finaly')
                    this.showEndercoField = true
                });
    }

    consultaCEPFin(CEP: string) {
        console.log(CEP);

        this.http.get(`https://viacep.com.br/ws/${CEP}/json/`, {

        }
        )
            .subscribe(response => {

                console.log(response)
                this.cepReturn2 = new CepReturn(
                    response["logradouro"],
                    response["bairro"],
                    response["localidade"],
                    response["uf"]);
                console.log(this.cepReturn)
                this.responsavelFinancForm.get('logradouro').setValue(response["logradouro"]);
                this.responsavelFinancForm.get('bairro').setValue(response["bairro"]);
                this.responsavelFinancForm.get('cidade').setValue(response["localidade"]);
                this.responsavelFinancForm.get('uf').setValue(response["uf"]);
                //this.bairro = this.cepReturn.bairro
                // const token = (<any>response).accessToken;
                // console.log(response)
                // localStorage.setItem("jwt", token);
                // this.invalidLogin = false;
                // this.router.navigate(["/main"]);
            }, err => {
                console.log(err)
                this.showEndercoField = true
            },
                () => {
                    console.log('finaly')
                    this.showEndercoField = true
                });
    }

    consultaCEP(CEP: string) {
        console.log(CEP);

        this.http.get(`https://viacep.com.br/ws/${CEP}/json/`, {

        }
        )
            .subscribe(response => {

                console.log(response)
                this.cepReturn = new CepReturn(
                    response["logradouro"],
                    response["bairro"],
                    response["localidade"],
                    response["uf"]);
                console.log(this.cepReturn)
                this.colaboradorForm.get('logradouro').setValue(response["logradouro"]);
                this.colaboradorForm.get('bairro').setValue(response["bairro"]);
                this.colaboradorForm.get('cidade').setValue(response["localidade"]);
                this.colaboradorForm.get('uf').setValue(response["uf"]);
                //this.bairro = this.cepReturn.bairro
                // const token = (<any>response).accessToken;
                // console.log(response)
                // localStorage.setItem("jwt", token);
                // this.invalidLogin = false;
                // this.router.navigate(["/main"]);
            }, err => {
                console.log(err)
                this.showEndercoField = true
            },
                () => {
                    console.log('finaly')
                    this.showEndercoField = true
                });
    }

    onOkClick() {
        //console.log("I do nothing");
        this.dialogRef.close({ clicked: "Ok" });
    }

    confirmModal(): void {
        const dialogRef = this.ConfirmModal
            .open(ConfirmModalComponent, {
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
                this.getCursos(0, 0);
                console.log('clicou no sim')
                //this.indexTab = 2

            } else if (data.clicked === "Cancel") {
                console.log('clicou no cancel')
                this.dialogRef.close({ clicked: "cancel" });
            }
        });
    }

    confirmMatriculaModal(): void {
        const dialogRef = this.ConfirmModal
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

    change() {
        console.log(this.selectedForm['selecionar'])
        this.indexTab = 3;
        //this.selectedForm.get['selecionar'].setValue(numeorindex)
    }

    tabs = ['Cadastro', 'Responsável Financeiro', 'Responsável (menor)'
        , "Matrícula"];
    // selected = new FormControl(0);

    addTab(selectAfterAdding: boolean) {
        this.tabs.push('New');

        if (selectAfterAdding) {
            //this.selected.setValue(this.tabs.length - 1);
        }
    }

    ValidateFormasPagamento(){
        if(this.matriculaTurmaForm.get('meioPagamento').valid){

            var meioPag = this.matriculaTurmaForm.get('meioPagamento').value
            if(meioPag == "credito" || meioPag == "boleto"){

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



    submitMatricula(form: FormGroup) {
        console.log(form.value)
        console.log('sen matrícula')

        /*
        cienciaCurso
meioPagamento
primeiraParcPaga
parcelas
idAlunoIndicacao
        */
       console.log(this.matriculaTurmaForm.get('primeiraParcPaga').valid)

        if(!this.ValidateFormasPagamento()){
            return
        }   

        this.matriculaTurmaForm.get('primeiraParcPaga').valid
        console.log(this.matriculaTurmaForm.get('cienciaCurso').valid)

/*
        if(this.matriculaTurmaForm.get('cienciaCurso').value == "Indicação Aluno"){

            if(this.matriculaTurmaForm.get('idAlunoIndicacao').valid){
                return true
            }else{
                return false
            }

        }else{
            return this.matriculaTurmaForm.get('cienciaCurso').valid
        }
        */

        // TEMP
        if(!this.matriculaTurmaForm.get('cienciaCurso').valid)return 
        // if indicacao aluno
        // VALIDAR
        //var idMatriculaAlunoInd = 
        // validate primeira parcela ja paga ou nao

        //validate indicaçao aluno



        //var ciencia = this.matriculaTurmaForm.get('cienciaCurso').value
        // this.colaboradorForm.get('cienciaCurso').setValue(ciencia)
        //console.log(form['cienciaCurso'].value)
        // id aluno
        // id turma
        // turma/{idAluno}/{idTurma}


        //if (form.valid) {

            var submitForm = new submitMatriculaForm()

            // TODO CONTRATOID
            submitForm.idAluno = this.alunoCriadoId
            submitForm.idTurma = this.turmaSelecionada.id
            submitForm.ciencia = this.matriculaTurmaForm.get('cienciaCurso').value
            submitForm.meioPagamento = this.matriculaTurmaForm.get('meioPagamento').value
            submitForm.parcelas = this.matriculaTurmaForm.get('parcelas').value
            submitForm.primeiraParceJaPaga = this.matriculaTurmaForm.get('primeiraParcPaga').value
            submitForm.diaVencimento = this.matriculaTurmaForm.get('diaVencimento').value
            console.log(submitForm)
            console.log(this.matriculaTurmaForm.get('diaVencimento').value)

            this.http.post(`${this.baseUrl}/turmas/turma`, submitForm, {
            }).subscribe(
                () => { },
                (error) => { console.log(error) },
                () => {

                    this.confirmMatriculaModal()

                }
            )

        }
   // }

}

function ConfirmComponent(ConfirmComponent: any, arg1: { height: string; width: string; data: { Hello: string; }; hasBackdrop: true; disableClose: true; }) {
    throw new Error("Function not implemented.");
}

export class submitMatriculaForm {
    constructor(
        public idAluno?: number,
        public idTurma?: number,
        public ciencia?: string,
        public meioPagamento?: string,
        public parcelas?: string,
        public diaVencimento?: string,
        public percentualDesconto?: number,
        public primeiraParceJaPaga?: Boolean,
        //public aVista?: Boolean
    ) { }
}
