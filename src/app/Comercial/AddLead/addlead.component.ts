// import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { Component, ElementRef, OnInit } from "@angular/core";
// import { MatDialog } from "@angular/material/dialog";
// import { PageEvent } from "@angular/material/paginator";
// import { Router } from "@angular/router";
// import { JwtHelperService } from "@auth0/angular-jwt";
// import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
// import { TokenInfos } from "src/app/_shared/models/token.model";
// import { Turma, TurmaViewModel } from "src/app/_shared/models/Turma.model";

// import { environment } from "src/environments/environment";
// import { LeadIndividualCriarComponent } from "./criarlead/criar-lead.component";
// import { LeadExportComponent } from "./leadexport/lead-export.component";

// @Component({
//     selector: "addlead-app",
//     templateUrl: './addlead.component.html',
//     styleUrls: ['./addlead.component.scss'],
//     animations: [HighlightTrigger]
// })

// export class AddLeadComponent implements OnInit {

//     pageSize: number = 5;
//     pageEvent: PageEvent;
//     pageIndexNumber: number = 0;
//     cursos: Turma[] = new Array<Turma>();
//     baseUrl = environment.baseUrl;
//     turmas: TurmaViewModel[] = new Array<TurmaViewModel>()
//     private jwtHelper = new JwtHelperService();
//     tokenInfo: TokenInfos = new TokenInfos();
//     // colaboradores: Colaborador[] = new Array<Colaborador>();
//     currentPage = 1

//     showTurmas = false
//     showMessage = false
//     showSpinner = false
//     mensagem: string;

//     constructor(
//         //private elementRef: ElementRef,
//        // private exportLeadModal: MatDialog,
//         private router: Router,
//         public _modal: MatDialog,
//         private http: HttpClient
//     ) { }

//     ngOnInit() {


//         const token = localStorage.getItem('jwt')
//         this.tokenInfo = this.jwtHelper.decodeToken(token)
//         console.log('init colaboradores 123')
//         this.getCursos();
//     }

//     openExportModal(): void {
//         // const dialogRef = this.exportLeadModal
//         //     .open(ExportLeadComponent, {
//         //         height: 'auto',
//         //         width: 'auto',

//         //         data: { colaborador: 'hello' },
//         //         hasBackdrop: true,
//         //         disableClose: true
//         //     });

//         // dialogRef.afterClosed().subscribe(result => {

//         // });
//     }

//     PodeAdiar(turma: TurmaViewModel) {
//         if (turma.statusDaTurma == 'Aguardando início' &&
//             turma.previsao != '3ª previsão') {
//             return false
//         } else {
//             return true
//         }
//     }

//     adiar(turmaId: number) {
//         console.log('adiar')

//         this.http.put(`${this.baseUrl}/turmas/turma/adiar/${turmaId}`, {}).subscribe(response => {

//         },
//             (error) => { console.log(error) },
//             () => {
//                 this.atualizar();
//             }
//         )
//     }

//     atualizar() {
//         var itemsPerPage = 0;
//         var actualPage = 0;

//         this.http.get(`${this.baseUrl}/turmas/?itemsPerPage=` + itemsPerPage + `&currentPage=` + actualPage, {
//             //this.http.post("http://api.invictustemp.com.thor.hostazul.com.br/api/identity/login", credentials, {

//             headers: new HttpHeaders({
//                 "Content-Type": "application/json",
//                 "Authorization": "Bear "
//             })
//         }).subscribe(response => {


//             console.log(response)
//             Object.assign(this.turmas, response['data'])
//             Object.assign(this.turmas, response)
//             console.log(this.turmas)

//         }, (err) => {
//             console.log(err)
//             this.mensagem = "Ocorreu um erro! Contate o Administrador!"

//         },
//             () => {


//             });
//     }

//     getCursos() {

//         var itemsPerPage = 0;
//         var actualPage = 0


//         this.showTurmas = false
//         this.showMessage = false
//         this.showSpinner = true
//         console.log('get cursos 1234')
//         //this.http.get(`${this.baseUrl}/turmas/?itemsPerPage=` + itemsPerPage + `&currentPage=` + actualPage, {
//         //this.http.post("http://api.invictustemp.com.thor.hostazul.com.br/api/identity/login", credentials, {
//         this.http.get(`${this.baseUrl}/turmas`)
//             .subscribe(response => {


//                 console.log(response)
//                 //Object.assign(this.turmas, response['data'])
//                 Object.assign(this.turmas, response)
//                 console.log(this.turmas)
//                 // this.colaboradores = Object.assign([], response['data'])
//                 //console.log(this.colaboradores)
//                 // this.dialogRef.close();
//             }, (err) => {
//                 console.log(err)
//                 this.mensagem = "Ocorreu um erro! Contate o Administrador!"

//             },
//                 () => {

//                     if (this.turmas.length == 0) {
//                         this.mensagem = "Não há turmas cadastradas ou em andamento nesta unidade."
//                         this.showTurmas = false
//                         this.showMessage = true
//                         this.showSpinner = false
//                     } else {
//                         this.showTurmas = true
//                         this.showMessage = false
//                         this.showSpinner = false
//                     }
//                 });

//     }

//     createCurso() {

//     }

//     criarLead(): void {
//         const dialogRef = this._modal
//             .open(LeadIndividualCriarComponent, {
//                 height: 'auto',
//                 width: '720px',
//                 autoFocus: false,
//                 maxHeight: '90vh',


//                 data: { Hello: "Hello World" },
//                 hasBackdrop: true,
//                 disableClose: true
//             });


//         dialogRef.afterClosed().subscribe(result => {
//             if (result.clicked === "OK") {
//                 this.getCursos();
//                 console.log('afte close ok')
//             }

//         });
//     }

//     exportar(): void {
//         const dialogRef = this._modal
//             .open(LeadExportComponent, {
//                 height: 'auto',
//                 width: '720px',
//                 autoFocus: false,
//                 maxHeight: '90vh',


//                 data: { Hello: "Hello World" },
//                 hasBackdrop: true,
//                 disableClose: true
//             });


//         dialogRef.afterClosed().subscribe(result => {
//             if (result.clicked === "OK") {
//                 this.getCursos();
//                 console.log('afte close ok')
//             }

//         });
//     }



// }


