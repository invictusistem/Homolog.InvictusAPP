import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { Turma, TurmaViewModel } from "src/app/_shared/models/Turma.model";

import { environment } from "src/environments/environment";
import { CalendarioModalComponent } from "./Calendario/calendario.component";
import { ConfirmarIniciarTurmaModal } from "./confirmturmamodal/confirmariniciar.component";
import { CreateCursoComponent } from "./CreateModal/createcurso.component";
import { EditCursoComponent } from "./EditModal/editcurso.component";


@Component({
    selector: "admturmas-app",
    templateUrl: './admturmas.component.html',
    //styleUrls: ['./admturmas.component.scss'],
    animations: [HighlightTrigger]
})

export class AdmTurmasComponent implements OnInit {

    pageSize: number = 5;
    pageEvent: PageEvent;
    pageIndexNumber: number = 0;
    cursos: Turma[] = new Array<Turma>();
    baseUrl = environment.baseUrl;
    turmas: TurmaViewModel[] = new Array<TurmaViewModel>()
    private jwtHelper = new JwtHelperService();
    tokenInfo: TokenInfos = new TokenInfos();
    // colaboradores: Colaborador[] = new Array<Colaborador>();
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
        console.log('init colaboradores 123')
        this.getCursos();
    }

    iniciarTurma(turmaId): void {
        //console.log(item)
        const dialogRef = this._modal
            .open(ConfirmarIniciarTurmaModal, {
                height: 'auto',
                width: '500px',
                autoFocus: false,
                //maxHeight: '90vh',
                //maxWidth: '400vh',

                data: { turma: turmaId },
                hasBackdrop: true,
                disableClose: true
            });
        dialogRef.afterClosed().subscribe(result => {
            if (result.clicked === "Sim") {

                console.log(turmaId)
                this.http.put(`${this.baseUrl}/turmas/turma/${turmaId}`, {

                }).subscribe(result => {

                },
                    (error) => { console.log(error) },
                    () => {
                        this.atualizar();
                    }
                )

            } else {
                console.log('nao')
            }

        });
    }

    PodeAdiar(turma: TurmaViewModel) {
        if (turma.statusDaTurma == 'Aguardando início' &&
            turma.previsao != '3ª previsão') {
            return false
        } else {
            return true
        }
    }

    adiar(turmaId: number) {
        console.log('adiar')

        this.http.put(`${this.baseUrl}/turmas/turma/adiar/${turmaId}`, {}).subscribe(response => {

        },
            (error) => { console.log(error) },
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


            console.log(response)
            Object.assign(this.turmas, response['data'])
            Object.assign(this.turmas, response)
            console.log(this.turmas)

        }, (err) => {
            console.log(err)
            this.mensagem = "Ocorreu um erro! Contate o Administrador!"

        },
            () => {


            });
    }

    getCursos() {

        var itemsPerPage = 0;
        var actualPage = 0


        this.showTurmas = false
        this.showMessage = false
        this.showSpinner = true
        console.log('get cursos 1234')
        //this.http.get(`${this.baseUrl}/turmas/?itemsPerPage=` + itemsPerPage + `&currentPage=` + actualPage, {
        //this.http.post("http://api.invictustemp.com.thor.hostazul.com.br/api/identity/login", credentials, {
        this.http.get(`${this.baseUrl}/turmas`)
            .subscribe(response => {


                console.log(response)
                //Object.assign(this.turmas, response['data'])
                Object.assign(this.turmas, response)
                console.log(this.turmas)
                // this.colaboradores = Object.assign([], response['data'])
                //console.log(this.colaboradores)
                // this.dialogRef.close();
            }, (err) => {
                console.log(err)
                this.mensagem = "Ocorreu um erro! Contate o Administrador!"

            },
                () => {

                    if (this.turmas.length == 0) {
                        this.mensagem = "Não há turmas cadastradas ou em andamento."
                        this.showTurmas = false
                        this.showMessage = true
                        this.showSpinner = false
                    } else {
                        this.showTurmas = true
                        this.showMessage = false
                        this.showSpinner = false
                    }
                });

    }

    createCurso() {

    }

    openCreateCursoModal(): void {
        const dialogRef = this._modal
            .open(CreateCursoComponent, {
                height: 'auto',
                width: '920px',
                autoFocus: false,
                maxHeight: '90vh',
                //maxWidth: '400vh',

                data: { Hello: "Hello World" },
                hasBackdrop: true,
                disableClose: true
            });
        // dialogRef.afterClosed().subscribe(result => {
        //     console.log('The dialog was closed');
        //     // this.animal = result;
        // });

        dialogRef.afterClosed().subscribe(result => {
            if (result.clicked === "OK") {
                this.getCursos();
                console.log('afte close ok')
            }

        });
    }

    openCalendarioModal(): void {
        const dialogRef = this._modal
            .open(CalendarioModalComponent, {
                height: 'auto',
                width: '1030px',
                autoFocus: false,
                maxHeight: '90vh',
                maxWidth: '400vh',

                data: { Hello: "Hello World" },
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
                console.log('afte close ok')
            }

        });
    }

    openEditCursoModal(item: Turma): void {
        //console.log(item)
        const dialogRef = this._modal
            .open(EditCursoComponent, {
                height: 'auto',
                width: '1030px',
                autoFocus: false,
                maxHeight: '90vh',
                maxWidth: '400vh',

                data: { turma: item },
                hasBackdrop: true,
                disableClose: true
            });
        // dialogRef.afterClosed().subscribe(result => {
        //     console.log('The dialog was closed');
        //     // this.animal = result;
        // });

        dialogRef.afterClosed().subscribe(result => {
            //console.log('The dialog was closed');
            // console.log(result);
            // console.log(this.templateTasks);
            //console.log(this.templateTasks);
            //this.newtasks. = this.templateTasks
            // this.templateTasks = result;
        });
    }



}
