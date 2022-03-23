import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { Turma, TurmaViewModel } from "src/app/_shared/models/Turma.model";

import { environment } from "src/environments/environment";
import { NotasComponent } from "../turmapedag/notas/notas.component";
import { TurmasInfoAlunosPedagComponent } from "./AlunosTurma/turmasinfoalunos.component";
import { CalendarioTurmaComponent } from "./CalendarioDaTurma/calendarioturma.component";



@Component({
    selector: "admturmas-app",
    templateUrl: './turmasinfopedag.component.html',
    styleUrls: ['./turmasinfopedag.component.scss'],
    animations: [HighlightTrigger]
})

export class TurmasPedagInfoComponent implements OnInit {

    pageSize: number = 5;
    pageEvent: PageEvent;
    pageIndexNumber: number = 0;
    cursos: any[] = new Array<any>();// Turma[] = new Array<Turma>();
    baseUrl = environment.baseUrl;
    turmas: TurmaViewModel[] = new Array<TurmaViewModel>()
    public spinnerSearch = 'visible'
    public showTable = false
    // colaboradores: Colaborador[] = new Array<Colaborador>();
    private jwtHelper = new JwtHelperService();
    public tokenInfo: TokenInfos = new TokenInfos();

    currentPage = 1

    showTurmas = false
    showMessage = false
    showSpinner = false
    mensagem: string;

    constructor(
        private http: HttpClient,
        private _modal: MatDialog
    ) { }

    ngOnInit() {
        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)
        this.getCursos();
    }

    // iniciarTurma(turmaId): void {
    //     //console.log(item)
    //     const dialogRef = this._modal
    //         .open(ConfirmarIniciarTurmaModal, {
    //             height: 'auto',
    //             width: '500px',
    //             autoFocus: false,
    //             //maxHeight: '90vh',
    //             //maxWidth: '400vh',

    //             data: { turma: turmaId },
    //             hasBackdrop: true,
    //             disableClose: true
    //         });
    //     dialogRef.afterClosed().subscribe(result => {
    //         if (result.clicked === "Sim") {

    //             console.log(turmaId)
    //             this.http.put(`${this.baseUrl}/turmas/turma/${turmaId}`, {

    //             }).subscribe(result => {

    //             },
    //                 (error) => { console.log(error) },
    //                 () => {
    //                     this.atualizar();
    //                 }
    //             )

    //         } else {
    //             console.log('nao')
    //         }

    //     });
    // }

    PodeAdiar(turma: TurmaViewModel) {
        if (turma.statusDaTurma == 'Aguardando início' &&
            turma.previsao != '3ª previsão') {
            return false
        } else {
            return true
        }
    }

    adiar(turmaId: number) {
       // console.log('adiar')

        this.http.put(`${this.baseUrl}/turmas/turma/adiar/${turmaId}`, {}).subscribe(response => {

        },
            (error) => { 
                //console.log(error)
             },
            () => {
                this.atualizar();
            }
        )
    }

    atualizar() {
        var itemsPerPage = 0;
        var actualPage = 0;

        this.http.get(`${this.baseUrl}/turmas/?itemsPerPage=` + itemsPerPage + `&currentPage=` + actualPage, {
            //this.http.post("http://api.invictustemp.com.thor.hostazul.com.br/api/identity/login", credentials, {

            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Authorization": "Bear "
            })
        }).subscribe(response => {


           // console.log(response)
            Object.assign(this.turmas, response['data'])
            Object.assign(this.turmas, response)
            //console.log(this.turmas)

        }, (err) => {
           // console.log(err)
            this.mensagem = "Ocorreu um erro! Contate o Administrador!"

        },
            () => {


            });
    }

    getTurmas() {

        // this.showTurmas = false
        // this.showMessage = false
        // this.showSpinner = true

        // this._http.get(`${this.BaseUrl}/pedag/turma`)
        //     .subscribe(response => {
        //         this.turmas = Object.assign([], response['turmas']);
        //         console.log(this.turmas)
        //     },
        //         (error) => {
        //            // this.mensagem = "Ocorreu um erro! Contate o Administrador!"
        //             console.log(error)
        //             this.mensagem = "Não há turmas cadastradas ou em andamento."
        //                 this.showTurmas = false
        //                 this.showMessage = true
        //                 this.showSpinner = false
        //         },
        //         () => {                    
        //                 this.showTurmas = true
        //                 this.showMessage = false
        //                 this.showSpinner = false                    
        //         })
    }

    getCursos() {

        var itemsPerPage = 0;
        var actualPage = 0


        this.showTurmas = false
        this.showMessage = false
        this.showSpinner = true
        // console.log('get cursos 1234')
        //this.http.get(`${this.baseUrl}/turmas/?itemsPerPage=` + itemsPerPage + `&currentPage=` + actualPage, {
        //this.http.post("http://api.invictustemp.com.thor.hostazul.com.br/api/identity/login", credentials, {
        this.http.get(`${this.baseUrl}/pedag/turma`)
            .subscribe(response => {


                // console.log(response)
                //Object.assign(this.turmas, response['data'])
                this.turmas = Object.assign([], response['turmas']);
                //  console.log(this.turmas)
                // this.colaboradores = Object.assign([], response['data'])
                //console.log(this.colaboradores)
                // this.dialogRef.close();
            }, (err) => {
                // console.log(err)
                this.spinnerSearch = 'hidden'

                this.showTable = false
                this.mensagem = "Ocorreu um erro! Contate o Administrador!"

                this.mensagem = "Não há turmas cadastradas ou em andamento."
                this.showTurmas = false
                this.showMessage = true
                this.showSpinner = false

            },
                () => {
                    this.spinnerSearch = 'hidden'
                    this.showTable = true
                    this.showTurmas = true
                    this.showMessage = false
                    this.showSpinner = false

                });

    }

    createCurso() {

    }

    // openCreateCursoModal(): void {
    //     const dialogRef = this._modal
    //         .open(CreateCursoComponent, {
    //             height: 'auto',
    //             width: '920px',
    //             autoFocus: false,
    //             maxHeight: '90vh',
    //             //maxWidth: '400vh',

    //             data: { Hello: "Hello World" },
    //             hasBackdrop: true,
    //             disableClose: true
    //         });
    //     // dialogRef.afterClosed().subscribe(result => {
    //     //     console.log('The dialog was closed');
    //     //     // this.animal = result;
    //     // });

    //     dialogRef.afterClosed().subscribe(result => {
    //         if (result.clicked === "OK") {
    //             this.getCursos();
    //             console.log('afte close ok')
    //         }

    //     });
    // }

    listaPresenca(turma) {


    }

    openNotas(turma): void {

        const dialogRef = this._modal.open(NotasComponent, {
            height: 'auto',
            width: '1030px',
            autoFocus: false,
            maxHeight: '90vh',
            maxWidth: '400vh',
            data: { turma: turma },
            hasBackdrop: true,
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
          //  console.log('The dialog was closed');
            // this.animal = result;
        });
    } v

    openCalendarioModal(turma: TurmaViewModel): void {
        const dialogRef = this._modal
            .open(CalendarioTurmaComponent, {
                height: 'auto',
                width: '1230px',


                //autoFocus: false,
                maxHeight: '90vh',
                maxWidth: '450vh',

                data: { turma: turma },
                hasBackdrop: true,
                disableClose: true
            });
        // dialogRef.afterClosed().subscribe(result => {
        //     console.log('The dialog was closed');
        //     // this.animal = result;
        // });

        dialogRef.afterClosed().subscribe(result => {
            if (result.clicked === "OK") {
                // this.getCursos(1, this.pageSize);
                //console.log('afte close ok')
            }

        });
    }

    getAlunosFromTurma(turma: TurmaViewModel): void {
        const dialogRef = this._modal
            .open(TurmasInfoAlunosPedagComponent, {
               // height: 'auto',
                width: '1230px',
               // autoFocus: false,
               // maxHeight: '90vh',
               // maxWidth: '400vh',

                data: { turma: turma },
                hasBackdrop: true,
                disableClose: true
            });
        // dialogRef.afterClosed().subscribe(result => {
        //     console.log('The dialog was closed');
        //     // this.animal = result;
        // });

        dialogRef.afterClosed().subscribe(result => {
            if (result.clicked === "OK") {
                // this.getCursos(1, this.pageSize);
              //  console.log('afte close ok')
            }

        });
    }
    // openEditCursoModal(item: Turma): void {
    //     //console.log(item)
    //     const dialogRef = this._modal
    //         .open(EditCursoComponent, {
    //             height: 'auto',
    //             width: '1030px',
    //             autoFocus: false,
    //             maxHeight: '90vh',
    //             maxWidth: '400vh',

    //             data: { turma: item },
    //             hasBackdrop: true,
    //             disableClose: true
    //         });
    //     // dialogRef.afterClosed().subscribe(result => {
    //     //     console.log('The dialog was closed');
    //     //     // this.animal = result;
    //     // });

    //     dialogRef.afterClosed().subscribe(result => {
    //         //console.log('The dialog was closed');
    //         // console.log(result);
    //         // console.log(this.templateTasks);
    //         //console.log(this.templateTasks);
    //         //this.newtasks. = this.templateTasks
    //         // this.templateTasks = result;
    //     });
    // }



}
