import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { GenericTask } from 'src/app/shared/models/generictask.model';
import { Output, EventEmitter } from '@angular/core';
//import { AdmService } from '../../adm.service';
import { PageEvent } from '@angular/material/paginator';
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Unidade } from "../../Adm-Models/unidade.model";
//import { TemplateTasks } from 'src/app/shared/models/templateTasks.model';

@Component({
    selector: 'editunidademodal',
    templateUrl: './editunidade.component.html',
    styleUrls: ['./editunidade.component.scss']
})

export class EditUnidadeComponent implements OnInit {

    public unidade: Unidade = new Unidade;
    private _baseUrl = environment.baseUrl

    showForm = false
    constructor(
        //private service: AdmService,
        private _http: HttpClient,
        private _dialogRef: MatDialogRef<EditUnidadeComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        Object.assign(this.unidade, this.data["unidade"])
        console.log(this.data["unidade"])
        //console.log(this.unidade)
        this.showForm = true

    }

    consultaCEP(CEP: string) {
        console.log(CEP);

        this._http.get(`https://viacep.com.br/ws/${CEP}/json/`, {})
            .subscribe(response => {

                console.log(response)

                this.unidade.logradouro = response['logradouro']
                this.unidade.bairro = response['bairro']
                this.unidade.cidade = response['localidade']
                this.unidade.uf = response['uf']

            }, err => { console.log(err) },
                () => {

                });
    }

    saveEdit(form) {
        //console.log(form)
        //var buttonName = event.submitter.name

        //console.log(buttonName)

        // if(event.submitter.name != "submeter") return false;
        console.log('submeter')
        console.log(this.unidade)
        // this.formSubmitted = true;
        console.log(form.valid)
        if (form.valid) {
            console.log(form.valid)
            this._http.put(`${this._baseUrl}/unidade`, this.unidade)
                .subscribe(resp => { },
                    (error) => { console.log(error) },
                    () => this._dialogRef.close({clicked: "OK"}))

        }

    }



}