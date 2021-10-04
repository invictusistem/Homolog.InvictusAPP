import { Component, Inject, OnInit,Pipe, PipeTransform } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { GenericTask } from 'src/app/shared/models/generictask.model';
import { Output, EventEmitter } from '@angular/core';
//import { AdmService } from '../../adm.service';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
//import { TemplateTasks } from 'src/app/shared/models/templateTasks.model';


@Component({
    selector: 'createsalamodal',
    templateUrl: './createsala.component.html'
   // styleUrls: ['./createsala.component.scss']
})

export class CreateSalaComponent implements OnInit {

    // pageSize: number = 5;
    // genericTasks: GenericTask[] = new Array<GenericTask>();
    // length: number;
    // pageEvent: PageEvent;
    private _baseUrl = environment.baseUrl
    public salaForm: FormGroup;
    constructor(
        //private service: AdmService,
        private _http: HttpClient,
        private _fb: FormBuilder,
        public dialogRef: MatDialogRef<CreateSalaComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.salaForm = this._fb.group({
            descricao: ['',[Validators.required]],
            capacidade:[,[Validators.required, Validators.min(1)]],
            comentarios: ['',[Validators.required, Validators.maxLength(200)]],
        })
    }


    ngOnInit() {


    }

    onSubmit(form: any){
        console.log(form)

        if(form.valid){

            this._http.post(`${this._baseUrl}/unidade/sala-create/${this.data["unidade"].id}`, form.value,{})
                .subscribe(resp => { },
                    (error) => { console.log(error)},
                    () => { this.dialogRef.close({clicked: "Ok"})})

        }
    }
}