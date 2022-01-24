import { Component, Inject, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { GenericTask } from 'src/app/shared/models/generictask.model';
import { Output, EventEmitter } from '@angular/core';
//import { AdmService } from '../../adm.service';
import { PageEvent } from '@angular/material/paginator';
import { Colaborador } from "src/app/_shared/models/colaborador.model";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CepReturn } from "src/app/_shared/models/cepreturn.model";
import { environment } from "src/environments/environment";
import { Cargos, Unidades } from "src/app/_shared/models/perfil.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HelpersService } from "src/app/_shared/components/helpers/helpers.component";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
//import { TemplateTasks } from 'src/app/shared/models/templateTasks.model';

@Component({
    selector: 'editcolaboradoresmodal',
    templateUrl: './editcolaboradores.component.html',
    styleUrls: ['./editcolaboradores.component.scss'],
    animations: [HighlightTrigger]
})

export class EditColaboradoresComponent implements OnInit {

    // pageSize: number = 5;
    // genericTasks: GenericTask[] = new Array<GenericTask>();
    // length: number;
    // pageEvent: PageEvent;
    baseUrl = environment.baseUrl;

    editedColaborador: Object = new Object();
    originalColaborador: Object = new Object();//Colaborador = new Colaborador();

    public initProgressBar = 'visible'
    public saveBar = 'hidden'
    unidades = Unidades;
    showMensagem = false
    mensagem = ''
    cpf = ''
    showForm = false

    public cepReturn: CepReturn = new CepReturn();
    cargos: any[] = new Array<any>();// Cargos;
    ativo = true;
    public colaboradorForm: FormGroup

    constructor(
        private _helper: HelpersService,
        //private _snackBar: MatSnackBar,
        private http: HttpClient,
        private _fb: FormBuilder,
        public dialogRef: MatDialogRef<EditColaboradoresComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.colaboradorForm = _fb.group({
            id: [''],
            nome: ['', [Validators.required, Validators.minLength(5)]],
            email: [''],
            cpf: [''],
            celular: [null, [Validators.required, Validators.minLength(5)]],
            cargoId: ['', [Validators.required]],
            unidadeId: [''],
            ativo: [true, [Validators.required]],
            cep: ['', [Validators.required, Validators.minLength(8)]],
            logradouro: ['', [Validators.required, Validators.minLength(1)]],
            complemento: [''],
            numero: ['', [Validators.required]],
            cidade: ['', [Validators.required, Validators.minLength(1)]],
            uf: ['', [Validators.required, Validators.minLength(2)]],
            bairro: ['', [Validators.required, Validators.minLength(1)]],
            dataCriacao: ['']
        })
    }


    //@Output() newItemEvent = new EventEmitter<string>();
    tentando = true
    get teste() {
        return this.tentando
    }
    get desabilitar() {
          
            if (this.colaboradorForm.valid &&
                JSON.stringify(this.originalColaborador) !=
                JSON.stringify(this.colaboradorForm.value)) {
    
                return this.saveBar != 'hidden'
            } else {
                return true
            }
    }

    changeValue() {
        this.tentando = !this.tentando
    }
    
    mudou() {
        console.log('mudou')
    }

    ngOnInit() {
        //this.ativo = true;

        // Object.assign(this.originalColaborador, this.data['colaborador'])
        // Object.assign(this.editedColaborador, this.data['colaborador'])

        // this.colaboradorForm.patchValue(this.data['colaborador']);
        // this.originalColaborador = JSON.parse(JSON.stringify(this.colaboradorForm.value))


        //console.log(this.data['colaborador'])
       // this.colaboradorForm.patchValue(this.data['colaborador'])
        // this.originalColaborador = this.data['colaborador']
        // this.editedColaborador = this.data['colaborador']
        this.getColaborador();
    }

    getColaborador() {
        this.http.get(`${this.baseUrl}/colaboradores/Cargo/${this.data['colaborador'].id}`)
            .subscribe(response => {

                this.cargos = Object.assign([], response['values'])
                this.colaboradorForm.patchValue(response['colaborador']);
                this.originalColaborador = JSON.parse(JSON.stringify(this.colaboradorForm.value))

            }, err => {
                console.log(err)
                this.initProgressBar = 'hidden'
            },
                () => {
                    this.showForm = true
                    this.initProgressBar = 'hidden'

                });
    }

    disabledSpinner = false
    edit(form: any) {
        // //const novoColaborador = JSON.stringify(form.value);
        // console.log(form)
        // console.log(form.valid)
        if (this.colaboradorForm.valid) {
            this.saveBar = 'visible'
            //this.redi(["./adm/colaboradores"]);
            this.http.put(`${this.baseUrl}/colaboradores`, this.colaboradorForm.value, {})
                .subscribe(response => {

                }, err => {
                    console.log(err)
                    this.saveBar = 'hidden'
                },
                    () => {
                        this._helper.openSnackBar('Colaborador editado com sucesso.')
                        this.saveBar = 'hidden'
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