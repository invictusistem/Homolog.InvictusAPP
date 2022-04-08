// import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { Component, OnInit } from "@angular/core";
// import { MatDialog } from "@angular/material/dialog";
// import { PageEvent } from "@angular/material/paginator";
// import { JwtHelperService } from "@auth0/angular-jwt";
// import { HighlightTrigger } from "src/app/_shared/animation/animation";
// import { TokenInfos } from "src/app/_shared/models/token.model";
// import { environment } from "src/environments/environment";
// import { OpenTurmaEditmodel } from "../services/adm-modal";
// import { AdmService } from "../services/adm.service";

// @Component({
//     selector: "admturmas-app",
//     templateUrl: './administrativo-turma.component.html',
//     styleUrls: ['./administrativo-turma.component.scss'],
//     animations: [HighlightTrigger]
// })

// export class AdmTurmasComponent implements OnInit {

//     public initProgressBar = 'visible'
//     pageSize: number = 5;
//     pageEvent: PageEvent = new PageEvent
//     pageIndexNumber: number = 0;
//     cursos: any[] = new Array<any>();
//     baseUrl = environment.baseUrl;
//     turmas: any[] = new Array<any>();// TurmaViewModel[] = new Array<TurmaViewModel>()
//     private jwtHelper = new JwtHelperService();
//     tokenInfo: TokenInfos = new TokenInfos();
//     // colaboradores: Colaborador[] = new Array<Colaborador>();
//     currentPage = 1

//     showTurmas = false
//     showMessage = false
//     showSpinner = false
//     mensagem?: string;

//     constructor(
//         private _admService: AdmService,
//         private http: HttpClient,
//         private _modal: MatDialog
//     ) { }

//     ngOnInit() {


//         const token: any = localStorage.getItem('jwt')
//         this.tokenInfo = this.jwtHelper.decodeToken(token)
//         //console.log('init colaboradores 123')
//         this.getCursos();
//     }

//     iniciarTurma(turmaId: any): void {
//         //console.log(item)
//         const dialogRef = this._modal
//             .open(ConfirmarIniciarTurmaModal, {
//                 height: 'auto',
//                 width: '500px',

//                 //maxHeight: '90vh',
//                 //maxWidth: '400vh',

//                 data: { turmaId: turmaId },
//                 hasBackdrop: true,
//                 disableClose: true
//             });
//         dialogRef.afterClosed().subscribe(result => {
//             if (result.clicked === true) {
//                 this.getCursos();
//             }

//         });
//     }

//     get podeDeletar() {
//         // console.log(this.tokenInfo)
//         return this.tokenInfo.role == 'SuperAdm'
//     }

//     PodeAdiar(turma: any) {
//         return true
//         if (turma.statusAndamento == 'Aguardando início' &&
//             turma.previsaoInfo != '3ª previsão') {
//             return false
//         } else {
//             return true
//         }

//     }

//     adiar(turmaId: number) {
//         console.log('adiar')
//         return true
//         // this.http.put(`${this.baseUrl}/turma/adiar/${turmaId}`, {}).subscribe(response => {

//         // },
//         //     (error) => { console.log(error) },
//         //     () => {
//         //         this.getCursos();
//         //     }
//         // )
//     }

//     // atualizar() {
//     //     var itemsPerPage = 0;
//     //     var actualPage = 0;

//     //     this.http.get(`${this.baseUrl}/turmas/?itemsPerPage=` + itemsPerPage + `&currentPage=` + actualPage, {


//     //         headers: new HttpHeaders({
//     //             "Content-Type": "application/json",
//     //             "Authorization": "Bear "
//     //         })
//     //     }).subscribe(response => {


//     //         console.log(response)
//     //         Object.assign(this.turmas, response['data'])
//     //         Object.assign(this.turmas, response)
//     //         console.log(this.turmas)

//     //     }, (err) => {
//     //         console.log(err)
//     //         this.mensagem = "Ocorreu um erro! Contate o Administrador!"

//     //     },
//     //         () => {


//     //         });
//     // }

//     getCursos() {

//         var itemsPerPage = 0;
//         var actualPage = 0

//         this.showTurmas = false
//         this.showMessage = false
//         this.showSpinner = true

//         this._admService.GetTodasTurmasDaUnidade()
//             .subscribe(
//                 sucesso => { this.getCursosSucesso(sucesso) },
//                 falha => { this.getCursosFalha(falha) }
//             );
//     }

//     getCursosSucesso(response: any) {
//         Object.assign(this.turmas, response['turmas'])
//         this.initProgressBar = 'hidden'
//         this.showTurmas = true
//         this.showMessage = false
//         this.showSpinner = false
//     }

//     getCursosFalha(erro: any) {
//         this.initProgressBar = 'hidden'
//         // console.log(err)
//         this.mensagem = "Não há turmas cadastradas ou em andamento nesta unidade."
//         this.showTurmas = false
//         this.showMessage = true
//         this.showSpinner = false
//     }

//     createCurso() {

//     }

//     openCreateCursoModal(): void {
//         const dialogRef = this._modal
//             .open(CreateCursoComponent, {
//                 height: 'auto',
//                 width: '720px',
//                 autoFocus: false,
//                 maxHeight: '90vh',
//                 //maxWidth: '400vh',

//                 //data: { Hello: "Hello World" },
//                 hasBackdrop: true,
//                 disableClose: true
//             });
//         // dialogRef.afterClosed().subscribe(result => {
//         //     console.log('The dialog was closed');
//         //     // this.animal = result;
//         // });

//         dialogRef.afterClosed().subscribe(result => {
//             if (result.clicked === "OK") {
//                 this.getCursos();
//                 console.log('afte close ok')
//             }

//         });
//     }

//     openCalendarioModal(): void {
//         const dialogRef = this._modal
//             .open(CalendarioModalComponent, {
//                 height: 'auto',
//                 width: '1030px',
//                 autoFocus: false,
//                 maxHeight: '90vh',
//                 maxWidth: '400vh',

//                 data: { Hello: "Hello World" },
//                 hasBackdrop: true,
//                 disableClose: true
//             });
//         // dialogRef.afterClosed().subscribe(result => {
//         //     console.log('The dialog was closed');
//         //     // this.animal = result;
//         // });

//         dialogRef.afterClosed().subscribe(result => {
//             if (result.clicked === "OK") {
//                 // this.getCursos(1, this.pageSize);
//                 console.log('afte close ok')
//             }

//         });
//     }

//     openEditCursoModal(turma:any): void {
//         const dialogRef = this._modal
//             .open(EditCursoComponent, OpenTurmaEditmodel(turma));
//         dialogRef.afterClosed().subscribe((data) => {

//         });
//     }

//     deleteCurso(turma:any): void {

//         const dialogRef = this._modal
//             .open(ConfirmAcaoModalComponent, ConfirmAcaoModalConfig());
//         dialogRef.afterClosed().subscribe((data) => {

//             if (data.clicked == true) {

//                 this.http.delete(`${this.baseUrl}/dev/deletar-turma/${turma.id}`)
//                     .subscribe(
//                         response => { }, 
//                         err => { })
//             }
//         })
//     }

// }
