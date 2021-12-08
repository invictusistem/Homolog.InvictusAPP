import { Component, Inject, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { GenericTask } from 'src/app/shared/models/generictask.model';
import { Output, EventEmitter } from '@angular/core';
//import { AdmService } from '../../adm.service';
import { PageEvent } from '@angular/material/paginator';
import { Colaborador } from "src/app/_shared/models/colaborador.model";
import { NgForm } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CepReturn } from "src/app/_shared/models/cepreturn.model";
import { environment } from "src/environments/environment";
import { Cargos, Unidades } from "src/app/_shared/models/perfil.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { HelpersService } from "src/app/_shared/components/helpers/helpers.component";
//import { TemplateTasks } from 'src/app/shared/models/templateTasks.model';

@Component({
    selector: 'editprofessormodal',
    templateUrl: './editprofessor.component.html',
    styleUrls: ['./editprofessor.component.scss'],
    animations: [HighlightTrigger]
})

export class EditProfessorComponent implements OnInit {

    // pageSize: number = 5;
    // genericTasks: GenericTask[] = new Array<GenericTask>();
    // length: number;
    // pageEvent: PageEvent;
    baseUrl = environment.baseUrl;

    editedColaborador: Colaborador = new Colaborador();
    originalColaborador: Colaborador = new Colaborador();
    unidades = Unidades;
    showMensagem = false
    mensagem = ''
    cpf = ''
    showForm = false

    public cepReturn: CepReturn = new CepReturn();
    cargos = Cargos;
    ativo = true;
    constructor(
        private _snackBar: MatSnackBar,
        private _helper: HelpersService,
        private http: HttpClient,
        public dialogRef: MatDialogRef<EditProfessorComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }


    //@Output() newItemEvent = new EventEmitter<string>();


    ngOnInit() {
        this.ativo = true;
        //console.log(this.data['colaborador'])
        Object.assign(this.editedColaborador, this.data['colaborador'])
        console.log(this.data['colaborador'].id)
        this.GetProfessor()

    }

    GetProfessor() {

        this.http.get(`${this.baseUrl}/professor/${this.data['colaborador'].id}`)
            .subscribe(response => {

                this.editedColaborador = response['result']

            }, err => { console.log(err) },
                () => { this.showForm = true });
    }



    submitForm(form: NgForm) {

        console.log(form.value)

        console.log(this.editedColaborador)

        if (form.valid) {

            this.disabledSpinner = true
            console.log('form valid')

            this.http.put(`${this.baseUrl}/professor`, this.editedColaborador, {})
                .subscribe(response => {
                    //console.log(response)
                }, err => { console.log(err) },
                    () => {
                        //this.openSnackBar()
                        this._helper.openSnackBar('Professor editado com sucesso!')
                        this.dialogRef.close();

                    });
        }
    }

    disabledSpinner = false
    // edit(form: any) {
    //     //const novoColaborador = JSON.stringify(form.value);
    //     console.log(form.valid)
    //     if (form.valid) {

    //         //this.redi(["./adm/colaboradores"]);
    //         this.http.put(`${this.baseUrl}/professor`, this.editedColaborador, {})
    //             .subscribe(response => {
    //                 console.log(response)
    //             }, err => { console.log(err) },
    //                 () => {
    //                     this.openSnackBar()
    //                     this.dialogRef.close();

    //                 });
    //     }
    // }
    

    // openSnackBar() {
    //     this.openSnackBar()
    // }

    isEqual = true
    get formIsValid() {

        if (JSON.stringify(this.editedColaborador) === JSON.stringify(this.originalColaborador)) {
            this.isEqual = true
        } else {
            this.isEqual = false
        }
        return this.isEqual
    }


    consultaCEP(CEP: string) {
        //console.log(CEP);

        this.http.get(`https://viacep.com.br/ws/${CEP}/json/`)
            .subscribe(response => {

                console.log("success")
                this.cepReturn = new CepReturn(
                    response["logradouro"],
                    response["bairro"],
                    response["localidade"],
                    response["uf"]);
                console.log(this.cepReturn)

                this.editedColaborador.logradouro = this.cepReturn.logradouro;
                this.editedColaborador.bairro = this.cepReturn.bairro
                this.editedColaborador.cidade = this.cepReturn.localidade
                this.editedColaborador.uf = this.cepReturn.uf
               
            }, err => { console.log("erros") },
                () => { console.log('finaly') });
    }

}