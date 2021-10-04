// import { HttpClient, HttpEventType, HttpHeaders } from "@angular/common/http";
// import { Component, EventEmitter, Inject, OnInit, Output } from "@angular/core";
// import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
// import { MatSnackBar } from "@angular/material/snack-bar";
// import { JwtHelperService } from "@auth0/angular-jwt";
// import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
// import { environment } from "src/environments/environment";
// import { TokenInfos } from "../estagio.component";



// @Component({
//     selector: "inscricao-app",
//     templateUrl: './inscricao.component.html',
//     animations: [HighlightTrigger]
//     //styleUrls: ['./estagio.component.scss']
// })

// export class InscricaoComponent implements OnInit {


//     // colaboradores: Colaborador[] = new Array<Colaborador>();
//     baseUrl = environment.baseUrl;
//     private jwtHelper = new JwtHelperService();
//     tokenInfo: TokenInfos = new TokenInfos();
//     formDatas = new FormData();

//     fileAP: File[] = []
//     fileAPName: string = null
//     fileAPViewName: string = null

//     fileCartaoVac: File[] = []
//     fileCartaoVacName: string = null
//     fileCartaoVacViewName: string = null

//     fileTipoSang: File[] = []
//     fileTipoSangName: string = null
//     fileTipoSangViewName: string = null

//     fileHCG: File[] = []
//     fileHCGName: string = null
//     fileHCGViewName: string = null

//     public progress: number;
//     public message: string;
//     @Output() public onUploadFinished = new EventEmitter();

//     constructor(
//         private _snackBar: MatSnackBar,
//         //private CreateMatriculaModal: MatDialog,
//         private http: HttpClient,
//         public dialogRef: MatDialogRef<InscricaoComponent>,
//         @Inject(MAT_DIALOG_DATA) public data: any
//         //private CreateColaboradoresModal: MatDialog,
//         //private EditColaboradoresModal: MatDialog
//     ) { }


//     ngOnInit() {
//         console.log('init inscricao')
//         const token = localStorage.getItem('jwt')
//         this.tokenInfo = this.jwtHelper.decodeToken(token)
//         // console.log(this.jwtHelper.decodeToken(token));
//         // console.log(this.tokenInfo.Name);
//         //this.getColaboradores(1, this.pageSize);
//     }
//     // pageIndex = 0
//     apendFileAP(file) {
//         this.fileAP = new Array<File>()
//         let fileToUpload = <File>file[0];
//         this.fileAPName = `AP${fileToUpload.name}`
//         this.fileAPViewName = `${fileToUpload.name}`
//         this.fileAP.push(fileToUpload)
//     }

//     apendFileCartaoVac(file) {
//         this.fileCartaoVac = new Array<File>()
//         let fileToUpload = <File>file[0];
//         this.fileCartaoVacName = `CV${fileToUpload.name}`
//         this.fileCartaoVacViewName = `${fileToUpload.name}`
//         this.fileCartaoVac.push(fileToUpload)
//     }

//     apendFileTipoSang(file) {
//         this.fileTipoSang = new Array<File>()
//         let fileToUpload = <File>file[0];
//         this.fileTipoSangName = `TP${fileToUpload.name}`
//         this.fileTipoSangViewName = `${fileToUpload.name}`
//         this.fileTipoSang.push(fileToUpload)
//     }

//     apendFileHCG(file) {
//         this.fileHCG = new Array<File>()
//         let fileToUpload = <File>file[0];
//         this.fileHCGName = `HC${fileToUpload.name}`
//         this.fileHCGViewName = `${fileToUpload.name}`
//         this.fileHCG.push(fileToUpload)
//     }
   

//     verificar() {

//         console.log(this.fileAP)
//         console.log(this.fileCartaoVac)

//         console.log(this.fileTipoSang)
//         console.log(this.fileHCG)

//     }


//     uploadFile() {

//         this.formDatas.append('file', this.fileAP[0], this.fileAPName);
//         this.formDatas.append('file', this.fileCartaoVac[0], this.fileCartaoVacName);
//         this.formDatas.append('file', this.fileTipoSang[0], this.fileTipoSangName);
//         this.formDatas.append('file', this.fileHCG[0], this.fileHCGName);

//         const token = localStorage.getItem('jwt')
//         const Bearer = `Bearer ${token}`;
//         this.http.post(`${this.baseUrl}/estagios/arquivos`, this.formDatas, {
//             reportProgress: true, observe: 'events',
//             headers: new HttpHeaders({
                
//                 "Authorization": Bearer
//               })
//         })
//             .subscribe(event => {
//                 if (event.type === HttpEventType.UploadProgress)
//                     this.progress = Math.round(100 * event.loaded / event.total);
//                 else if (event.type === HttpEventType.Response) {
//                     this.message = 'Upload success.';
//                     this.onUploadFinished.emit(event.body);
//                 }
//             },
//                 (error) => { console.log(error) },
//                 () => {
//                     console.log('finally')
//                     this.dialogRef.close({ clicked: "Ok" });
//                     // this.refresh()
//                     //this.onUploadFinished.unsubscribe;
//                     //files = null
//                 });
//     }
//     //params: Parametros = new Parametros()
//     // pesquisar(nome: string, email: string, cpf: string) {

//     //     console.log(nome + " " + email + " " + cpf)
//     //     if (nome == "" || nome == undefined) nome = ""
//     //     if (email == "" || email == undefined) email = ""
//     //     if (cpf == "" || cpf == undefined) cpf = ""

//     //     if ((nome == "" || nome == undefined) &&
//     //         (email == "" || email == undefined) &&
//     //         (cpf == "" || cpf == undefined)) {
//     //         console.log("retorno")
//     //         return;
//     //     }

//     //     this.http.get(`${this.baseUrl}/matricula/alunos/?query={"nome":"${nome}","email":"${email}","cpf":"${cpf}"}`)
//     //         .subscribe(
//     //             (response) => {
//     //                 console.log(response)
//     //                 this.listAlunos = Object.assign([], response)

//     //             },
//     //             (err) => {
//     //                 //this.showSpinnerFirst = false
//     //                 console.log(err)
//     //                 //this.openSnackBar(err)

//     //             },
//     //             () => {
//     //                 //this.showSpinnerFirst = false
//     //                 console.log('ok get');
//     //                 //this.pageIndexNumber = (evento.pageIndex * this.pageSize)
//     //             },
//     //         )

//     // }

//     // consulta(nome: string) {

//     //     if (nome == "") {
//     //         // TODO: sendo form alert: selecionar ao menos um
//     //         return;
//     //     }

//     //     this.http.get(`${this.baseUrl}/matricula/alunos/?email=&cpf=&nome=${nome}`)
//     //         .subscribe(response => {

//     //             console.log(response)
//     //             this.listAlunos = Object.assign([], response)

//     //         }, err => { console.log(err) },
//     //             () => {

//     //             });
//     // }

//     // matricular(aluno){
//     //     const dialogRef = this.CreateMatriculaModal
//     //     .open(AlunoMatriculaComponent, {
//     //         height: 'auto',
//     //         width: '1000px',
//     //         autoFocus: false,
//     //         maxHeight: '90vh',

//     //         data: { alunoId: aluno.id },
//     //         hasBackdrop: true,
//     //         disableClose: true
//     //     });

//     // dialogRef.afterClosed().subscribe((data) => {
//     //     if (data.clicked === "OK") {
//     //         this.openSnackBar()
//     //         console.log('afte close ok')
//     //     } else if (data.clicked === "Cancel") {
//     //         // Do nothing. Cancel any events that navigate away from the
//     //         // component.
//     //     }
//     // });

//     // }

//     // openMatriculaModal(): void {
//     //     const dialogRef = this.CreateMatriculaModal
//     //         .open(CreateMatriculaComponent, {
//     //             height: 'auto',
//     //             width: '1000px',
//     //             autoFocus: false,
//     //             maxHeight: '90vh',

//     //             data: { Hello: "Hello World" },
//     //             hasBackdrop: true,
//     //             disableClose: true
//     //         });

//     //     dialogRef.afterClosed().subscribe((data) => {
//     //         if (data.clicked === "OK") {
//     //             this.openSnackBar()
//     //             console.log('afte close ok')
//     //         } else if (data.clicked === "Cancel") {
//     //             // Do nothing. Cancel any events that navigate away from the
//     //             // component.
//     //         }
//     //     });
//     // }

//     // openSnackBar() {
//     //     this._snackBar.open('Aluno matriculado com sucesso', '', {
//     //         horizontalPosition: 'center',
//     //         verticalPosition: 'top',
//     //         panelClass: 'green-snackbar',
//     //         duration: 3 * 1000,
//     //     });
//     // }

//     // deleteColaborador(id: number) {


//     // }

// }


// // export interface IPager {
// //     itemsPerPage?: number;
// //     totalItemsInDatabase?: number;
// //     currentPage?: number;
// //     totalPages?: number;
// //     items?: number;
// // }