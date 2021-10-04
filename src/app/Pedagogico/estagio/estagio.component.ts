// import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest } from "@angular/common/http";
// import { Component, OnInit } from "@angular/core";
// import { MatDialog } from "@angular/material/dialog";
// import { MatSnackBar } from "@angular/material/snack-bar";
// import { JwtHelperService } from "@auth0/angular-jwt";
// import { Observable } from "rxjs";
// import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
// import { Estagio } from "src/app/_shared/models/estagio.model";
// import { environment } from "src/environments/environment";
// import { InscricaoComponent } from "./inscricao/inscricao.component";

// @Component({
//     selector: "estagio-app",
//     templateUrl: './estagio.component.html',
//     animations: [HighlightTrigger]
//     //styleUrls: ['./estagio.component.scss']
// })

// export class EstagioComponent implements OnInit {

//     baseUrl = environment.baseUrl;
//     estagios: Estagio[] = new Array<Estagio>();
//     private jwtHelper = new JwtHelperService();
//     public semVagasMessage = false
//     public showVagas = false
//     public showTableVagas = false
//     tokenInfo: TokenInfos = new TokenInfos();
//     constructor(
//         private _snackBar: MatSnackBar,
//         private _inscricaoModal: MatDialog,
//         private http: HttpClient
//     ) { }
//     ngOnInit() {
//         // console.log('init matricula')
//         // const token = localStorage.getItem('jwt')
//         // this.tokenInfo = this.jwtHelper.decodeToken(token)
//         // console.log(this.jwtHelper.decodeToken(token));
//         // console.log(this.tokenInfo.Name);
//         this.getEstagios();
//         this.getDocs();
//         this.file();
//     }

//     getDocs() {
//         this.http.get(`${this.baseUrl}/estagios/arquivos`, {

//             headers: new HttpHeaders({
//                 "Content-Type": "application/json",
//                 "Authorization": "Bear "
//             })
//         }).subscribe(response => {

//             console.log(response)

//         }, (err) => {
//             console.log(err)
//             //this.mensagem = "Ocorreu um erro! Contate o Administrador!"
//         },
//             () => {

//             });
//     }
//     createFileName() {
//         var date = new Date().getDate();
//         var month = new Date().getMonth();
//         var filename = `arquivo.jpeg`;;
//         // switch (fileType) {
//         //     case "EXCEL":
//         //       //  console.log('file name excel')
//         //         filename = `arquivo.jpeg`;
//         //         break;
//         //     case "PDF":
//         //        // console.log('file name pdf')
//         //         filename = `Relatorio${this.infoPageParam.painel}-${date}-${month + 1}.pdf`;
//         //         break;
//         // }
//         return filename;
//     }

//     imagem:any

//     file(){
//         //https://localhost:44370
//         var file = this.createFileName();

//         this.download()
//         .subscribe(data => {
//                 switch (data.type) {
//                     case HttpEventType.Response:
//                         console.log(data)
//                       //  this.showSpinner = false;
//                         //this.downloadStatus.emit( {status: ProgressStatusEnum.COMPLETE});
//                         const downloadedFile = new Blob([data.body], { type: data.body.type });
//                         console.log(downloadedFile)
//                         const a = document.createElement('a');
//                         a.setAttribute('style', 'display:none;');
//                         document.body.appendChild(a);
//                         a.download = file;
//                         this.imagem = downloadedFile
//                         a.href = URL.createObjectURL(downloadedFile);
//                         a.target = '_blank';
//                         a.click();
//                         document.body.removeChild(a);
//                         //window.open(a.href, this.filePdf, '',true);
//                         break;
//                 }
//             },
//             (err) => { 
//                 //this.showSpinner = false; 
//             },
//             () => { 
//                 //this.showSpinner = false; 
//             }
//         );
//     }

//     public download(): Observable<HttpEvent<Blob>> {
//         // console.log(parametros)
//         var apiDownloadUrl = `${this.baseUrl}/estagios/file`
//         return this.http.request(new HttpRequest(
//             'GET',
//             `${apiDownloadUrl}`,
//             null,
//             {
//                 reportProgress: true,
//                 responseType: 'blob'
//             }));
//     }


//     getEstagios() {

//         this.http.get(`${this.baseUrl}/estagios`, {

//             headers: new HttpHeaders({
//                 "Content-Type": "application/json",
//                 "Authorization": "Bear "
//             })
//         }).subscribe(response => {


//             Object.assign(this.estagios, response)

//             console.log(this.estagios)

//         }, (err) => {
//             console.log(err)
//             //this.mensagem = "Ocorreu um erro! Contate o Administrador!"            

//         },
//             () => {

//                 if (this.estagios.length > 0) {
//                     this.showTableVagas = true
//                     this.semVagasMessage = false
//                     this.showVagas = true
//                 } else {
//                     this.showTableVagas = true
//                     this.semVagasMessage = true
//                     this.showVagas = false
//                 }
//             });

//     }


//     inscricao() {
//         const dialogRef = this._inscricaoModal
//             .open(InscricaoComponent, {
//                 height: 'auto',
//                 width: '1000px',
//                 autoFocus: false,
//                 maxHeight: '90vh',

//                 data: {},
//                 hasBackdrop: true,
//                 disableClose: true
//             });

//         dialogRef.afterClosed().subscribe((data) => {
//             if (data.clicked === "OK") {
//                 // this.openSnackBar()
//                 console.log('afte close ok')
//             } else if (data.clicked === "Cancel") {
//                 // Do nothing. Cancel any events that navigate away from the
//                 // component.
//             }
//         });
//     }

// }

// export class TokenInfos {
//     constructor(
//         public Name?: string
//     ) { }
// }