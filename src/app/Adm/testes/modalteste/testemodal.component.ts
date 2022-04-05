import { Component, EventEmitter, Inject, Input, OnInit, Output } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest } from "@angular/common/http";
import { CepReturn } from "src/app/_shared/models/cepreturn.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Cargos, Unidades } from "src/app/_shared/models/perfil.model";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";
//import { TemplateTasks } from 'src/app/shared/models/templateTasks.model';

@Component({
    selector: 'testemodal',
    templateUrl: './testemodal.component.html'
    //styleUrls: ['./exportar.component.scss']
})


export class TesteModalComponent implements OnInit {
    //public progress: number;
    //public message: string;
    //baseUrl = environment.baseUrl;

   // @Output() public onUploadFinished = new EventEmitter();
    constructor(
        private http: HttpClient,
        //private exportLeadModal: MatDialog,
        public dialogRef: MatDialogRef<TesteModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }
    // 
    ngOnInit() {

    }
   


    onOkClick() {
        //console.log("I do nothing");
        this.dialogRef.close({ clicked: "Ok" });
    }

}