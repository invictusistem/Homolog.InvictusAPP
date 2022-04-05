import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { environment } from "src/environments/environment";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { MatSnackBar } from "@angular/material/snack-bar";
import { IValidateForms } from "src/app/_shared/models/aluno.model";
import { HelpersService } from "src/app/_shared/components/helpers/helpers.component";

@Component({
    selector: 'createnovamatriculamodal',
    templateUrl: './createnovamatricula.component.html',
    styleUrls: ['./createnovamatricula.component.scss'],
    animations: [HighlightTrigger]
})

export class CreateNovaMatriculaComponent implements OnInit {

    baseUrl = environment.baseUrl;
    public searchCpfProgressBar = 'hidden'
    public hintCpfInvalid = false
    public hintRgInvalid = false
    public hintEmailInvalid = false

    public alunoForm: FormGroup;
    public pesquisaForm: FormGroup;
    public alunoCPF: any;
    constructor(
        @Inject('ValidateForms') private _validateFomService: IValidateForms,
        private _helper: HelpersService,
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
            email: ['', [Validators.required, Validators.minLength(5), Validators.email]],
            telReferencia: [null, [Validators.required, Validators.minLength(10)]],
            nomeContatoReferencia: ['', [Validators.required, Validators.minLength(2)]],
            telCelular: [''],
            telWhatsapp: [''],
            telResidencial: [''],
            cep: ['', [Validators.required, Validators.minLength(8)]],
            logradouro: ['', [Validators.required, Validators.minLength(1)]],
            numero: ['', [Validators.required, Validators.minLength(1)]],
            complemento: [''],
            cidade: ['', [Validators.required, Validators.minLength(1)]],
            uf: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
            bairro: ['', [Validators.required, Validators.minLength(1)]],
            ativo: [true]
        })

        this.alunoForm.valueChanges.subscribe(
            (form: any) => {
                //console.log(this.alunoForm.get('telWhatsapp').value.length)
                // Nenhum preenchido
                if (this.alunoForm.get('telCelular').value == '' &&
                    this.alunoForm.get('telWhatsapp').value == '' &&
                    this.alunoForm.get('telResidencial').value == '') {
                    //console.log('all null')
                    //console.log(this.alunoForm)
                    this.alunoForm.get('telCelular').setValidators([Validators.required, Validators.minLength(11)])
                    this.alunoForm.get('telCelular').updateValueAndValidity({ emitEvent: false })
                    this.alunoForm.get('telWhatsapp').setValidators([Validators.required, Validators.minLength(11)])
                    this.alunoForm.get('telWhatsapp').updateValueAndValidity({ emitEvent: false })
                    this.alunoForm.get('telResidencial').setValidators([Validators.required, Validators.minLength(10)])
                    this.alunoForm.get('telResidencial').updateValueAndValidity({ emitEvent: false })

                } else if (this.alunoForm.get('telCelular').value.length < 11 ||
                    this.alunoForm.get('telWhatsapp').value.length < 11 ||
                    this.alunoForm.get('telResidencial').value.length < 10) {
                    //console.log('um com valor')
                    //console.log(this.alunoForm)
                    if (this.alunoForm.get('telCelular').value.length < 11 && this.alunoForm.get('telCelular').value.length > 0) {
                        this.alunoForm.get('telCelular').setValidators([Validators.required, Validators.minLength(11)])
                        this.alunoForm.get('telCelular').updateValueAndValidity({ emitEvent: false })
                    } else {
                        this.alunoForm.get('telCelular').clearValidators()
                        this.alunoForm.get('telCelular').updateValueAndValidity({ emitEvent: false })
                    }
                    if (this.alunoForm.get('telWhatsapp').value.length < 11 && this.alunoForm.get('telWhatsapp').value.length > 0) {
                        this.alunoForm.get('telWhatsapp').setValidators([Validators.required, Validators.minLength(11)])
                        this.alunoForm.get('telWhatsapp').updateValueAndValidity({ emitEvent: false })
                    } else {
                        this.alunoForm.get('telWhatsapp').clearValidators()
                        this.alunoForm.get('telWhatsapp').updateValueAndValidity({ emitEvent: false })
                    }
                    if (this.alunoForm.get('telResidencial').value.length < 10 && this.alunoForm.get('telResidencial').value.length > 0) {
                        this.alunoForm.get('telResidencial').setValidators([Validators.required, Validators.minLength(10)])
                        this.alunoForm.get('telResidencial').updateValueAndValidity({ emitEvent: false })
                    } else {
                        this.alunoForm.get('telResidencial').clearValidators()
                        this.alunoForm.get('telResidencial').updateValueAndValidity({ emitEvent: false })
                    }
                } else {
                    this.alunoForm.get('telCelular').clearValidators()
                    this.alunoForm.get('telCelular').updateValueAndValidity({ emitEvent: false })

                    this.alunoForm.get('telWhatsapp').clearValidators()
                    this.alunoForm.get('telWhatsapp').updateValueAndValidity({ emitEvent: false })

                    this.alunoForm.get('telResidencial').clearValidators()
                    this.alunoForm.get('telResidencial').updateValueAndValidity({ emitEvent: false })
                }
            }
        );
    }

    asd: string = ''

    get pegarform() {

        // console.log(this.alunoForm.get('telCelular').value)

        return true
    }

    ngOnInit() {

    }

    showDivPesquisa = true
    showDivForm = false
    showMensagem = false
    mensagem = ""
    consulta() {

        if (this.pesquisaForm.valid) {
            this.searchCpfProgressBar = 'visible'
            this.showMensagem = false

            let cpf = this.pesquisaForm.get('cpf').value

            this.http.get(`${this.baseUrl}/alunos/${cpf}`)

                .subscribe(response => {


                }, (err) => {
                    //  console.log(err)
                    this.searchCpfProgressBar = 'hidden'
                    this.mensagem = "O CPF já se encontra cadastrado!"
                    this.showMensagem = true

                },
                    () => {
                        this.searchCpfProgressBar = 'hidden'
                        this.dialogRef.addPanelClass('createnovamatricula-class')
                        this.alunoCPF = cpf
                        this.alunoForm.get('cpf').setValue(this.alunoCPF)
                        this.showDivPesquisa = false
                        this.showDivForm = true
                    });
        }


    }
    disabledSaveButton = 'hidden'
    get disabledButton() {
        // console.log()
        if (this.alunoForm.valid) {
            return this.disabledSaveButton != 'hidden'

        } else {

            return true
        }


    }
    showDivEndereco = 'hidden'
    consultaCEP(CEP: string) {
        // console.log(CEP);

        if (this.alunoForm.get('cep').valid) {
            this.http.get(`https://viacep.com.br/ws/${CEP}/json/`, {})
                .subscribe(response => {

                    this.alunoForm.get('logradouro').setValue(response["logradouro"].toUpperCase());
                    this.alunoForm.get('bairro').setValue(response["bairro"].toUpperCase());
                    this.alunoForm.get('cidade').setValue(response["localidade"].toUpperCase());
                    this.alunoForm.get('uf').setValue(response["uf"].toUpperCase());

                }, err => {
                    //console.log(err) 
                },
                    () => {
                        // console.log('finaly')
                        this.showDivEndereco = 'visible'
                    });
        }
    }

    //idade: number
    // onFocusOutDateEvent(event: any) {       
    //     var dataForm: Date = new Date(this.alunoForm.get('nascimento').value)

    //     if (this.alunoForm.get('nascimento').value != null) {
    //         let timeDiff = Math.abs(Date.now() - dataForm.getTime());
    //         this.idade = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);         
    //     } else {
    //         this.idade = null
    //     }

    // }

    private OnOfMatHintMsgInvalids(command: boolean){
        this.hintCpfInvalid = command
        this.hintRgInvalid = command
        this.hintEmailInvalid = command
    }

    messageConflit = false
    public SaveCadastro() {

        this.OnOfMatHintMsgInvalids(false)
        // console.log(this.alunoForm.value)
        if (this.alunoForm.valid) {
            this.disabledSaveButton = 'visible'

            this.http.post(`${this.baseUrl}/alunos`, this.alunoForm.value, {
            }).subscribe(response => {
            }, (err) => {
                if(err['status'] == 409){

                    var msg = [
                        { campo: 'cpf', msg: 'mensagem'  },
                        { campo: 'email', msg: 'mesagem'  }
                    ]

                    msg.forEach(element => {

                        //cpf
                        if(element.campo == 'cpf') this.hintCpfInvalid = true
                        //email
                        if(element.campo == 'email') this.hintRgInvalid = true
                        //rg
                        if(element.campo == 'email') this.hintEmailInvalid = true
                    });
                   // this.hintCpfInvalid = true
                    //this.hintRgInvalid = true
                    //this.hintEmailInvalid = true

                   // this.mensagem = err['error'].mensagem
                    //this.showMensagem = true
                   // this.messageConflit = true
                    this.disabledSaveButton = 'hidden'    
                }
                // console.log(err)
                // console.log(err['error'].mensagem)
                //this.mensagem = err['error'].mensagem
                //this.showMensagem = true
                //this.messageConflit = true
                this.disabledSaveButton = 'hidden'
            },
                () => {
                    //console.log(response)
                    this._helper.openSnackBarSucesso("Aluno cadastrado com sucesso.")
                    //this.showMensagem = false
                    this.dialogRef.close({ clicked: "Ok" });
                });
        }
    }

    // openSnackBar() {
    //     this._snackBar.open('Aluno salvo com sucesso.', '', {
    //         horizontalPosition: 'center',
    //         verticalPosition: 'top',
    //         panelClass: 'green-snackbar',
    //         duration: 3 * 1000,
    //     });
    // }
}

