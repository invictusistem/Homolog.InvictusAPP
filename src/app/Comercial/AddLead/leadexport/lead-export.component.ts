import { Component, EventEmitter, Inject, OnInit, Output } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest } from "@angular/common/http";
import { CepReturn } from "src/app/_shared/models/cepreturn.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Cargos, Unidades } from "src/app/_shared/models/perfil.model";
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";




//import { TemplateTasks } from 'src/app/shared/models/templateTasks.model';

@Component({
    selector: 'leadexportmodal',
    templateUrl: './lead-export.component.html',
    styleUrls: ['./lead-export.component.scss'],
    animations: [HighlightTrigger]
})

export class LeadExportComponent implements OnInit {
   
    baseUrl = environment.baseUrl;   
    private jwtHelper = new JwtHelperService();
    public tokenInfo: TokenInfos = new TokenInfos();

    public progress: number;
    public message: string;
    @Output() public onUploadFinished = new EventEmitter();
    
     constructor(
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fb: FormBuilder,
        private _http: HttpClient,
        public dialogRef: MatDialogRef<LeadExportComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {       
    }

    ngOnInit() {
        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)

    }

    showForm = false

    onSubmit(form: FormGroup) {

        if (form.valid) {


            this._http.post(`${this.baseUrl}/colaboradores`, form.value, {

            }).subscribe(response => {

            }, (err) => {
                
            },
                () => {

                    this.openSnackBar()

                    this.dialogRef.close({ clicked: "Ok" });
                });
        }
    }

    buscarEmail(event){

    }

    openSnackBar() {
        this._snackBar.open('Lead cadastrada com sucesso.', '', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'green-snackbar',
            duration: 3 * 1000,
        });
    }

    uploadFile(files){

    //     console.log(files)
    //     if (files.length === 0) {

    //         return;
    //     }
    //     this.decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('jwt'));

    //     console.log(this.decodedToken)
    //     console.log(this.decodedToken['email'])
    //     let fileToUpload = <File>files[0];
    //     const formData = new FormData();
    //     formData.append('file', fileToUpload, fileToUpload.name);

    //     this.http.post(`${this.baseUrl}/comercial/?userEmail=${this.decodedToken['email']}`, formData, {

    //         reportProgress: true, observe: 'events',

    //     })
    //         .subscribe(event => {
    //             if (event.type === HttpEventType.UploadProgress)
    //                 this.progress = Math.round(100 * event.loaded / event.total);
    //             else if (event.type === HttpEventType.Response) {
    //                 this.message = 'Upload success.';
    //                 this.onUploadFinished.emit(event.body);
    //             }
    //         },
    //             (error) => { console.log(error) },
    //             () => {
    //                 console.log('finally')
    //                 this.dialogRef.close({ clicked: "Ok" });
                   
    //             });
     }

    exportExcel() {

        var file = "Modelo LEAD.xlsx";
       

        this.download().subscribe(data => {
           
            switch (data.type) {
                case HttpEventType.Response:
                      const downloadedFile = new Blob([data.body], { type: data.body.type });
                    const a = document.createElement('a');
                    a.setAttribute('style', 'display:none;');
                    document.body.appendChild(a);
                    a.download = file;
                    a.href = URL.createObjectURL(downloadedFile);
                    a.target = '_blank';
                    a.click();
                    document.body.removeChild(a);
                    break;
            }
        },
            (err) => {
               
            },
            () => {
               
            }
        );
    }

    public download(): Observable<HttpEvent<Blob>> {
        return this._http.request(new HttpRequest(
            'GET', `${this.baseUrl}/download`, null, {
            reportProgress: true,
            responseType: 'blob'
        }));
    }


    onOkClick() {
       
        this.dialogRef.close({ clicked: "Ok" });
    }



}