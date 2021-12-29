import { Component, EventEmitter, Inject,  OnInit, Output } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpEvent, HttpEventType,  HttpRequest } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";

@Component({
    selector: 'exportlead',
    templateUrl: './exportar.component.html',
    styleUrls: ['./exportar.component.scss']
})


export class ExportLeadComponent implements OnInit {
    public progress: number;
    public message: string;
    baseUrl = environment.baseUrl;

    @Output() public onUploadFinished = new EventEmitter();
    constructor(
        private http: HttpClient,
        private exportLeadModal: MatDialog,
        public dialogRef: MatDialogRef<ExportLeadComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }
    // 
    ngOnInit() {

    }

    jwtHelper = new JwtHelperService();
    decodedToken: any;


    uploadFile(files){

        console.log(files)
        if (files.length === 0) {

            return;
        }
        this.decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('jwt'));
        let fileToUpload = <File>files[0];
        const formData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);

        this.http.post(`${this.baseUrl}/comercial/?userEmail=${this.decodedToken['email']}`, formData, {

            reportProgress: true, observe: 'events',

        })
            .subscribe(event => {
                if (event.type === HttpEventType.UploadProgress)
                    this.progress = Math.round(100 * event.loaded / event.total);
                else if (event.type === HttpEventType.Response) {
                    this.message = 'Upload success.';
                    this.onUploadFinished.emit(event.body);
                }
            },
                (error) => { console.log(error) 
                },
                () => {
                    console.log('finally')
                    this.dialogRef.close({ clicked: "Ok" });
                });
    }

    exportExcel() {

        var file = "Modelo LEAD.xlsx";

        this.download().subscribe(data => {
           
            switch (data.type) {
                case HttpEventType.Response:
                    // this.showSpinner = false;
                    //this.downloadStatus.emit( {status: ProgressStatusEnum.COMPLETE});
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
        return this.http.request(new HttpRequest(
            'GET', `${this.baseUrl}/download`, null, {
            reportProgress: true,
            responseType: 'blob'
        }));
    }


    onOkClick() {
        this.dialogRef.close({ clicked: "Ok" });
    }

}