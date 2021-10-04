import { Component, Inject, Input, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CepReturn } from "src/app/_shared/models/cepreturn.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Cargos, Unidades } from "src/app/_shared/models/perfil.model";
import { Aluno } from "src/app/_shared/models/aluno.model";
//import { TemplateTasks } from 'src/app/shared/models/templateTasks.model';

@Component({
    selector: 'confirmmodal',
    templateUrl: './confirm.component.html'
   //; styleUrls: ['./confirm.component.scss']
})

export class ConfirmModalComponent implements OnInit {

      constructor(
        //private service: AdmService,
        private CreateMatriculaModal: MatDialog,
        private router: Router,
        
        public dialogRef: MatDialogRef<ConfirmModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
       
    }

  

    ngOnInit() {
        // console.log("on init")
        //this.getTasks(1, this.pageSize);
        //this.colaboradorForm.get('logradouro').disable()
        
    }


    

    onOkClick() {
        //console.log("I do nothing");
        this.dialogRef.close({ clicked: "Ok" });
    }

}