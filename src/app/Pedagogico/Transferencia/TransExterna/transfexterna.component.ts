import { Component, Inject, Input, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CepReturn } from "src/app/_shared/models/cepreturn.model";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { environment } from "src/environments/environment";
import { Aluno } from "src/app/_shared/models/aluno.model";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { CheckedRespFinanc, CheckedRespMenor, CienciaCurso } from "../../Matricula/CreateModal/creatematricula.component";
import { Turma, TurmaViewModel } from "src/app/_shared/models/Turma.model";


//import { TemplateTasks } from 'src/app/shared/models/templateTasks.model';

@Component({
    selector: 'transfexternamodal',
    templateUrl: './transfexterna.component.html',
    styleUrls: ['./transfexterna.component.scss'],
    animations: [HighlightTrigger] //@rowHighlight
})

export class TransferenciaExternaComponent implements OnInit {

    showSerch = true
    baseUrl = environment.baseUrl;
    alunoResponse: Aluno[] = new Array<Aluno>();
    showFormCadastro = false
    showFormCadastroTab = false
    showAlunoResponseList = false
    showFormRespFinanc = false
    showTabMenorIdade = false
    showPerguntaRespFinanc = true
    checkedRespFinanc = CheckedRespFinanc
    checkedRespMenor = CheckedRespMenor
    cienciaCurso = CienciaCurso

    public cepReturn: CepReturn = new CepReturn();
    public cepReturn2: CepReturn = new CepReturn();
    public cepReturn3: CepReturn = new CepReturn();
    showEndercoField = false

    mensagem = "";
    showMensagem = false
    tabs = ['Cadastro', 'Responsável Financeiro', 'Responsável (menor)'
        , 'Matrícula', 'Documentação'];
    cpfAluno: string = ""

    public cpfForm: FormGroup;
    public alunoForm: FormGroup
    public responsavelMenorForm: FormGroup;
    public responsavelFinancForm: FormGroup;
    public matriculaTurmaForm: FormGroup;

    public parentForm: FormGroup

    temRespFinanc: AbstractControl;
    menorEhRespFinanc: AbstractControl;
    dataNascimento: AbstractControl;

    ehMenor: boolean;

    constructor(
        private _fb: FormBuilder,
        private _http: HttpClient,
        public dialogRef: MatDialogRef<TransferenciaExternaComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

        this.cpfForm = _fb.group({
            cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]]
        })

        this.alunoForm = _fb.group({
            nome: ['', [Validators.required, Validators.minLength(2)]],
            nomeSocial: [''],
            cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
            rg: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
            nascimento: ['', [Validators.required]],
            naturalidade: ['', [Validators.required]],
            naturalidadeUF: ['', [Validators.required]],
            temRespFin: [true, [Validators.required]],
            email: ['', [Validators.required, Validators.minLength(3)]],
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
            unidadeCadastrada: [''],
            observacoes: ['', [Validators.maxLength(300)]],


        })

        this.responsavelFinancForm = _fb.group({
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
            observacoes: ['', [Validators.minLength(1), Validators.maxLength(300)]]
        })

        this.responsavelMenorForm = _fb.group({
            nome: ['', [Validators.required, Validators.minLength(2)]],
            cpf: ['', [Validators.required, Validators.minLength(11)]],
            rg: ['', [Validators.required, Validators.minLength(9)]],
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
            turmaId: ['', [Validators.required]],
        })

        this.parentForm = _fb.group({
            alunoDto: this.alunoForm,
            respAlunoDto: this.responsavelFinancForm,
            respMenorDto: this.responsavelMenorForm,
            turma: this.matriculaTurmaForm
        })

        //     this.myForm = fb.group({
        //   'sku':  ['', Validators.required]
        // });

        this.temRespFinanc = this.alunoForm.controls['temRespFin'];
        this.dataNascimento = this.alunoForm.controls['nascimento'];
        this.menorEhRespFinanc = this.responsavelMenorForm.controls['eRespFinanc'];

        this.temRespFinanc.valueChanges.subscribe(
            (value: string) => {
                console.log('temRespFin changed to:', value);
                //this.alunoForm.get('temRespFin').setValue(value);
                console.log(this.alunoForm.get('temRespFin').value)
                this.eHRespFinan(Boolean(value))

            }
        );

        this.menorEhRespFinanc.valueChanges.subscribe(
            (value: string) => {
                console.log('temRespFin changed to:', value);
                //this.responsavelMenorForm.get('eRespFinanc').setValue(value);
                console.log(this.responsavelMenorForm.get('eRespFinanc').value)
                this.eHRespMenorEFinan(Boolean(value))

            }
        );

        this.dataNascimento.valueChanges.subscribe(
            (value: string) => {
                if (value == null) {

                } else {
                    console.log('temRespFin changed to:', value);
                    this.EhMenor(new Date(value))
                }

            }
        );




    }

    ngOnInit() {
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
        //this.showMatricula = false
        //this.showSelectCursoSearch = false
        //this.showTableCursosAndamento = fal
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

    resposta: any
    HasMessage: any
    consulta(form: FormGroup) {

        if (!this.cpfForm.valid) {
            // TODO: sendo form alert: selecionar ao menos um
            return;
        }

        this._http.get(`${this.baseUrl}/transferencia/?query={"nome":"","email":"","cpf":"${this.cpfForm.get('cpf').value}"}`)
            .subscribe(response => {
                console.log(response)

                //this.alunoResponse = Object.assign([], response)
                this.resposta = response
                console.log(response)
                // if(response != null){
                // this.HasMessage = response['message']
                // }


            }, err => {
                //console.log(err)
                //console.log(err['status'])
                //console.log(err['error'].message)
                if (err['status'] == 409) {
                    this.mensagem = err['error'].message
                    this.showMensagem = true
                }
            },
                () => {
                    console.log(this.alunoResponse)

                    // if(this.HasMessage != undefined){
                    //     this.showMensagem = true
                    //     this.mensagem = this.resposta['message']
                    // }else{
                    ///this.alunoResponse = Object.assign([], this.resposta)
                    this.cpfAluno = this.onInputChange(this.cpfForm.get('cpf').value);
                    this.alunoForm.get('cpf').setValue(this.cpfForm.get('cpf').value)
                    this.showFormCadastro = true
                    this.showSerch = false
                    this.getCursos(0, 0)

                    //}
                });
    }

    showTableCursosAndamento: boolean = false
    turmasParaMatricular: TurmaViewModel[] = new Array<TurmaViewModel>()
    consultarCursos(item: any) {
        console.log(item)
        console.log('consultarCursos')
        if (item == "") {
            // TODO: sendo form alert: selecionar ao menos um
            return;
        }

        // cpf = ""

        this._http.get(`${this.baseUrl}/turmas/pesquisa/?curso=${item}`)
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

    turmaSelecionada: TurmaViewModel = new TurmaViewModel();
    showFormFinal: boolean = false
    previAtual: string
    previTerminoAtual: string
    hideCursoSearchAndMessage = true
    horarioTurma: string = ""

    selecionarTurma(turma: Turma) {
        console.log(turma)
        Object.assign(this.turmaSelecionada, turma)
        console.log(this.turmaSelecionada)
        this.matriculaTurmaForm.get('turmaId').setValue(turma.id)
        this.horarioTurma = `${this.turmaSelecionada.initialHourOne} às ${this.turmaSelecionada.finalHourOne}`
        //this.hideCursoSearchAndMessage = false
        this.hideCursoSearchAndMessage = false
        this.showSelectCursoSearch = false
        this.showTableCursosAndamento = false
        this.showFormFinal = true
        this.previAtual = `${new Date(this.turmaSelecionada.previsaoAtual).toLocaleDateString()}`
        this.previTerminoAtual = `${new Date(this.turmaSelecionada.previsaoTerminoAtual).toLocaleDateString()}`
    }

    voltar() {
        this.hideCursoSearchAndMessage = false
        this.showSelectCursoSearch = false
        this.showTableCursosAndamento = true
        this.showFormFinal = false
    }

    EhMenor(data: Date) {
        console.log(data);
        // console.log(event.target.value);
        //console.log(this.alunoForm.get('nascimento').value)
        //var dataForm: Date = new Date(this.alunoForm.get('nascimento').value)
        //console.log(dataForm)
        // console.log(dataForm.dia)
        //var nascimento = new Date(parseInt(dataForm?.ano), parseInt(dataForm?.mes) - 1, parseInt(dataForm?.dia));
        //console.log(nascimento)
        let timeDiff = Math.abs(Date.now() - data.getTime());
        let age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
        //console.log(age)
        if (age < 18 && age != NaN) {
            console.log('é menor')
            this.ehMenor = true
            this.showTabMenorIdade = true
            this.showPerguntaRespFinanc = false
            this.showFormRespFinanc = false
            this.alunoForm.get('temRespFin').setValue(true)
        } else if (age > 18 && age != NaN) {
            console.log('é maior')
            this.ehMenor = false
            this.showTabMenorIdade = false
            this.showPerguntaRespFinanc = true
            this.showFormRespFinanc = !this.alunoForm.get('temRespFin').value
            //  if (this.checkedRespFinanc.sim == true) {
            //      this.showFormRespFinanc = false
            //  } else {
            // this.showFormRespFinanc = true
            //}
        }
    }
    onFocusOutDateEvent(event: any) {
        // console.log(event.target.value);
        //console.log(this.alunoForm.get('nascimento').value)
        var dataForm: Date = new Date(this.alunoForm.get('nascimento').value)
        //console.log(dataForm)
        // console.log(dataForm.dia)
        //var nascimento = new Date(parseInt(dataForm?.ano), parseInt(dataForm?.mes) - 1, parseInt(dataForm?.dia));
        //console.log(nascimento)
        let timeDiff = Math.abs(Date.now() - dataForm.getTime());
        let age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
        //console.log(age)
        if (age < 18 && age != NaN) {
            this.showTabMenorIdade = true
            this.showPerguntaRespFinanc = false
            this.showFormRespFinanc = false
            this.alunoForm.get('temRespFin').setValue(true)
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

    eHRespFinan(boleano: boolean) {
        console.log(boleano)
        if (boleano) {
            this.showFormRespFinanc = false
            // this.checkedRespFinanc.sim = true
            // this.checkedRespFinanc.nao = false
            //this.alunoForm.get('temRespFin').setValue(false)
        } else {
            this.showFormRespFinanc = true
            // this.checkedRespFinanc.sim = false
            // this.checkedRespFinanc.nao = true
            // this.alunoForm.get('temRespFin').setValue(true)
        }
    }

    eHRespMenorEFinan(boleano: boolean) {
        console.log(boleano)
        if (boleano) {
            this.showFormRespFinanc = !boleano
            this.showPerguntaRespFinanc = false

            // set tru in form
            //this.responsavelMenorForm.get('eRespFinanc').setValue(true)
            //this.alunoForm.get('temRespFin').setValue(false)
        } else {
            this.showFormRespFinanc = !boleano
            this.showPerguntaRespFinanc = false
            this.checkedRespFinanc.sim = false
            this.checkedRespFinanc.nao = true

            //this.responsavelMenorForm.get('eRespFinanc').setValue(false)
            //this.alunoForm.get('temRespFin').setValue(true)
        }
    }

    consultaCEPMen(CEP: string) {
        console.log(CEP);

        this._http.get(`https://viacep.com.br/ws/${CEP}/json/`, {

        }
        )
            .subscribe(response => {

                console.log(response)
                this.cepReturn3 = new CepReturn(
                    response["logradouro"],
                    response["bairro"],
                    response["localidade"],
                    response["uf"]);
                //console.log(this.cepReturn)
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

    consultaCEP(CEP: string) {
        console.log(CEP);

        this._http.get(`https://viacep.com.br/ws/${CEP}/json/`, {

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
                this.alunoForm.get('logradouro').setValue(response["logradouro"]);
                this.alunoForm.get('bairro').setValue(response["bairro"]);
                this.alunoForm.get('cidade').setValue(response["localidade"]);
                this.alunoForm.get('uf').setValue(response["uf"]);
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

    cursosDisponiveis: TurmaViewModel[] = new Array<TurmaViewModel>();

    showSelectCursoSearch: boolean = false
    getCursos(actualPage: number, pageSize: number) {

        var itemsPerPage = 5;
        var currentPage = 1;

        this._http.get(`${this.baseUrl}/turmas/cursosUnidade`, {
            //this.http.post("http://api.invictustemp.com.thor.hostazul.com.br/api/identity/login", credentials, {

            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Authorization": "Bear "
            })
        }).subscribe(response => {


            console.log(response)
            Object.assign(this.cursosDisponiveis, response)
            console.log(this.cursosDisponiveis)
            // this.colaboradores = Object.assign([], response['data'])
            //console.log(this.colaboradores)
            // this.dialogRef.close();
        }, err => { console.log(err) },
            () => {

                //this.showMatricula = true
                // this.showFormCadastroTab = false
                // this.showFormRespFinanc = false
                // this.showTabMenorIdade = false
                //this.showSelectCursoSearch = true

                // this.indexTab = 3;
                console.log('metodo getCursos')
                if (this.cursosDisponiveis.length == 0) {
                    this.showSelectCursoSearch = false
                } else if (this.cursosDisponiveis.length > 0) {
                    this.showSelectCursoSearch = true
                }

                // if (this.cursos.length > 0) {
                //     this.haTurmas = true
                //     this.messageturmas = false
                // } else {
                //     this.haTurmas = false
                //     this.messageturmas = true
                // }

            });

    }


    VerificarEhMenor(data: Date) {
        console.log(data);
        // console.log(event.target.value);
        //console.log(this.alunoForm.get('nascimento').value)
        //var dataForm: Date = new Date(this.alunoForm.get('nascimento').value)
        //console.log(dataForm)
        // console.log(dataForm.dia)
        //var nascimento = new Date(parseInt(dataForm?.ano), parseInt(dataForm?.mes) - 1, parseInt(dataForm?.dia));
        //console.log(nascimento)
        let timeDiff = Math.abs(Date.now() - data.getTime());
        let age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
        //console.log(age)
        if (age < 18 && age != NaN) {
            console.log('é menor')
            return true
        } else if (age > 18 && age != NaN) {
            return false
        }
    }
    Validar() {
        if (!this.alunoForm.valid) return false

        if (this.VerificarEhMenor(this.alunoForm.get('nascimento').value)) {

            if (!this.responsavelMenorForm.valid) {
                false
            } else {

                if (this.responsavelMenorForm.get('eRespFinanc').value) {
                    return true
                } else {
                    if (this.responsavelFinancForm.valid) {
                        return true
                    } else {
                        return false
                    }
                }
            }

        } else {

            if (this.alunoForm.get('temRespFin').value) {
                return this.responsavelFinancForm.valid
            } else {
                return true
            }

        }
    }
    confirmar() {
        //this.responsavelFinancForm.disable()
        // this.responsavelMenorForm.disable()
        // this.responsavelMenorForm.enable()
        console.log(this.parentForm.valid)
        console.log(this.parentForm.value)
        console.log(this.alunoForm.valid)
        console.log(this.matriculaTurmaForm.valid)
        /*
        ver se é menor
            se sim 
                validar respmenor
                    ver se ele é respFin
                        se sim PASSAR
                        se nao 
                            validar RespFin
            se nao
                validar respFin
        
        depois valodar FormTurma
        
        */
        if (this.validaForm()) {

            this._http.post(`${this.baseUrl}/transferencia`, this.parentForm.value)
                .subscribe(resp => {

                },
                    (error) => { console.log(error) },
                    () => { })
        }


    }

    validaForm() {

        console.log(this.alunoForm.valid)
        if (!this.alunoForm.valid) {
            return false;
        }

        if (!this.matriculaTurmaForm.valid) {
            return false;
        }

        var ehMenor = this.EhMenoIdade();

        if (ehMenor) {

            if (this.responsavelMenorForm.valid) {
                if (this.responsavelMenorForm.get('eRespFinanc').value) {
                    return true;
                } else {

                    if (this.responsavelFinancForm.valid) {
                        return true;
                    } else {
                        return true;
                    }

                }
            } else {
                return false;
            }

        } else {

            if (this.alunoForm.get('temRespFin').value) {
                return true;
            } else {

                if (this.responsavelFinancForm.valid) {
                    return true;
                } else {
                    return false;
                }
            }
        }



    }

    EhMenoIdade() {
        // console.log(event.target.value);
        // console.log(this.alunoForm.get('nascimento').value)
        var dataForm: Date = new Date(this.alunoForm.get('nascimento').value)
        //console.log(dataForm)
        // console.log(dataForm.dia)
        //var nascimento = new Date(parseInt(dataForm?.ano), parseInt(dataForm?.mes) - 1, parseInt(dataForm?.dia));
        //console.log(nascimento)
        let timeDiff = Math.abs(Date.now() - dataForm.getTime());
        let age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
        console.log(age)
        if (age < 18 && age != NaN) {
            return true;
        } else if (age > 18 && age != NaN) {
            return false
        }
    }




    consultaCEPFin(CEP: string) {
        console.log(CEP);

        this._http.get(`https://viacep.com.br/ws/${CEP}/json/`, {

        }
        )
            .subscribe(response => {

                console.log(response)
                this.cepReturn2 = new CepReturn(
                    response["logradouro"],
                    response["bairro"],
                    response["localidade"],
                    response["uf"]);
                //console.log(this.cepReturn)
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


    apendFileAP(file) {
        // this.fileAP = new Array<File>()
        // let fileToUpload = <File>file[0];
        // this.fileAPName = `AP${fileToUpload.name}`
        // this.fileAPViewName = `${fileToUpload.name}`
        // this.fileAP.push(fileToUpload)
    }

    apendFileCartaoVac(file) {
        // this.fileCartaoVac = new Array<File>()
        // let fileToUpload = <File>file[0];
        // this.fileCartaoVacName = `CV${fileToUpload.name}`
        // this.fileCartaoVacViewName = `${fileToUpload.name}`
        // this.fileCartaoVac.push(fileToUpload)
    }

    apendFileTipoSang(file) {
        // this.fileTipoSang = new Array<File>()
        // let fileToUpload = <File>file[0];
        // this.fileTipoSangName = `TP${fileToUpload.name}`
        // this.fileTipoSangViewName = `${fileToUpload.name}`
        // this.fileTipoSang.push(fileToUpload)
    }

    apendFileHCG(file) {
        // this.fileHCG = new Array<File>()
        // let fileToUpload = <File>file[0];
        // this.fileHCGName = `HC${fileToUpload.name}`
        // this.fileHCGViewName = `${fileToUpload.name}`
        // this.fileHCG.push(fileToUpload)
    }


    verificar() {

        // console.log(this.fileAP)
        // console.log(this.fileCartaoVac)

        // console.log(this.fileTipoSang)
        // console.log(this.fileHCG)

    }


    uploadFile() {

        // this.formDatas.append('file', this.fileAP[0], this.fileAPName);
        // this.formDatas.append('file', this.fileCartaoVac[0], this.fileCartaoVacName);
        // this.formDatas.append('file', this.fileTipoSang[0], this.fileTipoSangName);
        // this.formDatas.append('file', this.fileHCG[0], this.fileHCGName);

        // const token = localStorage.getItem('jwt')
        // const Bearer = `Bearer ${token}`;
        // this.http.post(`${this.baseUrl}/estagios/arquivos`, this.formDatas, {
        //     reportProgress: true, observe: 'events',
        //     headers: new HttpHeaders({

        //         "Authorization": Bearer
        //       })
        // })
        //     .subscribe(event => {
        //         if (event.type === HttpEventType.UploadProgress)
        //             this.progress = Math.round(100 * event.loaded / event.total);
        //         else if (event.type === HttpEventType.Response) {
        //             this.message = 'Upload success.';
        //             this.onUploadFinished.emit(event.body);
        //         }
        //     },
        //         (error) => { console.log(error) },
        //         () => {
        //             console.log('finally')
        //             this.dialogRef.close({ clicked: "Ok" });
        //             // this.refresh()
        //             //this.onUploadFinished.unsubscribe;
        //             //files = null
        //         });
    }

    fechar() {
        this.dialogRef.close({ clicked: "Ok" });
    }
}