import { Component, Inject, OnInit, Pipe, PipeTransform } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { GenericTask } from 'src/app/shared/models/generictask.model';
import { Output, EventEmitter } from '@angular/core';
//import { AdmService } from '../../adm.service';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
//import { TemplateTasks } from 'src/app/shared/models/templateTasks.model';


@Component({
    selector: 'sala-editarmodal',
    templateUrl: './sala-editar.component.html',
    styleUrls: ['./sala-editar.component.scss'],
    animations: [HighlightTrigger]
})

export class SalaEditarComponent implements OnInit {

    // pageSize: number = 5;
    // genericTasks: GenericTask[] = new Array<GenericTask>();
    // length: number;
    // pageEvent: PageEvent;
    public salas: any[]
    public sala:any;
    private _baseUrl = environment.baseUrl
    public showEditSalaForm: boolean = false
    public salaForm: FormGroup;
    constructor(
        //private service: AdmService,
        private _http: HttpClient,
        private _fb: FormBuilder,
        public dialogRef: MatDialogRef<SalaEditarComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.salaForm = this._fb.group({
            descricao: ['', [Validators.required]],
            capacidade: [, [Validators.required, Validators.min(1)]],
            comentarios: ['', [Validators.required, Validators.maxLength(200)]],
        })
    }


    ngOnInit() {

        console.log(this.data['unidade'])
        this.GetSalas();
    }

    GetSalas() {
        this._http.get(`${this._baseUrl}/unidade/unidade-salas/${this.data["unidade"].id}`)
            .subscribe(resp => {
                this.salas = resp['salas']
            },
                (error) => { console.log(error) },
                () => { })
    }

    buscar(salaId) {
        //console.log(id)

        this._http.get(`${this._baseUrl}/unidade/sala/${salaId}`)
            .subscribe(resp => {
                this.sala = resp['sala']
            },
                (error) => { console.log(error) },
                () => {
                    this.showEditSalaForm = true
                 })
    }

    onSubmit(form: any) {
        console.log(form)

        if (form.valid) {

            this._http.put(`${this._baseUrl}/unidade/sala-editar`, this.sala, {})
                .subscribe(resp => { },
                    (error) => { console.log(error) },
                    () => { 
                        
                    })

        }
    }
}