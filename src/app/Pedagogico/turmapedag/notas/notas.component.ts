import { HttpClient } from "@angular/common/http";
import { Component, Inject, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { AgendaProvas } from "src/app/_shared/models/agenda.modal";
import { Materia } from "src/app/_shared/models/materia.model";
import { AlunosNotas, Materias, NotasViewModel } from "src/app/_shared/models/Turma.model";
import { environment } from "src/environments/environment";
import { NotasDisciplinas } from "../../Pedag-Models/notasdisciplinas.model";


@Component({
    selector: 'notas-app',
    templateUrl: './notas.component.html',
    styleUrls: ['./notas.component.scss'],
    animations: [HighlightTrigger]

})

export class NotasComponent implements OnInit, OnChanges {

    teste: any;
    materias: Materia[] = new Array<Materia>();// NotasViewModel[] = new Array<NotasViewModel>();
    agendaProvas: AgendaProvas = new AgendaProvas();
    notasDisciplinas: NotasDisciplinas[] = new Array<NotasDisciplinas>()

    private BaseUrl = environment.baseUrl
    showTable = false
    materiaFilter: NotasViewModel = new NotasViewModel();
    V1Data: string = null
    V2Data: string = null
    V3Data: string = null

    constructor(
        private _http: HttpClient,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(this.V1Data)
        this.V2Data = null
        this.V3Data = null
    }

    ngOnInit() {
        console.log('notas component')
        console.log(this.data)
        this.V1Data = null
        this.V2Data = null
        this.V3Data = null
        this.getMaterias(this.data['turma'].moduloId);
        //this.getMateriasDoCurso(this.data['turma'].id);

        /*
        this.teste =
        {
            materia: 'Fundamentos de Enfermagem I',
            dataAv1: '15/11/2021',
            dataAv2: null,
            dataAv3: null,
            alunos: [
                {
                    nome: 'Alvaro Carlos Camargo',
                    av1: null,
                    av2: '6,5',
                    av3: '6,5',
                    disabledav1: true,
                    disabledav2: true,
                    disabledav3: true,
                },
                {
                    nome: 'Maria das Graças',
                    av1: '7,5',
                    av2: null,
                    disabledav1: true,
                    disabledav2: true,
                },
                {
                    nome: 'Maria das Graças',
                    av1: "falta",
                    av2: null,
                    disabledav1: true,
                    disabledav2: true,
                }
            ]
        }
        */
    }
    onFocusOutEvent(event: any, aluno) {
        console.log(event.target.value);
       
        
    }

    atualMateria: any;
    filter(materia) {
        console.log(materia)
        if (materia == ' ') console.log('vazia')

        this.atualMateria = materia
        // notaalunos/{turmaId}/{materiaId}")]
        this._http.get(`${this.BaseUrl}/pedag/notaalunos/${this.data['turma'].id}/${materia.id}`)
            .subscribe(resp => {
                console.log(resp)
                this.notasDisciplinas = Object.assign([], resp);
            },
                (error) => { console.log(error) },
                () => {
                    this.showTable = true
                   // this.materiaFilter = materia
                    
                    var discJson = JSON.stringify(this.notasDisciplinas)
                    console.log(discJson)
                   // this.getAlunos();
                })

        // console.log(this.data)

    }

    getAlunos(){

    }

    // get notasFilter(): NotasViewModel[] {
    //     //console.log(this.materiaFilter)
    //     this.showTable = false
    //     if (this.materiaFilter.materia != undefined) {
    //         var index = this.materias.indexOf(this.materiaFilter)

    //         // console.log(index)
    //         var mats = this.materias[index].alunos.filter(element => element.materia == this.materiaFilter.materia)
    //         this.V1Data = this.materias[index].dataAv1
    //         this.V2Data = this.materias[index].dataAv2
    //         this.V3Data = this.materias[index].dataAv3
    //         this.showTable = true
    //         // console.log(mats)
    //         return this.materias[index].alunos.filter(element => element.materia == this.materiaFilter.materia)
    //     }
    // }

    // get DataV1(){

    //     return this.V1Data;
    // }

    // get DataV2(){
    //     return this.V2Data;
    // }

    // get DataV3(){
    //     return this.V3Data;
    // }

    salvar() {


         console.log(this.notasDisciplinas)
        this._http.put(`${this.BaseUrl}/pedag/notaalunos`, this.notasDisciplinas, {})
            .subscribe(
                response => {
                    
                },
                (error) => { console.log(error) },
                () => {
                    this.filter(this.atualMateria)
                }

            )

    }

    atualModuloId=0
    getMaterias(moduloId) {
        // // //materias-professor
        // this._http.get(`${this.BaseUrl}/pedag/materias-professor/${turmaId}`)
        //     .subscribe(
        //         response => {
        //             this.materias = Object.assign([], response)
        //         },
        //         (error) => { console.log(error) },
        //         () => {
        //             console.log(this.materias)
        //         }

        //     )
        this.atualModuloId = moduloId
         this._http.get(`${this.BaseUrl}/unidade/materias/${moduloId}`)
            .subscribe(
                response => {
                    this.materias = Object.assign([], response)
                },
                (error) => { console.log(error) },
                () => {
                    console.log(this.materias)
                }

            )
    }

    // notaalunos/{turmaId}/{materiaId}")]

    getMateriasDoCurso(turmaId) {

        this._http.get(`${this.BaseUrl}/pedag/notaalunos/${turmaId}`)
            .subscribe(
                response => {
                    this.materias = Object.assign([], response)
                },
                (error) => { console.log(error) },
                () => {
                    console.log(this.materias)
                }

            )
    }

    keyPress(event: KeyboardEvent) {


        //     console.log(event)
        //     const pattern = /[0-9]/;
        // const inputChar = String.fromCharCode(event).charCode);
        // if (!pattern.test(inputChar)) {    
        //     // invalid character, prevent input
        //     event.preventDefault();
        // }

    }
}


