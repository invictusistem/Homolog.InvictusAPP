import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { GenericTask } from 'src/app/shared/models/generictask.model';
import { Output, EventEmitter } from '@angular/core';
//import { AdmService } from '../../adm.service';
import { PageEvent } from '@angular/material/paginator';
import { Colaborador } from "src/app/_shared/models/colaborador.model";
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AddProfessorModalComponent } from "../ModalAddProf/addprof.component";
//import { TemplateTasks } from 'src/app/shared/models/templateTasks.model';

export class Grids {
    constructor(
        //public styles?: string,
        public estilo?: { [key: string]: string },
        public materia?: string
    ) {

    }
}

@Component({
    selector: 'calendario-modal',
    templateUrl: './calendario.component.html',
    styleUrls: ['./calendario.component.scss']
})


export class CalendarioModalComponent implements OnInit {

    grids: Grids[] = new Array<Grids>()

    styles: { [key: string]: string } = {
        'border': '1px solid rgb(93, 93, 104)',
        'display': 'flex',
        'float': 'left',
        'align-items': 'center',
        'justify-content': 'center',
        'height': '20px',
        'width': '20px'
    }

    styles2: { [key: string]: string } = {
        'height': '30px',
        'width': '40px',
        'border-radius': '20px',
        'flex': '1',
        'background': 'linear-gradient(45deg, green 0%, green 50%, red 0%, red 50%)'
    }
    // cor = 'rgb(16, 16, 216)'
    cor = 'green'

    // prototipoCalendario: ProtoCalendar[] = new Array<ProtoCalendar>();
    getColor(dia, index) {
        console.log(dia)
        console.log(index)
        let result;
        // this.prototipoCalendario[0].dias.forEach(element => {
        //     element.dia == dia ? result = true : result = false
        // });


        let achado = this.prototipoCalendario[index - 1].dias.find(element => element.dia == dia);
        if (achado == undefined) {
            return false
        } else {
            return true;
        }

        //return result;

    }

    prototipoCalendario = [
        {
            ano: 2021,
            mes: 'Jan',
            visibility: 'visible',
            totaldiasplot: ['', '', '', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11',
                '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26',
                '27', '28', '29', '30', '31', ''
            ],
            dias: [
                {
                    dia: '',
                    cor: 'white'
                },
                {
                    dia: '',
                    cor: 'white'
                },
                {
                    dia: '',
                    cor: 'white'
                },
                {
                    dia: '1',
                    cor: 'linear-gradient(45deg, green 0%, green 50%, red 0%, red 50%)'
                },
                {
                    dia: '2',
                    cor: 'white'
                },
                {
                    dia: '3',
                    cor: 'white'
                },
                {
                    dia: '4',
                    cor: 'green'
                },
                {
                    dia: '5',
                    cor: 'white'
                },
                {
                    dia: '6',
                    cor: 'white'
                },
                {
                    dia: '7',
                    cor: 'white'
                },
                {
                    dia: '8',
                    cor: 'white'
                },
                {
                    dia: '9',
                    cor: 'white'
                },
                {
                    dia: '10',
                    cor: 'white'
                },

                {
                    dia: '11',
                    cor: 'green'
                },
                {
                    dia: '12',
                    cor: 'white'
                },
                {
                    dia: '13',
                    cor: 'green'
                },
                {
                    dia: '14',
                    cor: 'white'
                },
                {
                    dia: '15',
                    cor: 'white'
                },
                {
                    dia: '16',
                    cor: 'white'
                },
                {
                    dia: '17',
                    cor: 'white'
                },
                {
                    dia: '18',
                    cor: 'white'
                },
                {
                    dia: '19',
                    cor: 'white'
                },
                {
                    dia: '20',
                    cor: 'white'
                },
                {
                    dia: '21',
                    cor: 'white'
                },
                {
                    dia: '22',
                    cor: 'white'
                },
                {
                    dia: '23',
                    cor: 'white'
                },
                {
                    dia: '24',
                    cor: 'green'
                },
                {
                    dia: '25',
                    cor: 'white'
                },
                {
                    dia: '26',
                    cor: 'white'
                },
                {
                    dia: '27',
                    cor: 'white'
                },
                {
                    dia: '28',
                    cor: 'white'
                },
                {
                    dia: '29',
                    cor: 'white'
                },
                {
                    dia: '30',
                    cor: 'white'
                },
                {
                    dia: '31',
                    cor: 'white'
                },
                {
                    dia: '',
                    cor: 'white'
                },
            ]

        },
        {
            ano: 2021,
            mes: 'Fev',
            visibility: 'visible'
        },
        {
            ano: 2021,
            mes: 'Mar',
            visibility: 'visible'
        }

    ]


    /*
            {
                mes: "Jan",
                visibility: 'hidden',
    
            },
            {
                mes: "Fev",
                visibility: 'hidden'
            },
            {
                mes: "Mar",
                visibility: 'hidden'
            },
            {
                mes: "Abr",
                visibility: 'hidden'
            },
            {
                mes: "Mai",
                visibility: 'visible',
                dias:
                    [
                        {
                            dia: '4',
                            cor: '',
                        },
                        {
                            dia: '5',
                            cor: '',
                        },
                        {
                            dia: '11',
                            cor: '',
                        },
                        {
                            dia: '12',
                            cor: '',
                        },
                        {
                            dia: '18',
                            cor: '',
                        },
                        {
                            dia: '19',
                            cor: '',
                        },
                        {
                            dia: '25',
                            cor: '',
                        },
                        {
                            dia: '26',
                            cor: '',
                        }
    
    
                    ]
            },
            {
                // 4, 5, 11, 12, 18, 19, 25, 26
                mes: "Jun",
                visibility: 'visible'
            },
            {
                mes: "Jul",
                visibility: 'visible'
            },
            {
                mes: "Ago",
                visibility: 'visible'
            },
            {
                mes: "Set",
                visibility: 'visible'
            },
            {
                mes: "Out",
                visibility: 'visible'
            },
            {
                mes: "Nov",
                visibility: 'visible'
            },
            {
                mes: "Des",
                visibility: 'visible'
            }
    
        ]
    
    */
    // cor = 'rgb(173, 92, 92)'

    // pageSize: number = 5;
    // genericTasks: GenericTask[] = new Array<GenericTask>();
    // length: number;
    // pageEvent: PageEvent;
    //editedColaborador: Colaborador = new Colaborador();
    meses: number[] = new Array<number>(12)
    //calendarArray: number[] = new Array<number>(31)
    calendarArray: string[] = new Array<string>()
    semanas: string[] = new Array<string>('D', 'S', 'T', 'Q', 'Q', 'S', 'S')
    previsaoTermino = "Previsão de início 1: 01/05/2021"
    BaseUrl = environment.baseUrl
    ativo = true;
    constructor(
        private _http: HttpClient,
        //private service: AdmService,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<CalendarioModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    //@Output() newItemEvent = new EventEmitter<string>();


    ngOnInit() {
        // this.prototipoCalendario
        this.ativo = true;
        console.log(this.data['turma'])
        //this.getAlunosDaTurma(this.data['turma'].cursoId)
        //  Object.assign(this.editedColaborador, this.data['colaborador'])
        // console.log("on init")
        //this.getTasks(1, this.pageSize);

        // this.grids[0].materia = "Enfermagem nas Intercorrências Clínicas"
        // this.grids[1].estilo = this.styles2
        // this.grids[1].materia = "Enfermagem nas Intercorrências Clínicas"
        this.calendarArray.push('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17',
            '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30')
        this.calendarArray.unshift('', '', '')
        this.calendarArray.push('', '')
        // console.
        this.construir()
    }

    construir() {
        this.grids = new Array<Grids>()
        let grid = new Grids(this.styles2,
            "Enfermagem nas Intercorrências Clínicas")
        let grid2 = new Grids(this.styles2,
            "Enfermagem nas Intercorrências Clínicas")
        this.grids.push(grid)
        this.grids.push(grid2)
    }

    getAlunosDaTurma(turmaId) {
        console.log(turmaId)
        // alunosturma
        this._http.get(`${this.BaseUrl}/cursos/alunosturma/?turmaId=${turmaId}`)
            .subscribe(
                (response) => { console.log(response) },
                (error) => { },
                () => { }
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

                data: {},
                hasBackdrop: true,
                disableClose: true
            });

        dialogRef.afterClosed().subscribe(result => {
            //console.log('The dialog was closed');
            // console.log(result);
            // console.log(this.templateTasks);
            //console.log(this.templateTasks);
            //this.newtasks. = this.templateTasks
            // this.templateTasks = result;
        });
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


export class ProtoCalendar {
    constructor(
        public mes?: string,
        public visibility?: string,
        public totalDias?: number[],
        public dias?: number[],
    ) {

    }
}

export class DiasMes {
    constructor(
        public totaldias?: number[],
        public dia?: number[],
    ) {

    }
}