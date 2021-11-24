import { Component, Inject, OnInit, Pipe, PipeTransform } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { GenericTask } from 'src/app/shared/models/generictask.model';
import { Output, EventEmitter } from '@angular/core';
//import { AdmService } from '../../adm.service';
import { PageEvent } from '@angular/material/paginator';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

import { Sala } from "../../Adm-Models/sala.model";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { UpperCasePipe } from "@angular/common";
import { Cargo } from "../../Adm-Models/cargos.model";
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
    testepipe: any
    private _baseUrl = environment.baseUrl
    public unidadeForm: FormGroup;
    public colaboradorForm: FormGroup;
    //public salas: Sala[] 
    constructor(
        //private service: AdmService,
        private upperCasePipe: UpperCasePipe,
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

        this.unidadeForm.valueChanges.subscribe(form => {
            if (typeof form.sigla === 'string') {
                const siglaUpper = this.upperCasePipe.transform(form.sigla);
                if (form.sigla !== siglaUpper) {
                    this.unidadeForm.patchValue({ sigla: siglaUpper })

                }
            }
        })

        this.colaboradorForm = _fb.group({
            // templateName: ['', [Validators.required, Validators.minLength(5)]],
            // newCat: [,[Validators.required, Validators.minLength(3)]],
            // newFunc: [, [Validators.required, Validators.minLength(3)]]
            nome: ['', [Validators.required, Validators.minLength(5)]],
            email: ['', [Validators.required, Validators.email]],
            cpf: ['', [Validators.required, Validators.minLength(11)]],
            celular: [null, [Validators.required, Validators.minLength(5)]],
            cargoId: [3, [Validators.required]],
            ativo: [true, [Validators.required]],
            cep: ['', [Validators.required, Validators.minLength(8)]],
            logradouro: ['', [Validators.required, Validators.minLength(1)]],
            complemento: [''],
            numero: ['', [Validators.required]],
            cidade: ['', [Validators.required, Validators.minLength(1)]],
            uf: ['', [Validators.required, Validators.minLength(2)]],
            bairro: ['', [Validators.required, Validators.minLength(1)]]//,
            //celular: [new MyTel('', '', ''), [Validators.required, Validators.minLength(1)]]
        })
    }

    // get salas(): FormArray {
    //     return this.unidadeForm.get("salas") as FormArray
    // }

    // novaSala(): FormGroup {
    //     return this._fb.group({
    //         //id: '',
    //         titulo: '',
    //         descricao: '',
    //         comentarios: '',
    //         capacidade: '',
    //         dataCriacao: '',

    //     })
    // }

    // addSala() {
    //     this.salas.push(this.novaSala());
    // }

    // removeSala(i:number) {
    //     this.salas.removeAt(i);
    //   }

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

    cargos: Cargo[] = new Array<Cargo>()
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
        console.log(this.unidadeForm.value)
        //console.log(this.colaboradorForm.value)
        //console.log(this.testepipe)

        if (form.valid) {

            this._http.post(`${this._baseUrl}/unidade`, this.unidadeForm.value, {})
                .subscribe(resp => { },
                    (error) => { console.log(error) },
                    () => { this.dialogRef.close({ clicked: "Ok" }) })

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

    addSalaModal(): void {
        // const dialogRef = this._modal
        //     .open(AddSalaComponent, {
        //         height: '470px',
        //         width: '800px',
        //         //data: {  },
        //         hasBackdrop: true,
        //         disableClose: true
        //     });
        // dialogRef.afterClosed().subscribe((data) => {
        //     if (data.clicked === "Ok") {
        //        // this.getUnidades();
        //     } else if (data.clicked === "Cancel") {

        //     }
        // });
    }

    buscarEmail(event: any) {
        // if (this.colaboradorForm.get('email').valid) {
        //     this.validadeEmailMsg = false
        //     this.http.get(`${this.baseUrl}/adm/aluno/email/${event.target.value}`, {
        //         headers: new HttpHeaders({
        //             "Content-Type": "application/json",
        //             "Authorization": "Bear "
        //         })
        //     }).subscribe(response => {

        //     }, (err) => {
        //         if (err['status'] == 409) {
        //             this.validadeEmailMsg = true
        //             this.colaboradorForm.get('email').setErrors({ 'incorrect': true });
        //         }
        //     },
        //         () => {
        //             this.colaboradorForm.get('email').setErrors(null);
        //         });

        //     //this.colaboradorForm.get('email').setErrors({ 'incorrect': true });

        // }
    }

    buscarCPF(event: any) {
        // console.log(event.target.value)
        // console.log(this.colaboradorForm.get('cpf').value)
        // console.log(this.colaboradorForm.get('cpf').valid)
        // console.log(this.colaboradorForm.get('cpf').value.length)
        // if (this.colaboradorForm.get('cpf').valid) {
        //     this.validadeCPFMsg = false
        //     let cpf = this.colaboradorForm.get('cpf').value
        //     //this.http.get(`${this.baseUrl}/adm/aluno/cpf/${event.target.value}`, {
        //     this.http.get(`${this.baseUrl}/adm/aluno/cpf/${cpf}`, {
        //         headers: new HttpHeaders({
        //             "Content-Type": "application/json",
        //             "Authorization": "Bear "
        //         })
        //     }).subscribe(response => {

        //     }, (err) => {
        //         if (err['status'] == 409) {
        //             this.validadeCPFMsg = true
        //             this.colaboradorForm.get('cpf').setErrors({ 'incorrect': true });
        //         }
        //     },
        //         () => {
        //             this.colaboradorForm.get('cpf').setErrors(null);
        //         });

        //     //this.colaboradorForm.get('email').setErrors({ 'incorrect': true });

        // }
    }

}