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
import { HelpersService } from "src/app/_shared/components/helpers/helpers.component";
//import { TemplateTasks } from 'src/app/shared/models/templateTasks.model';

@Component({
    selector: 'editcolaboradoresmodal',
    templateUrl: './editcolaboradores.component.html',
    styleUrls: ['./editcolaboradores.component.scss']
})

export class EditColaboradoresComponent implements OnInit {

    // pageSize: number = 5;
    // genericTasks: GenericTask[] = new Array<GenericTask>();
    // length: number;
    // pageEvent: PageEvent;
    baseUrl = environment.baseUrl;

    editedColaborador: Object = new Object();
    originalColaborador: Object = new Object();//Colaborador = new Colaborador();

    unidades = Unidades;
    showMensagem = false
    mensagem = ''
    cpf = ''
    showForm = false

    public cepReturn: CepReturn = new CepReturn();
    cargos: any[] = new Array<any>();// Cargos;
    ativo = true;
    constructor(
        private _helper: HelpersService,
        //private _snackBar: MatSnackBar,
        private http: HttpClient,
        public dialogRef: MatDialogRef<EditColaboradoresComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }


    //@Output() newItemEvent = new EventEmitter<string>();
    tentando = true
get teste(){
    return this.tentando
}
desabilitar(form){
    if(form.valid){

     if(JSON.stringify(this.originalColaborador) === JSON.stringify(this.editedColaborador) )
     {
        return true
     }else{
        return false
     }
      
    }else{
        return true
    }
    //console.log(form)
    //return false
}
changeValue(){
    this.tentando = !this.tentando
}
mudou(){
    console.log('mudou')
}

    ngOnInit() {
        this.ativo = true;
        
        Object.assign(this.originalColaborador, this.data['colaborador'])
        Object.assign(this.editedColaborador, this.data['colaborador'])
        
        // this.originalColaborador = this.data['colaborador']
        // this.editedColaborador = this.data['colaborador']
        this.getCargos();
    }

    getCargos(){
        this.http.get(`${this.baseUrl}/parametro/value/Cargo`)
            .subscribe(response => {

                this.cargos = Object.assign([], response['values'])

            }, err => { console.log(err) },
                () => {
                    this.showForm = true

                });
    }

    disabledSpinner = false
    edit(form: any) {
        // //const novoColaborador = JSON.stringify(form.value);
        // console.log(form)
        // console.log(form.valid)
        if (form.valid) {

            //this.redi(["./adm/colaboradores"]);
            this.http.put(`${this.baseUrl}/colaboradores`, this.editedColaborador, {})
            .subscribe(response => {

            }, err => { console.log(err) },
                () => {
                    this._helper.openSnackBar('Colaborador editado com sucesso.')
                    //this.openSnackBar()
                    this.dialogRef.close();

                });
        }
    }

    

     openSnackBar() {

        this._helper.openSnackBarError('ERRO')
    //     this._snackBar.open('Colaborador editado com sucesso.', '', {
    //         horizontalPosition: 'center',
    //         verticalPosition: 'top',
    //         panelClass: 'green-snackbar',
    //         duration: 3 * 1000,
    //     });
     }

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
        
        if (CEP.length == 10) {

            CEP = CEP.replace('-', '');
            CEP = CEP.replace('.', '');

        this.http.get(`https://viacep.com.br/ws/${CEP}/json/`)
            .subscribe(response => {

                this.editedColaborador['logradouro'] = response["logradouro"].toUpperCase()
                this.editedColaborador['bairro'] = response["bairro"].toUpperCase()
                this.editedColaborador['cidade'] = response["localidade"].toUpperCase()
                this.editedColaborador['uf'] = response["uf"].toUpperCase()

            }, err => { console.log("erros") },
                () => { console.log('finaly') });
        }
    }

}