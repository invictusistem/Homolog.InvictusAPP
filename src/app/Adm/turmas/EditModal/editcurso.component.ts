import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { GenericTask } from 'src/app/shared/models/generictask.model';
import { Output, EventEmitter } from '@angular/core';
//import { AdmService } from '../../adm.service';
import { PageEvent } from '@angular/material/paginator';
import { Colaborador, Professor } from "src/app/_shared/models/colaborador.model";
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AddProfessorModalComponent } from "../ModalAddProf/addprof.component";
import { TurmaViewModel } from "src/app/_shared/models/Turma.model";
import { Aluno } from "src/app/_shared/models/aluno.model";
import { AddPMateriaModalComponent } from "../ModalAddMateria/addmateria.component";
//import { TemplateTasks } from 'src/app/shared/models/templateTasks.model';

@Component({
    selector: 'editcursomodal',
    templateUrl: './editcurso.component.html',
    styleUrls: ['./editcurso.component.scss']
})


export class EditCursoComponent implements OnInit {

    // pageSize: number = 5;
    // genericTasks: GenericTask[] = new Array<GenericTask>();
    // length: number;
    // pageEvent: PageEvent;
    //editedColaborador: Colaborador = new Colaborador();
    turma: TurmaViewModel = new TurmaViewModel()
    view: Views = new Views();
    alunos: Aluno[] = new Array<Aluno>();
    professores: Professor[] = new Array<Professor>();
    previsaoTermino = "Previsão de início 1: 01/05/2021"
    BaseUrl = environment.baseUrl
    ativo = true;
    pageEvent: PageEvent;
    length = 0;
    pageSize = 5;
    selectedPage = 1
    mensagemSemProfessores = false
    

    constructor(
        private _http: HttpClient,
        //private service: AdmService,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<EditCursoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    //@Output() newItemEvent = new EventEmitter<string>();


    ngOnInit() {
        this.ativo = true;
        console.log(this.data['turma'])


        this.getAlunosDaTurma(this.data['turma'].id)
        this.getCursoById(this.data['turma'].id)
        this.getProfessores(this.data['turma'].id)
        //  Object.assign(this.editedColaborador, this.data['colaborador'])
        // console.log("on init")
        //this.getTasks(1, this.pageSize);
    }

    get professoresSlice(): Professor[] {
        let pageIndex = (this.selectedPage - 1) * this.pageSize
        //console.log(pageIndex)
        return this.professores.slice(pageIndex, pageIndex + this.pageSize);
    }

    changePage(evento: any) {
         console.log(evento["pageIndex"])
         this.selectedPage = evento["pageIndex"] + 1//newPage;
        //             console.log('ok get');
        //             this.showSpinner = false
        //             this.pageIndexNumber = (evento.pageIndex * this.pageSize)
       
    }


    vagas: string;
    previ1: string;
    previ2: string;
    previ3: string;
    previQuadro1linethrough: boolean
    previQuadro1Color: boolean
    previQuadro1Proximo: boolean

    previQuadro2linethrough: boolean
    previQuadro2Color: boolean
    previQuadro2Proximo: boolean

    previQuadro3linethrough: boolean
    previQuadro3Color: boolean
    previQuadro3Proximo: boolean

    getProfessores(turmaId) {

        console.log('get alunos turma')
        //alunosturma
        this._http.get(`${this.BaseUrl}/turmas/professoresturma/${turmaId}`)
            .subscribe(
                (response) => {
                    console.log(response)
                    this.professores = new Array<Professor>();
                    Object.assign(this.professores, response)

                },
                (error) => { 
                    console.log(error)
                },
                () => {
                    console.log(this.professores)
                    this.length = this.professores.length
                    console.log(this.length)
                    
                    if(this.length == 0){
                        this.mensagemSemProfessores = true
                    }else{
                        this.mensagemSemProfessores = false
                    }

                    console.log(this.length)
                }
            )
    }

    get vagasMatriculados(){

        return `${this.data['turma'].vagas}/${this.data['turma'].totalAlunos}`
    }

    get duracaomsg(){

        return `Turma iniciada em ${new Date(this.data['turma'].previsaoAtual).toLocaleString('pt-BR', {
            day: 'numeric', // numeric, 2-digit
            year: 'numeric', // numeric, 2-digit
            month: 'numeric'})} com previsão de término em ${new Date(this.data['turma'].previsaoTerminoAtual).toLocaleString('pt-BR', {
                day: 'numeric', // numeric, 2-digit
                year: 'numeric', // numeric, 2-digit
                month: 'numeric'})}`
    }

    excluirProfessorDaTurma(profId) {

        // ("excluir/{profId}/{turmaId}")]
        this._http.delete(`${this.BaseUrl}/turmas/excluir/${profId}/${this.data['turma'].id}`)
            .subscribe(
                result => { },
                (error) => { },
                () => {

                    // let index = this.professores.indexOf(profId);
                    // this.professores.splice(index, 1)
                    this.getProfessores(this.data['turma'].id)
                }
            )


    }
    

    getCursoById(id) {
        console.log(id)
        this._http.get(`${this.BaseUrl}/turmas/${id}`)
            .subscribe(
                (response) => {
                    console.log(response)
                    this.turma = Object.assign({}, response as TurmaViewModel);
                },
                (error) => { },
                () => {
                    this.vagas = `${this.turma.vagas}/${this.turma.totalAlunos}`
                    this.descricaoCompleta = `Turma ${this.turma.identificador} (${this.turma.descricao})`
                    this.previ1 = `Previsão de início 1: ${new Date(this.turma.previsoes.previsionStartOne).toLocaleDateString()}`

                    this.previ2 = `Previsão de início 2: ${new Date(this.turma.previsoes.previsionStartTwo).toLocaleDateString()}`

                    this.previ3 = `Previsão de início 3: ${new Date(this.turma.previsoes.previsionStartThree).toLocaleDateString()}`

                    console.log(this.previ1)

                    if (this.turma.previsao == '1ª previsão') {
                        this.previQuadro1linethrough = false
                        this.previQuadro1Color = false
                        this.previQuadro1Proximo = true

                        this.previQuadro2linethrough = false
                        this.previQuadro2Color = false
                        this.previQuadro2Proximo = false

                        this.previQuadro3linethrough = false
                        this.previQuadro3Color = false
                        this.previQuadro3Proximo = false

                    } else if (this.turma.previsao == '2ª previsão') {
                        this.previQuadro1linethrough = true
                        this.previQuadro1Color = true
                        this.previQuadro1Proximo = false

                        this.previQuadro2linethrough = false
                        this.previQuadro2Color = false
                        this.previQuadro2Proximo = true

                        this.previQuadro3linethrough = false
                        this.previQuadro3Color = false
                        this.previQuadro3Proximo = false

                    } else if (this.turma.previsao == '3ª previsão') {
                        this.previQuadro1linethrough = true
                        this.previQuadro1Color = true
                        this.previQuadro1Proximo = false

                        this.previQuadro2linethrough = true
                        this.previQuadro2Color = true
                        this.previQuadro2Proximo = false

                        this.previQuadro3linethrough = false
                        this.previQuadro3Color = false
                        this.previQuadro3Proximo = true
                    }
                }
            )
    }

    descricaoCompleta: string = ""
    getAlunosDaTurma(turmaId) {
        console.log('get alunos turma')
        // alunosturma
        this._http.get(`${this.BaseUrl}/turmas/alunosturma/?turmaId=${turmaId}`)
            .subscribe(
                (response) => {
                    console.log(response)

                    Object.assign(this.alunos, response)

                },
                (error) => {console.log(error) },
                () => {
                    console.log(this.alunos)

                }
            )
    }

    openAddProfModal(): void {
        const dialogRef = this.dialog
            .open(AddProfessorModalComponent, {
                height: 'auto',
                width: '1030px',
                autoFocus: false,
                maxHeight: '90vh',
                maxWidth: '400vh',

                data: { turmaId: this.data['turma'].id },
                hasBackdrop: true,
                disableClose: true
            });

        dialogRef.afterClosed().subscribe(result => {
            //console.log('The dialog was closed');
            console.log(result);
            if (result["clicked"] == "OK") {
                console.log(result["profsIds"])
                this.saveProfs(result["profsIds"])


            }
            // console.log(this.templateTasks);
            //console.log(this.templateTasks);
            //this.newtasks. = this.templateTasks
            // this.templateTasks = result;
        });
    }

    openAddMateriaModal(prof): void {
        const dialogRef = this.dialog
            .open(AddPMateriaModalComponent, {
                height: 'auto',
                width: '1030px',
                autoFocus: false,
                maxHeight: '90vh',
                maxWidth: '400vh',

                data: { turmaId: this.data['turma'].id, professor: prof },
                hasBackdrop: true,
                disableClose: true
            });

        dialogRef.afterClosed().subscribe(result => {
            //console.log('The dialog was closed');
            console.log(result);
            if (result["clicked"] == "OK") {
                console.log(result["profsIds"])
                this.saveProfs(result["profsIds"])


            }
            // console.log(this.templateTasks);
            //console.log(this.templateTasks);
            //this.newtasks. = this.templateTasks
            // this.templateTasks = result;
        });
    }

    saveProfs(profIds: number[]) {
        console.log(this.data['turma'].id)
        console.log(profIds)
        var saveProfs: SaveProfsCommand = new SaveProfsCommand();
        saveProfs.turmaId = this.data['turma'].id
        saveProfs.listProfsIds = profIds

        this._http.post(`${this.BaseUrl}/turmas/professores`, saveProfs, {

        })
            .subscribe(
                (response) => {
                    console.log(response)

                    //

                },
                (error) => { },
                () => {

                    this.getProfessores(this.data['turma'].id)
                    //console.log(this.alunos)

                }
            )
    }


    submitForm(form: NgForm) {
        if (form.valid) {
            console.log('form valid')
            // this.model.saveProduct(this.product);
            // //this.product = new Product();
            // //form.reset();
            // this.originalProduct = this.product;
            // this.router.navigateByUrl("/");
        }
    }

}

export class SaveProfsCommand {
    constructor(
        public turmaId?: number,
        public listProfsIds?: number[]
    ) { }

}


export class Views {
    constructor(
        public descricaoCompleta?: string
    ) {

    }
}