import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";

import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { Estagio } from "src/app/_shared/models/estagio.model";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { environment } from "src/environments/environment";



@Component({
    selector: "alunodocs-app",
    templateUrl: './alunodocs.component.html',
    //styleUrls: ['./colaboradores.component.scss'],
    animations: [HighlightTrigger]
})

export class AlunoDocsComponent implements OnInit {


   // colaboradores: Colaborador[] = new Array<Colaborador>();
   baseUrl = environment.baseUrl;
   private jwtHelper = new JwtHelperService();
   tokenInfo: TokenInfos = new TokenInfos();
   formDatas = new FormData();

   fileAP: File[] = []
   fileAPName: string = null
   fileAPViewName: string = null

   fileCartaoVac: File[] = []
   fileCartaoVacName: string = null
   fileCartaoVacViewName: string = null

   fileTipoSang: File[] = []
   fileTipoSangName: string = null
   fileTipoSangViewName: string = null

   fileHCG: File[] = []
   fileHCGName: string = null
   fileHCGViewName: string = null

   public progress: number;
   public message: string;
   @Output() public onUploadFinished = new EventEmitter();

   constructor(
       private _snackBar: MatSnackBar,
       //private CreateMatriculaModal: MatDialog,
       private http: HttpClient
       //public dialogRef: MatDialogRef<InscricaoEstComponent>,
       //public data: any
       //@Inject(MAT_DIALOG_DATA) 
      
   ) { }
public id:any
    public ids: any
   ngOnInit() {
       console.log('init inscricao')
       const token = localStorage.getItem('jwt')
       this.tokenInfo = this.jwtHelper.decodeToken(token)
       this.getIdAlunosMats()
      
   }

   getIdAlunosMats(){
       this.http.get(`${this.baseUrl}/matricula/alunosidsmatriculas`)
       .subscribe(resp => {
           console.log(resp)
           this.ids = resp['ids']
       },(error) => { console.log(error) },
       () => { })
   }
   // pageIndex = 0
   apendFileAP(file) {
       this.fileAP = new Array<File>()
       let fileToUpload = <File>file[0];
       this.fileAPName = `AP${fileToUpload.name}`
       this.fileAPViewName = `${fileToUpload.name}`
       this.fileAP.push(fileToUpload)
   }

   apendFileCartaoVac(file) {
       this.fileCartaoVac = new Array<File>()
       let fileToUpload = <File>file[0];
       this.fileCartaoVacName = `CV${fileToUpload.name}`
       this.fileCartaoVacViewName = `${fileToUpload.name}`
       this.fileCartaoVac.push(fileToUpload)
   }

   apendFileTipoSang(file) {
       this.fileTipoSang = new Array<File>()
       let fileToUpload = <File>file[0];
       this.fileTipoSangName = `TP${fileToUpload.name}`
       this.fileTipoSangViewName = `${fileToUpload.name}`
       this.fileTipoSang.push(fileToUpload)
   }

   apendFileHCG(file) {
       this.fileHCG = new Array<File>()
       let fileToUpload = <File>file[0];
       this.fileHCGName = `HC${fileToUpload.name}`
       this.fileHCGViewName = `${fileToUpload.name}`
       this.fileHCG.push(fileToUpload)
   }


   verificar() {

       console.log(this.fileAP)
       console.log(this.fileCartaoVac)

       console.log(this.fileTipoSang)
       console.log(this.fileHCG)

   }


   uploadFile() {
       console.log('sendo files')
       this.formDatas.append('file', this.fileAP[0], this.fileAPName);
       this.formDatas.append('file', this.fileCartaoVac[0], this.fileCartaoVacName);
       this.formDatas.append('file', this.fileTipoSang[0], this.fileTipoSangName);
       this.formDatas.append('file', this.fileHCG[0], this.fileHCGName);

       const token = localStorage.getItem('jwt')
       const Bearer = `Bearer ${token}`;
       this.http.post(`${this.baseUrl}/estagios/arquivos`, this.formDatas, {
           reportProgress: true, observe: 'events',
           headers: new HttpHeaders({

               "Authorization": Bearer
           })
       })
           .subscribe(event => {
               if (event.type === HttpEventType.UploadProgress)
                   this.progress = Math.round(100 * event.loaded / event.total);
               else if (event.type === HttpEventType.Response) {
                   this.message = 'Upload success.';
                   this.onUploadFinished.emit(event.body);
               }
           },
               (error) => { console.log(error) },
               () => {
                   console.log('finally')
                  // this.dialogRef.close({ clicked: "Ok" });
                  
               });
   }

}

