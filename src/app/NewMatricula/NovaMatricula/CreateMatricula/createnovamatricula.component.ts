import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest } from "@angular/common/http";
import { CepReturn } from "src/app/_shared/models/cepreturn.model";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

import { Aluno, DataTrans, IValidateForms } from "src/app/_shared/models/aluno.model";
import { Turma, TurmaViewModel } from "src/app/_shared/models/Turma.model";
import { MyDate } from "src/app/_shared/customMasks/maskDate/nyDate.model";
import { MyTel } from "src/app/_shared/customMasks/maskTelBr/mytel.model";
import { Cargos, Unidades } from "src/app/_shared/models/perfil.model";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { Observable } from "rxjs";
import { DiaVencimento, Parcelas } from "src/app/_shared/models/utils.model";
import { ConfirmNovaMatriculaComponent } from "./Confirm/confirmnova.component";
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
    selector: 'createnovamatriculamodal',
    templateUrl: './createnovamatricula.component.html',
    styleUrls: ['./createnovamatricula.component.scss'],
    animations: [HighlightTrigger]
})

export class CreateNovaMatriculaComponent implements OnInit {



    baseUrl = environment.baseUrl;

    public alunoForm: FormGroup;
    public pesquisaForm: FormGroup;
    public alunoCPF: any;
    constructor(
        @Inject('ValidateForms') private _validateFomService: IValidateForms,
        private ConfirmModal: MatDialog,
        private _snackBar: MatSnackBar,
        private _fb: FormBuilder,
        private http: HttpClient,
        public dialogRef: MatDialogRef<CreateNovaMatriculaComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

        this.pesquisaForm = _fb.group({
            cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
        })


        this.alunoForm = _fb.group({
            nome: ['', [Validators.required, Validators.minLength(2)]],
            nomeSocial: [''],
            cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
            rg: ['', [Validators.required]],
            nomePai: [''],
            nomeMae: [''],
            nascimento: ['', [Validators.required]],
            naturalidade: ['', [Validators.required]],
            naturalidadeUF: ['', [Validators.required]],
            // temRespFin: [false, [Validators.required]],
            email: ['', [Validators.required, Validators.minLength(5), Validators.email]],
            telReferencia: [null, [Validators.minLength(0)]],
            nomeContatoReferencia: ['', [Validators.required, Validators.minLength(2)]],
            telCelular: [null, [Validators.minLength(0)]],
            telWhatsapp: [null, [Validators.minLength(10)]],
            telResidencial: [null, [Validators.minLength(9)]],
            cep: ['', [Validators.required, Validators.minLength(8)]],
            logradouro: ['', [Validators.required, Validators.minLength(1)]],
            numero: ['', [Validators.required, Validators.minLength(1)]],
            complemento: [''],
            cidade: ['', [Validators.required, Validators.minLength(1)]],
            uf: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
            bairro: ['', [Validators.required, Validators.minLength(1)]],
            ativo: [true]
        })


    }

    ngOnInit() {

    }

    showDivPesquisa = true
    showDivForm = false
    showMensagem = false
    mensagem = ""
    consulta(form: any) {

        if (this.pesquisaForm.valid) {

            this.showMensagem = false

            let cpf = this.pesquisaForm.get('cpf').value

            this.http.get(`${this.baseUrl}/alunos/${cpf}`)

                .subscribe(response => {


                }, (err) => {
                    console.log(err)
                    this.mensagem = "O CPF já se encontra cadastrado!"
                    this.showMensagem = true

                },
                    () => {
                        this.alunoCPF = cpf
                        this.alunoForm.get('cpf').setValue(this.alunoCPF)
                        this.showDivPesquisa = false
                        this.showDivForm = true
                    });
        }


    }
    disabledSaveButton = false
    get disabledButton() {
console.log()
        if (this.alunoForm.valid) {
            if (this.disabledSaveButton) {
                return true
            } else {
                return false
            }
          
        } else {

            return true
        }


    }
    showDivEndereco = false
    consultaCEP(CEP: string) {
        console.log(CEP);

        if (this.alunoForm.get('cep').valid) {
            this.http.get(`https://viacep.com.br/ws/${CEP}/json/`, {})
                .subscribe(response => {

                    this.alunoForm.get('logradouro').setValue(response["logradouro"].toUpperCase());
                    this.alunoForm.get('bairro').setValue(response["bairro"].toUpperCase());
                    this.alunoForm.get('cidade').setValue(response["localidade"].toUpperCase());
                    this.alunoForm.get('uf').setValue(response["uf"].toUpperCase());

                }, err => { console.log(err) },
                    () => {
                        console.log('finaly')
                        this.showDivEndereco = true
                    });
        }
    }

    idade: number
    onFocusOutDateEvent(event: any) {
        console.log(event.target.value);
        console.log(this.alunoForm.get('nascimento').value)
        var dataForm: Date = new Date(this.alunoForm.get('nascimento').value)

        if(this.alunoForm.get('nascimento').value != null){
        let timeDiff = Math.abs(Date.now() - dataForm.getTime());
        this.idade = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
        console.log('idade:')
        console.log(this.idade)
        }else{
            this.idade = null
        }

    }


    messageConflit = false
    onSubmit(alunoForm) {

        console.log(this.alunoForm.value)
        if (this.alunoForm.valid) {
            this.disabledSaveButton = true

            this.http.post(`${this.baseUrl}/alunos`, this.alunoForm.value, {
            }).subscribe(response => {
            }, (err) => {
                console.log(err)
                console.log(err['error'].mensagem)
                this.mensagem = err['error'].mensagem
                this.showMensagem = true
                this.messageConflit = true
                this.disabledSaveButton = false
            },
                () => {
                    //console.log(response)
                    this.openSnackBar()
                    //this.showMensagem = false
                    this.dialogRef.close({ clicked: "Ok" });
                });
        }
    }

    openSnackBar() {
        this._snackBar.open('Aluno salvo com sucesso.', '', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'green-snackbar',
            duration: 3 * 1000,
        });
    }
}

