import { Component, Inject, Input, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CepReturn } from "src/app/_shared/models/cepreturn.model";
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Cursos, DiasSemana, Turnos } from "src/app/_shared/models/perfil.model";
import { Colaborador } from "src/app/_shared/models/colaborador.model";
import { Turma } from "src/app/_shared/models/Turma.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MyTime } from "src/app/_shared/customMasks/maskTimeStan/myTime.model";
//import { AddProfModalComponent } from "./addProfessorModal/addProfessor.component";
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Modulo } from "src/app/_shared/models/modulo.model";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { DisponibilidadeDto, DisponibilidadeDtoV2 } from "src/app/_shared/models/disponibilidade.model";
import { Horarios, TurmaCommand } from "src/app/_shared/models/turmacommand.model";
import { Sala } from "../../Adm-Models/sala.model";
import { CreateTurmaViewModel } from "../../Adm-Models/createturmaviewmodel.model";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { JwtHelperService } from "@auth0/angular-jwt";
//import { TemplateTasks } from 'src/app/shared/models/templateTasks.model';
export class ProfResponse {
    constructor(
        public id?: number,
        public nome?: string,
        public disciplina?: string,
        public checked?: boolean
    ) { }

}

@Component({
    selector: 'createcursomodal',
    templateUrl: './createcurso.component.html',
    styleUrls: ['./createcurso.component.scss'],
    animations: [HighlightTrigger]
})


export class CreateCursoComponent implements OnInit {

    private jwtHelper = new JwtHelperService();
    public tokenInfo: TokenInfos = new TokenInfos();
    
    item = { value: 0 }
    cursos: Modulo = new Modulo();
    public salas: Sala[] = new Array<Sala>();
    tempoExemplo: MyTime = new MyTime("09", "13")
   
    public cursoForm: FormGroup;
    baseUrl = environment.baseUrl;
    profes = ["Joao", "jose", "Mario"]
    professores: Colaborador[] = new Array<Colaborador>();
    showProflist: boolean = false
    turma: Turma = new Turma();
    turnos = Turnos;
    diasSemana = DiasSemana   
    minDate: Date;
    nimDateTemino: Date;
    disabledSpinner = false
    testando = "testando"
    termino1 = ""
    termino2 = ""
    termino3 = ""
    showSelectTurno = false
    showHorarioTurno = false
    valorx = '4,900'
    cursoPreco = ''
    public createTurmaViewModel = new CreateTurmaViewModel();    
    listaprofessores = new FormArray([])
    profResp: ProfResponse[] = new Array<ProfResponse>();
    constructor(        
        private _datepipe: DatePipe,
        private _currencyPipe: CurrencyPipe,
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fb: FormBuilder,
        private addProfModal: MatDialog,
        private _http: HttpClient,
        public dialogRef: MatDialogRef<CreateCursoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {      
        this.cursoForm = _fb.group({           
            curso: ['', [Validators.required]],           
            minVagas: [, [Validators.required]],
            //pacoteId: [, [Validators.required]],
            descricao: ['', [Validators.required]],
            prevInicio_1: ['', [Validators.required, Validators.minLength(10)]],
            prevTermino_1: ['', [Validators.required, Validators.minLength(10)]],
            prevInicio_2: ['', [Validators.required, Validators.minLength(10)]],
            prevTermino_2: ['', [Validators.required, Validators.minLength(10)]],
            prevInicio_3: ['', [Validators.required, Validators.minLength(10)]],
            prevTermino_3: ['', [Validators.required, Validators.minLength(10)]],

            horarioIni_1: ['', [Validators.required]],
            horarioFim_1: ['', [Validators.required]],
            horarioIni_2: [''],
            horarioFim_2: [''],

            dia1: ['', [Validators.required]],
            dia2: [''],

            salaId: ['', [Validators.required]],

           // planoId:['', [Validators.required]]

        });

        this.cursoForm.valueChanges.subscribe(form => {
            if (form.curso) {
                console.log(this.cursoForm.get('curso').value)
                var valor = this.createTurmaViewModel.modulos.find(item =>
                    item.id == this.cursoForm.get('curso').value
                )

                console.log(valor)

                this.cursoPreco = this._currencyPipe.transform(valor.preco, 'BRL', 'R$  ', '1.2-2')
             
            }
        }
           
        );

    }

    ver(event) {
        console.log(this.cursoForm.get('prevInicio_1').value)
    }

    verVar(precocurso) {
        console.log(precocurso)
    }

    ngOnInit() {
        //console.log("create modal 123")
        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)
        console.log(this.tokenInfo)
        this.showProflist = false
      
        this.getCreateTurmaViewModel();
       
    }

    showForm = false
    mensagemErro = ''
    showmensagemErro = false
    getCreateTurmaViewModel() {


        this._http.get(`${this.baseUrl}/adm/turma-create`)
            .subscribe(
                response => {
                    console.log(response)
                    this.createTurmaViewModel = Object.assign({}, response)
                    console.log(this.createTurmaViewModel)
                },
                (error) => { 
                    console.log(error) 
                    this.mensagemErro = error['error'].mensagem
                    this.showmensagemErro = true
                },
                () => {
                    //this.showSelec = truetTurno = true
                    this.showForm = true
                    this.showCapacidadeDropDown = true
                    /*if domingo ou sabado
                    
                    */

                }
            )
    }

    showCapacidadeDropDown = false
    getSalasDisponiveis() {


        this._http.get(`${this.baseUrl}/unidade/salas`)
            .subscribe(
                response => {
                    console.log(response)
                    this.salas = Object.assign([], response)
                    //console.log(this.cursos)
                },
                (error) => { console.log(error) },
                () => {
                    //this.showSelec = truetTurno = true
                    this.showCapacidadeDropDown = true
                    /*if domingo ou sabado
                    
                    */

                }
            )

    }

    getModulos() {

        this._http.get(`${this.baseUrl}/adm/modulos/CGI`)
            .subscribe(
                response => {
                    console.log(response)
                    this.cursos = response//Object.assign([], response)
                    console.log(this.cursos)
                },
                (error) => {

                    console.log(error)
                },
                () => {
                    this.showSelectTurno = true

                    /*if domingo ou sabado
                    
                    */

                }
            )

    }

    createItem(id): FormGroup {
        return this._fb.group({
            id: id
        });
    }

    get Professores(): FormArray {
        return this.cursoForm.get("listaprofessores") as FormArray
    }

    addProfs(profId) {
        this.Professores.push(this.createItem(profId));
    }

    removeProf(i: number) {
        const index = this.Professores.value.findIndex(c => c.id == i)
        this.Professores.removeAt(index);
    }

    showOnMoreDay: boolean = false
    showSecondDay: boolean = false
    viewModel: CreateTurmaViewModel[] = new Array<CreateTurmaViewModel>()

    // v1
    primeiroDia: DisponibilidadeDto = new DisponibilidadeDto();
    outrosDias: DisponibilidadeDto[] = new Array<DisponibilidadeDto>();
    //V2
    disponibilidades: DisponibilidadeDtoV2 = new DisponibilidadeDtoV2();
    pesquisar() {
     
        this.showHorarioTurno = false
        this.showGridDias = false

        var dataIni = new Date(this.cursoForm.get('prevInicio_1').value).toISOString()
        var dataEnd = new Date(this.cursoForm.get('prevTermino_3').value).toISOString()
        var salaId = this.cursoForm.get('salaId').value

        this._http.get(`${this.baseUrl}/turmas/disponibilidade/${dataIni}/${dataEnd}/${salaId}`)
            .subscribe(
                response => {
                    console.log(response)
                    //v1
                    this.primeiroDia = Object.assign({}, response['availabilityOne'] as DisponibilidadeDto)
                    this.outrosDias = Object.assign([], response['availabilityTwo'] as DisponibilidadeDto[])
                    this.viewModel = Object.assign([], response as CreateTurmaViewModel[])
                    console.log(this.viewModel)

                    //v2
                    this.disponibilidades = Object.assign({}, response)
                    
                    console.log(this.disponibilidades)
                },
                (error) => {

                    console.log(error)
                },
                () => {

                    this.showGridDias = true
                    console.log(this.primeiroDia)
                    console.log(this.outrosDias)

                    this.cursoForm.get('dia1').setValue(this.primeiroDia.diaSemana);
                    if (this.outrosDias.length == 0) {
                        console.log('segundo objeto null')
                        this.showOnMoreDay = false
                    } else {
                        this.showOnMoreDay = true
                    }

                }
            )
        // }
        console.log(this.cursoForm.get('prevInicio_1').value)

    }

    addOneMoreDay() {

        this.showSecondDay = true


    }

    onCheckboxChange(e, profId) {
       
        console.log(e.checked)
        console.log(e)
        console.log(profId)
        if (e.checked) {
            this.addProfs(profId)
        } else {
            this.removeProf(profId)
        }
    }


    diasSemanas = ""
    horarioValue = "";
    showGridDias = false
    showGridFDS = false
    selectTurno(turno) {
        console.log(turno)
        this.showHorarioTurno = true
        // TODO: verificar disponibilidade
        console.log(turno)
        console.log(turno.turno)
        if (turno.turno == 'Sábado' || turno.turno == 'Domingo') {
            this.horarioValue = "10:00 às 17:00"

            this.cursoForm.get('turno').setValue(turno.turno);
            this.cursoForm.get('horarioIni_1').setValue('10:00');
            this.cursoForm.get('horarioFim_1').setValue('17:00');
            this.cursoForm.get('dia1').disable();
            this.cursoForm.get('dia2').disable();

            this.showGridDias = false
            this.showGridFDS = true
           
        } else if (turno.value == '') {            
            this.showGridDias = false
            this.showGridFDS = false
        } else if (turno.turno == 'Manhã') {
            console.log('sleect manha')
            console.log(turno)
            //this.horarioValue = "08:00 às 13:00"
            this.diasSemanas = turno.diasSemanaDisponiveis
            this.primeiroDia = turno.primeiroDiaSemana

            this.cursoForm.get('turno').setValue(turno.turno);
            this.cursoForm.get('horarioIni_1').setValue('09:00');
            this.cursoForm.get('horarioFim_1').setValue('12:30');
            this.cursoForm.get('dia1').enable();
            this.cursoForm.get('dia2').enable();
            this.cursoForm.get('dia1').setValue(turno.primeiroDiaSemana.item2);
          
            this.showGridDias = true
            this.showGridFDS = false
        } else if (turno.turno == 'Tarde') {
            console.log('select tarde')
            // this.horarioValue = "13:00 às 18:00"
            this.diasSemanas = turno.diasSemanaDisponiveis
            this.primeiroDia = turno.primeiroDiaSemana



            this.cursoForm.get('turno').setValue(turno.turno);
            this.cursoForm.get('horarioIni_1').setValue('13:00');
            this.cursoForm.get('horarioFim_1').setValue('17:30');
            this.cursoForm.get('dia1').enable();
            this.cursoForm.get('dia2').enable();
            this.cursoForm.get('dia1').setValue(turno.primeiroDiaSemana.item2);

            this.showGridDias = true
            this.showGridFDS = false
        } else if (turno.turno == 'Noite') {
            this.horarioValue = "18:00 às 22:00"

            this.showGridDias = true
            this.showGridFDS = false
        }
    }

    setSegundoDiaSemana(item) {
        console.log(item)
        if (item == undefined) {
            this.cursoForm.get('dia2').setValue('')
        } else {
            this.cursoForm.get('dia2').setValue(item)
        }

    }
    //prevtermino: Date = new Date(0, 0, 0)
    onFocusOutDateEvent1(event: any) {
        console.log(event.target.value);
        //console.log(this.colaboradorForm.get('nascimento').value)
        var dataForm: Date = new Date(this.cursoForm.get('prevInicio_1').value)
        console.log(dataForm.valueOf())

        console.log(new Date().valueOf())
        if (dataForm.valueOf() >= new Date().valueOf()) {

            let novaData = new Date(dataForm.getFullYear(), dataForm.getMonth() + 20, dataForm.getDate(), 0, 0, 0, 0)
            //let novaData = new Date(dataForm)
            novaData.setDate(dataForm.getDate())
            console.log(dataForm)
            //console.log(novaData.setMonth(+20))
            console.log(novaData.getDate())
            console.log(novaData.getMonth())
            console.log(novaData.getFullYear())
            //this.cursoForm.get('prevtermino_1').setValue(new Date(dataForm.getFullYear(), dataForm.getMonth() + (20 -1),dataForm.getDay()))
            //this.cursoForm.get('prevTermino_1').enable()

            //this.cursoForm.get('prevTermino_1').setValue(this._datepipe.transform(novaData, '   dd  /  MM  /  yyyy'));
            this.cursoForm.get('prevTermino_1').setValue(new Date(novaData));
            console.log(this.cursoForm.get('prevTermino_1').value)
            this.termino1 = this._datepipe.transform(novaData, '   dd  /  MM  /  yyyy')
            ///this.cursoForm.get('prevTermino_1').disable()
        }
    }
    onFocusOutDateEvent2(event: any) {
        console.log(event.target.value);
        //console.log(this.colaboradorForm.get('nascimento').value)
        var dataForm: Date = new Date(this.cursoForm.get('prevInicio_2').value)
        console.log(dataForm.valueOf())

        console.log(new Date().valueOf())
        if (dataForm.valueOf() >= new Date().valueOf()) {

            let novaData = new Date(dataForm.getFullYear(), dataForm.getMonth() + 20, dataForm.getDate())
            //let novaData = new Date(dataForm)
            novaData.setDate(dataForm.getDate())
            console.log(dataForm)
            //console.log(novaData.setMonth(+20))
            console.log(novaData.getDate())
            console.log(novaData.getMonth())
            console.log(novaData.getFullYear())
            //this.cursoForm.get('prevtermino_1').setValue(new Date(dataForm.getFullYear(), dataForm.getMonth() + (20 -1),dataForm.getDay()))
            //this.cursoForm.get('prevTermino_1').enable()
            //            this.cursoForm.get('prevTermino_2').setValue(this._datepipe.transform(novaData, '   dd  /  MM  /  yyyy'));
            this.cursoForm.get('prevTermino_2').setValue(new Date(novaData))//, '   dd  /  MM  /  yyyy'));
            this.termino2 = this._datepipe.transform(novaData, '   dd  /  MM  /  yyyy')
            //this.cursoForm.get('prevTermino_2').disable()
        }
    }
    onFocusOutDateEvent3(event: any) {
        console.log(event.target.value);
        //console.log(this.colaboradorForm.get('nascimento').value)
        var dataForm: Date = new Date(this.cursoForm.get('prevInicio_3').value)
        console.log(dataForm.valueOf())

        console.log(new Date().valueOf())
        if (dataForm.valueOf() >= new Date().valueOf()) {

            let novaData = new Date(dataForm.getFullYear(), dataForm.getMonth() + 20, dataForm.getDate())
            //let novaData = new Date(dataForm)
            novaData.setDate(dataForm.getDate())
            console.log(dataForm)
            //console.log(novaData.setMonth(+20))
            console.log(novaData.getDate())
            console.log(novaData.getMonth())
            console.log(novaData.getFullYear())
            //this.cursoForm.get('prevtermino_1').setValue(new Date(dataForm.getFullYear(), dataForm.getMonth() + (20 -1),dataForm.getDay()))
            this.cursoForm.get('prevTermino_3').setValue(new Date(novaData));
            this.termino3 = this._datepipe.transform(novaData, '   dd  /  MM  /  yyyy')
            //this.cursoForm.get('prevTermino_3').disable()
        }
    }


    disabled = false
    getProfsList(itemsPerPage: number, currentPage: number) {

        //this.http.get(`${this.baseUrl}/colaboradores/professores/?unidade=Campo Grande&itemsPerPage=${itemsPerPage}&currentPage=${currentPage}`)
        this._http.get(`${this.baseUrl}/colaboradores/professores/?unidade=Campo Grande`)
            .subscribe(
                (result) => {

                    console.log(result)

                    this.profResp = Object.assign([], result)

                    this.profResp.forEach(element => {
                        element.checked = false
                    });
                    console.log(this.profResp)
                    //  this.profResp.length > 0 ? this.showProflist = true :
                    //  this.showProflist = false

                },
                (error) => { console.log(error) },
                () => {

                    this.showProflist = true
                }
            )
    }  

    getFirst() {
        // return this.formArray.get(0);
    }
    clear() {
        //  this.formArray.clear();
    }
    replace() {
        //   this.formArray.setControl(0, new FormControl(''));
    }
    addSkill() {
        const group = new FormGroup({
            level: new FormControl(''),
            name: new FormControl('')
        });

        //   this.formArray.push(group);
        //this.formArray.push(new FormControl(''));
    }



    prepend() {
        //   this.formArray.insert(0, new FormControl(''));
    }

    createItemFormGroup() {
        return this._fb.group({
            nome: ['', [Validators.required]],
            materia: ['', [Validators.required]]
        });
    }

    addItem() {
        //   this.formArray.push(this.createItemFormGroup());
    }



    transfer = { amount: 0 }

    validateOnlyNumbers(evt) {
        var theEvent = evt || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
        var regex = /[0-9]|\./;
        if (!regex.test(key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) theEvent.preventDefault();
        }
    }
    dobMaxDate = new Date();

    save(form: any) {
        //const novoColaborador = JSON.stringify(form.value);
        console.log(form)

        //this.redi(["./adm/colaboradores"]);
        this._http.post(`${this.baseUrl}/colaboradores`, form, {
            //this.http.post("http://api.invictustemp.com.thor.hostazul.com.br/api/identity/login", credentials, {

            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Authorization": "Bear "
            })
        }).subscribe(response => {

            console.log(response)


            // this.dialogRef.close();
        }, err => { },
            () => { });
    }

    openSnackBar() {
        this._snackBar.open('Truma criada com sucesso', '', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'green-snackbar',
            duration: 3 * 1000,
        });
    }



    onSubmit(form: any) {


        // console.log(this.cursoForm.get('salaId').value)

        // console.log(this.cursoForm.get('prevInicio_1').value)
       


        // console.log(form.value)
        // console.log(form.valid)
        
        // console.log(this.cursoForm.get('dia2').value)
        // console.log(this.cursoForm.get('horarioIni_2').value)
        // console.log(this.cursoForm.get('horarioFim_2').value)

        // if ((this.cursoForm.get('dia2').value == "") ||
        //     (this.cursoForm.get('horarioIni_2').value == null) ||
        //     (this.cursoForm.get('horarioIni_2').value == '') ||
        //     (this.cursoForm.get('horarioFim_2').value) == null ||
        //     (this.cursoForm.get('horarioFim_2').value) == '') {
        //     console.log('set null all')
        //     this.cursoForm.get('dia2').setValue('')
        //     this.cursoForm.get('horarioIni_2').setValue('')
        //     this.cursoForm.get('horarioFim_2').setValue('')

        //     this.cursoForm.get('dia2').disable()
        //     this.cursoForm.get('horarioIni_2').disable()
        //     this.cursoForm.get('horarioFim_2').disable()
        // }



        if (form.valid) {
            this.turma = Object.assign({}, form.value);
            // this.cursoForm.disable()
            const turma = JSON.stringify(this.turma);
            this.disabledSpinner = true
            console.log(this.turma)


            // test new
            console.log(this.cursoForm.get('curso').value)
            var command: TurmaCommand = new TurmaCommand();
            command.modulo = this.cursoForm.get('curso').value//.id = this.cursos.id
            //command.modulo.descricao = this.cursos.descricao
            //command.modulo.duracaoMeses = this.cursos.duracaoMeses
            //command.modulo.unidadeId = this.cursos.unidadeId

            //command.vagas = this.cursoForm.get('vagas').value
            command.salaId = this.cursoForm.get('salaId').value
            command.minVagas = this.cursoForm.get('minVagas').value
            command.prevInicio_1 = this.cursoForm.get('prevInicio_1').value
            command.prevInicio_2 = this.cursoForm.get('prevInicio_2').value
            command.prevInicio_3 = this.cursoForm.get('prevInicio_3').value

            command.prevTermino_1 = this.cursoForm.get('prevTermino_1').value
            command.prevTermino_2 = this.cursoForm.get('prevTermino_2').value
            command.prevTermino_3 = this.cursoForm.get('prevTermino_3').value
            // temp
            command.horarioIni_1 = this.cursoForm.get('horarioIni_1').value
            command.horarioFim_1 = this.cursoForm.get('horarioFim_1').value

            command.horarioIni_2 = this.cursoForm.get('horarioIni_2').value
            command.horarioFim_2 = this.cursoForm.get('horarioFim_2').value

            command.segundoDiaAula = this.outrosDias[0].diaData

            command.descricao = this.cursoForm.get('descricao').value

            //console.log(command)

            let horarios: Horarios = new Horarios()
            horarios.dia1 = this.cursoForm.get('dia1').value
            horarios.horarioIni_1 = this.cursoForm.get('horarioIni_1').value
            horarios.horarioFim_1 = this.cursoForm.get('horarioFim_1').value
            //command.horarios.dia1= this.cursoForm.get('dia1').value
            //command.horarios.dia2= this.cursoForm.get('dia2').value

            //command.horarios.horarioIni_1= this.cursoForm.get('horarioIni_1').value
            //command.horarios.horarioFim_1= this.cursoForm.get('horarioFim_1').value
            command.horarios = horarios
            //command.horarios.horarioIni_2= this.cursoForm.get('horarioIni_2').value
            //command.horarios.horarioFim_2= this.cursoForm.get('horarioFim_2').value
            var verify = JSON.stringify(command);
            console.log(verify)
            console.log(command)
                this._http.post(`${this.baseUrl}/turmas`, command, {
                }).subscribe(response => {

                },
                    (error) => {
                        console.log(error)
                        this.disabledSpinner = false
                    },
                    () => {

                        this.openSnackBar()
                        this.disabledSpinner = false
                        this.cursoForm.reset();
                        this.dialogRef.close({ clicked: "OK" });
                    }
                )
        }


        // console.log(this.turma)
        // if (form.valid) {
        //     console.log('form valid')
        //     const novoColaborador = JSON.stringify(form.value);
        // }
    }

    valor: any
    previIniOne: any
    previIniDois: any
    previIniTres: any
    ver1() {
        console.log(this.cursoForm.get('prevInicio_1').value)
        console.log(this.cursoForm.get('prevInicio_2').value)
        console.log(this.cursoForm.get('prevInicio_3').value)
    }
    onFocusOutDateEvent(event: any, param) {
        var data;
        //if (event.target.value.length == 10) {

        if (param == "iniUm") {

            if (event.target.value.length == 10) {
                var data = event.target.value.split('/')
                var dataForm: Date = new Date(parseInt(data[2]), parseInt(data[1]) - 1,
                    parseInt(data[0]), 0, 0, 0)

                this.previIniOne = dataForm.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })//dataForm.getDay

                this.cursoForm.get('prevInicio_1').setValue(dataForm.toJSON())
            } else {
                this.cursoForm.get('prevInicio_1').setValue('')
            }


        }

        if (param == "iniDois") {
            if (event.target.value.length == 10) {
                var data = event.target.value.split('/')
                var dataForm: Date = new Date(parseInt(data[2]), parseInt(data[1]) - 1,
                    parseInt(data[0]), 0, 0, 0)

                this.previIniDois = dataForm.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })//dataForm.getDay

                this.cursoForm.get('prevInicio_2').setValue(dataForm.toJSON())
            } else {
                this.cursoForm.get('prevInicio_2').setValue('')
            }
        }

        if (param == "iniTres") {
            if (event.target.value.length == 10) {
                var data = event.target.value.split('/')
                var dataForm: Date = new Date(parseInt(data[2]), parseInt(data[1]) - 1,
                    parseInt(data[0]), 0, 0, 0)

                this.previIniTres = dataForm.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })//dataForm.getDay

                this.cursoForm.get('prevInicio_3').setValue(dataForm.toJSON())
            } else {
                this.cursoForm.get('prevInicio_3').setValue('')
            }
        }


        // } else {
        // this.cursoForm.get('prevInicio_1').setValue('')
        // this.cursoForm.get('prevInicio_2').setValue('')
        // this.cursoForm.get('prevInicio_3').setValue('')
        // }
        //console.log(this.cursoForm.get('prevInicio_1').value)

    }

    get getDatasValid() {
        return this.cursoForm.get('prevInicio_1').valid &&
            this.cursoForm.get('prevInicio_2').valid &&
            this.cursoForm.get('prevInicio_3').valid &&
            this.cursoForm.get('prevTermino_3').valid &&
            this.cursoForm.get('salaId').valid

    }



    previTerminoOne: any
    previTerminoDois: any
    previTerminoTres: any
    onFocusOutDateFinalEvent(event: any, param) {
        var data;
        if (event.target.value.length == 10) {

            if (param == "iniUm") {

                var data = event.target.value.split('/')
                var dataForm: Date = new Date(parseInt(data[2]), parseInt(data[1]) - 1,
                    parseInt(data[0]), 0, 0, 0)

                this.previTerminoOne = dataForm.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })//dataForm.getDay

                this.cursoForm.get('prevTermino_1').setValue(dataForm.toJSON())
            }

            if (param == "iniDois") {

                var data = event.target.value.split('/')
                var dataForm: Date = new Date(parseInt(data[2]), parseInt(data[1]) - 1,
                    parseInt(data[0]), 0, 0, 0)

                this.previTerminoDois = dataForm.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })//dataForm.getDay

                this.cursoForm.get('prevTermino_2').setValue(dataForm.toJSON())
            }

            if (param == "iniTres") {

                var data = event.target.value.split('/')
                var dataForm: Date = new Date(parseInt(data[2]), parseInt(data[1]) - 1,
                    parseInt(data[0]), 0, 0, 0)

                this.previTerminoTres = dataForm.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })//dataForm.getDay

                this.cursoForm.get('prevTermino_3').setValue(dataForm.toJSON())
            }


        } else {
            // this.cursoForm.get('prevInicio_1').setValue('')
            // this.cursoForm.get('prevInicio_2').setValue('')
            // this.cursoForm.get('prevInicio_3').setValue('')
        }
        console.log(this.cursoForm.get('prevInicio_1').value)

    }


}


export class PrimeiroDiaSemana {
    constructor(
        public item1?: string,
        public item2?: string,
    ) {

    }
}

export class DiasDisponiveis {
    constructor(
        public item1?: string,
        public item2?: string,
    ) {

    }
}

export class TurnosViewModel {
    constructor(
        public turno?: string,
        public diaSemana?: string,
        public diasSemanaDisponiveis?: string[]
    ) {

    }
}

