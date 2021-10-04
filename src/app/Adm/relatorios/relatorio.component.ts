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
//import { TemplateTasks } from 'src/app/shared/models/templateTasks.model';

@Component({
    selector: 'admrelatoriomodal',
    templateUrl: './relatorio.component.html'
    //styleUrls: ['./relatorio.component.scss']
})

export class AdmRelatorioComponent implements OnInit {

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

    public cepReturn: CepReturn = new CepReturn();
    cargos = Cargos;
    ativo = true;
    constructor(
        private _snackBar: MatSnackBar,
        private http: HttpClient,
        public dialogRef: MatDialogRef<AdmRelatorioComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }


    //@Output() newItemEvent = new EventEmitter<string>();


    ngOnInit() {
        this.ativo = true;
        //console.log(this.data['colaborador'])
        Object.assign(this.editedColaborador, this.data['colaborador'])
        this.cpf =  this.onInputChange(this.editedColaborador.cpf)
        // console.log("on init")
        //this.getTasks(1, this.pageSize);
    }

    onInputChange(event) {
        console.log(event)
        let newVal =  event.replace(/\D/g, '');
        // if (backspace && newVal.length <= 6) {
        //   newVal = newVal.substring(0, newVal.length - 1);
        // }
        if (newVal.length === 0) {
          newVal = '';
        } else if (newVal.length <= 3) {
          newVal = newVal.replace(/^(\d{0,3})/, '$1');
        } else if (newVal.length <= 6) {
          newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '$1.$2');
        } else if (newVal.length <= 9) {
          newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,3})/, '$1.$2.$3');
        } else if (newVal.length <= 11) {
          newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/, '$1.$2.$3-$4');
        } else {
          newVal = newVal.substring(0, 11);
          newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/, '$1.$2.$3-$4');
        }
        return newVal;
      }

    submitForm(form: NgForm) {
        console.log(form.value)
        console.log(this.editedColaborador)
        if (form.valid) {
            console.log('form valid')
            /// const novoColaborador = JSON.stringify(form.value);
            this.edit(JSON.stringify(this.editedColaborador))
            // this.model.saveProduct(this.product);
            // //this.product = new Product();
            // //form.reset();
            // this.originalProduct = this.product;
            // this.router.navigateByUrl("/");
        }
    }

    edit(form: any) {
        //const novoColaborador = JSON.stringify(form.value);
        console.log(form)

        //this.redi(["./adm/colaboradores"]);
        this.http.put(`${this.baseUrl}/colaboradores`, form, {
            //this.http.post("http://api.invictustemp.com.thor.hostazul.com.br/api/identity/login", credentials, {

            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Authorization": "Bear "
            })
        }).subscribe(response => {

            console.log(response)



        }, err => { console.log(err) },
            () => {
                this.openSnackBar()
                this.dialogRef.close();

            });
    }

    openSnackBar() {
        this._snackBar.open('Colaborador editado com sucesso.', '', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'green-snackbar',
            duration: 3 * 1000,
        });
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

                // this.colaboradorForm.get('logradouro').setValue(response["logradouro"]);
                // this.colaboradorForm.get('bairro').setValue(response["bairro"]);
                // this.colaboradorForm.get('cidade').setValue(response["localidade"]);
                // this.colaboradorForm.get('uf').setValue(response["uf"]);
                //this.bairro = this.cepReturn.bairro
                // const token = (<any>response).accessToken;
                // console.log(response)
                // localStorage.setItem("jwt", token);
                // this.invalidLogin = false;
                // this.router.navigate(["/main"]);
            }, err => { console.log("erros") },
                () => { console.log('finaly') });
    }

}