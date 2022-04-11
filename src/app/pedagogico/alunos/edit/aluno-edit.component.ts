import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HighlightTrigger } from "src/app/_shared/animation/animation";
import { environment } from "src/environments/environment";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { HelpersService } from "src/app/_shared/components/helpers/helpers.component";

@Component({
    selector: 'info-cadastraismodal',
    templateUrl: './aluno-edit.component.html',
    styleUrls: ['./aluno-edit.component.scss'],
    animations: [HighlightTrigger]
})

export class AlunoEditComponent implements OnInit {

    baseUrl = environment.baseUrl;
    public initProgressBar = 'visible'
    public disabledSaveButton = 'hidden'
    private alunoOriginal: any
    public aluno: any
    public showForm = false
    private jwtHelper = new JwtHelperService();
    tokenInfo: TokenInfos = new TokenInfos();

    public alunoForm!: FormGroup;
    private alunoOriginalForm: any

    constructor(
        private _fb: FormBuilder,
        private _http: HttpClient,
        private _helper: HelpersService,
        public dialogRef: MatDialogRef<AlunoEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

        this.alunoForm = _fb.group({
            id: [''],
            nome: [''],
            nomeSocial: [''],
            cpf: [''],
            rg: [''],
            nomePai: [''],
            nomeMae: [''],
            nascimento: [''],
            naturalidade: ['', [Validators.required]],
            naturalidadeUF: ['', [Validators.required]],
            email: [''],
            telReferencia: [null, [Validators.required, Validators.minLength(10)]],
            nomeContatoReferencia: ['', [Validators.required, Validators.minLength(2)]],
            telCelular: [''],
            telWhatsapp: [''],
            telResidencial: [''],
            cep: ['', [Validators.required, Validators.minLength(8)]],
            logradouro: ['', [Validators.required, Validators.minLength(1)]],
            numero: ['', [Validators.required, Validators.minLength(1)]],
            complemento: [''],
            cidade: [''],
            uf: [''],
            bairro: [''],
            ativo: [''],
            dataCadastro: [''],
            unidadeId: ['']
        })

        this.alunoForm.valueChanges.subscribe(
            (form: any) => {
                //console.log(this.alunoForm.get('telWhatsapp').value.length)
                // Nenhum preenchido
                if (this.alunoForm.get('telCelular')?.value == '' &&
                    this.alunoForm.get('telWhatsapp')?.value == '' &&
                    this.alunoForm.get('telResidencial')?.value == '') {
                    //console.log('all null')
                    //console.log(this.alunoForm)
                    this.alunoForm.get('telCelular')?.setValidators([Validators.required, Validators.minLength(11)])
                    this.alunoForm.get('telCelular')?.updateValueAndValidity({ emitEvent: false })
                    this.alunoForm.get('telWhatsapp')?.setValidators([Validators.required, Validators.minLength(11)])
                    this.alunoForm.get('telWhatsapp')?.updateValueAndValidity({ emitEvent: false })
                    this.alunoForm.get('telResidencial')?.setValidators([Validators.required, Validators.minLength(10)])
                    this.alunoForm.get('telResidencial')?.updateValueAndValidity({ emitEvent: false })

                } else if (this.alunoForm.get('telCelular')?.value.length < 11 ||
                    this.alunoForm.get('telWhatsapp')?.value.length < 11 ||
                    this.alunoForm.get('telResidencial')?.value.length < 10) {
                    //console.log('um com valor')
                    //console.log(this.alunoForm)
                    if (this.alunoForm.get('telCelular')?.value.length < 11 && this.alunoForm.get('telCelular')?.value.length > 0) {
                        this.alunoForm.get('telCelular')?.setValidators([Validators.required, Validators.minLength(11)])
                        this.alunoForm.get('telCelular')?.updateValueAndValidity({ emitEvent: false })
                    } else {
                        this.alunoForm.get('telCelular')?.clearValidators()
                        this.alunoForm.get('telCelular')?.updateValueAndValidity({ emitEvent: false })
                    }
                    if (this.alunoForm.get('telWhatsapp')?.value.length < 11 && this.alunoForm.get('telWhatsapp')?.value.length > 0 ) {
                        this.alunoForm.get('telWhatsapp')?.setValidators([Validators.required, Validators.minLength(11)])
                        this.alunoForm.get('telWhatsapp')?.updateValueAndValidity({ emitEvent: false })
                    } else {
                        this.alunoForm.get('telWhatsapp')?.clearValidators()
                        this.alunoForm.get('telWhatsapp')?.updateValueAndValidity({ emitEvent: false })
                    }
                    if (this.alunoForm.get('telResidencial')?.value.length < 10 && this.alunoForm.get('telResidencial')?.value.length > 0 ) {
                        this.alunoForm.get('telResidencial')?.setValidators([Validators.required, Validators.minLength(10)])
                        this.alunoForm.get('telResidencial')?.updateValueAndValidity({ emitEvent: false })
                    } else {
                        this.alunoForm.get('telResidencial')?.clearValidators()
                        this.alunoForm.get('telResidencial')?.updateValueAndValidity({ emitEvent: false })
                    }
                } else {
                    this.alunoForm.get('telCelular')?.clearValidators()
                    this.alunoForm.get('telCelular')?.updateValueAndValidity({ emitEvent: false })

                    this.alunoForm.get('telWhatsapp')?.clearValidators()
                    this.alunoForm.get('telWhatsapp')?.updateValueAndValidity({ emitEvent: false })

                    this.alunoForm.get('telResidencial')?.clearValidators()
                    this.alunoForm.get('telResidencial')?.updateValueAndValidity({ emitEvent: false })
                }
            }
        );

    }

    ngOnInit() {

        //this.alunoId = this.data['aluno'].nome

        const token: any = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)
        //console.log(this.data['aluno'])
        this.getAluno(this.data['aluno'].id);
    }
    
    getAluno(alunoId: any) {

        this._http.get(`${this.baseUrl}/alunos/cadastro/${alunoId}`)
            .subscribe((resp: any) => {
                // this.alunoOriginal = Object.assign({}, resp['aluno'])
                // this.aluno = Object.assign({}, resp['aluno'])

                this.alunoForm.patchValue(resp['aluno']);
                this.alunoOriginalForm = JSON.parse(JSON.stringify(this.alunoForm.value))


            }, () => {
                this.initProgressBar = 'hidden'
            },
                () => {

                    this.initProgressBar = 'hidden'
                    this.dialogRef.addPanelClass('infocadastrais-class')
                    console.log(this.aluno)
                    this.showForm = true
                })
    }

    get podeSalvar() {

        if (this.alunoForm.valid &&
            JSON.stringify(this.alunoOriginalForm) !=
            JSON.stringify(this.alunoForm.value)) {

            return this.disabledSaveButton != 'hidden'
        } else {
            return true
        }
    }   

    consultaCEP(CEP: string) {
        //console.log(cep);
        if (this.alunoForm.get('cep')?.valid) {

            CEP = CEP.replace('-', '');
            CEP = CEP.replace('.', '');


            this._http.get(`https://viacep.com.br/ws/${CEP}/json/`)
                .subscribe((response: any) => {
                    //console.log(response);
                    this.alunoForm.get('logradouro')?.setValue(response["logradouro"].toUpperCase())
                    this.alunoForm.get('bairro')?.setValue(response["bairro"].toUpperCase())
                    this.alunoForm.get('cidade')?.setValue(response["localidade"].toUpperCase())
                    this.alunoForm.get('uf')?.setValue(response["uf"].toUpperCase())


                }, err => {
                    //console.log("erros") 
                },
                    () => {
                        //    console.log('finaly') 
                    });
        }
    }

    public SaveEdit(form: any) {
        this.disabledSaveButton = 'visible'
        if (form.valid) {

            //this.redi(["./adm/colaboradores"]);
            this._http.put(`${this.baseUrl}/alunos`, this.alunoForm.value, {})
                .subscribe(response => {

                }, err => {
                    this.disabledSaveButton = 'hidden'
                },
                    () => {
                        this.disabledSaveButton = 'hidden'
                        this._helper.openSnackBarSucesso("Cadastro editado com sucesso.")
                        this.dialogRef.close({ clicked: true });

                    });
        }

    }



}