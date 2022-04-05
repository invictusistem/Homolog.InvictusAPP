import { Component, Inject, OnInit, Pipe, PipeTransform } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { GenericTask } from 'src/app/shared/models/generictask.model';
import { Output, EventEmitter } from '@angular/core';
//import { AdmService } from '../../adm.service';
import { PageEvent } from '@angular/material/paginator';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

import { Sala } from "../../adm-models/sala.model";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { UpperCasePipe } from "@angular/common";
//import { Cargo } from "../../Adm-Models/cargos.model";
import { HelpersService } from "src/app/_shared/components/helpers/helpers.component";
//import { TemplateTasks } from 'src/app/shared/models/templateTasks.model';

@Pipe({ name: 'myPipe' })
export class MyPipe implements PipeTransform {
    transform(val?: any) {
        console.log(val)
        return val?.toUpperCase()

    }
}

@Component({
    selector: 'createunidademodal',
    templateUrl: './createunidade.component.html',
    styleUrls: ['./createunidade.component.scss'],
    animations: [HighlightTrigger]
})

export class CreateUnidadeComponent implements OnInit {

    // pageSize: number = 5;
    // genericTasks: GenericTask[] = new Array<GenericTask>();
    // length: number;
    // pageEvent: PageEvent;
    public saveSpinner = 'hidden'
    public showMensagem = 'hidden'
public msgErros: any;
    testepipe: any
    private _baseUrl = environment.baseUrl
    public unidadeForm: FormGroup;
    public colaboradorForm: FormGroup;
    //public salas: Sala[] 
    constructor(
        //private service: AdmService,
        private upperCasePipe: UpperCasePipe,
        private _helper: HelpersService,
        private _http: HttpClient,
        private _fb: FormBuilder,
        private _modal: MatDialog,
        public dialogRef: MatDialogRef<CreateUnidadeComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.unidadeForm = this._fb.group({
            descricao: ['', [Validators.required]],
            sigla: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]],
            cnpj: ['', [Validators.required]],
            cep: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
            complemento: [''],
            numero: ['', [Validators.required]],
            logradouro: ['', [Validators.required]],
            bairro: ['', [Validators.required]],
            cidade: ['', [Validators.required]],
            uf: ['', [Validators.required]],
            ativo: [true],
        })

       
    }

    get habilitarBotao() {
        // console.log(this.unidadeForm.valid)
        // console.log(this.colaboradorForm.valid)
        if (this.unidadeForm.valid && this.colaboradorForm.valid) {
            return false
        } else {
            return true
        }

    }
    ngOnInit() {

       // this.getCargos();
    }

    cargos: any[] = new Array<any>()
    getCargos() {

        this._http.get(`${this._baseUrl}/unidade/cargo`)
            .subscribe(response => {
                this.cargos = Object.assign([], response)
            }, (err) => {
                console.log(err)
            },
                () => { 
                    console.log(this.cargos)
                    //this.showForm = true
                });
    }

    log() {
        console.log(this.unidadeForm.value)
        console.log(this.colaboradorForm.value)
        console.log(this.testepipe)

        // if (form.valid) {
        var command = { unidade: this.unidadeForm.value, colaborador: this.colaboradorForm.value}
            this._http.post(`${this._baseUrl}/unidade`, command, {})
                .subscribe(resp => { },
                    (error) => { console.log(error) },
                    () => { this.dialogRef.close({ clicked: "OK" }) })

       // }
    }

    onSubmit(form: any) {
        this.showMensagem = 'hidden'

        if (form.valid) {
            this.saveSpinner = 'visible'
            this._http.post(`${this._baseUrl}/unidade`, this.unidadeForm.value, {})
                .subscribe(resp => { },
                    (error) => { 
                        this.saveSpinner = 'hidden'
                        this.msgErros = error['error'].msg
                        this.showMensagem = 'visible'
                        this.saveSpinner = 'hidden'
                     },
                    () => { 
                        this._helper.openSnackBarSucesso('Unidade criada sucesso')
                        this.dialogRef.close({ clicked: "Ok" }) })

        }
    }

    consultaCEP(CEP: string, form) {
        console.log(CEP);
        console.log(form.controls['cep'].valid);
        console.log(form.controls['cep'].value)
        if (form.controls['cep'].value) {

            this._http.get(`https://viacep.com.br/ws/${CEP}/json/`, {})
                .subscribe(response => {

                    // console.log(response)
                    form.get('logradouro').setValue(response["logradouro"]);
                    form.get('bairro').setValue(response["bairro"]);
                    form.get('cidade').setValue(response["localidade"]);
                    form.get('uf').setValue(response["uf"]);
                }, err => { console.log(err) },
                    () => {
                        // console.log('finaly') 
                    });
        }
    }

    get saveButton(){

        if(this.unidadeForm.valid){
            return this.saveSpinner != 'hidden'
        }else{
            return true
        }
    }    

}