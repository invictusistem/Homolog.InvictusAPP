import { Component, Inject, Input, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CepReturn } from "src/app/_shared/models/cepreturn.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Cargos, Unidades } from "src/app/_shared/models/perfil.model";
import { MyTel } from "src/app/_shared/customMasks/maskTelBr/mytel.model";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { Aluno } from "src/app/_shared/models/aluno.model";
import { Turma } from "src/app/_shared/models/Turma.model";
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenInfos } from "src/app/_shared/models/token.model";


//import { TemplateTasks } from 'src/app/shared/models/templateTasks.model';

@Component({
    selector: 'transfturmamodal',
    templateUrl: './transfturma.component.html',
    styleUrls: ['./transfturma.component.scss'],
    animations: [HighlightTrigger] //@rowHighlight
})

export class TransferenciaTurmaComponent implements OnInit {


    baseUrl = environment.baseUrl;
    //public cepReturn: CepReturn = new CepReturn();
    public pesquisaForm: FormGroup;
    public aluno: Aluno = new Aluno()
    public turmas: Turma[] = new Array<Turma>();
    private jwtHelper = new JwtHelperService();
    tokenInfo: TokenInfos = new TokenInfos();
    temDebito = false;
    //cargos = Cargos;
    mensagem = "";
    showMensagem = false
    showAluno = false
    showSearch = true

    constructor(
        //private service: AdmService,
        //private router: Router,
        private _fb: FormBuilder,
        private _http: HttpClient,
        public dialogRef: MatDialogRef<TransferenciaTurmaComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.pesquisaForm = _fb.group({
            cpf: ['', [Validators.required, Validators.minLength(11)]],
        })
    }

    ngOnInit() {
        // console.log("on init")
        //this.getTasks(1, this.pageSize);
        //this.colaboradorForm.get('logradouro').disable()


        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)
    }

    fechar() {
        this.dialogRef.close({ clicked: "Ok" });
    }

    resposta: any
    HasMessage: any
    nascimento: any
    idTurmaAntiga: number
    consulta(form: FormGroup) {

        console.log(this.pesquisaForm.get('cpf').value)

        this.showMensagem = false

        if (form.valid) {
            let cpf = this.pesquisaForm.get('cpf').value
            console.log(cpf)
            this._http.get(`${this.baseUrl}/pedag/transf-turma/?cpf=${cpf}`)
                .subscribe(response => {
                    console.log(response['message'])

                    this.resposta = response
                    this.HasMessage = response['message']
                    // if(response['message'] != undefined){

                    // }
                    // this.alunoResponse = Object.assign([], response)

                }, err => { console.log(err) },
                    () => {

                        console.log(this.resposta)
                        if (this.HasMessage != undefined) {

                            this.showMensagem = true
                            this.mensagem = this.resposta['message']
                            console.log(this.mensagem)

                        } else {
                            this.aluno = Object.assign({}, this.resposta['aluno'])
                            this.turmas = Object.assign([], this.resposta['turmas'])
                            this.idTurmaAntiga = this.resposta['turmaAtualId']
                            this.temDebito = this.resposta['debitos']
                            this.nascimento = { dia: 10, mes: 5, ano: 2021 }
                            this.showAluno = true
                            this.showSearch = false
                        }

                    });
        }
    }

    turmaTransId = 0
    selectTurma(turmaId: number) {
        this.turmaTransId = turmaId;
        // this._http.post(`${this.baseUrl}/pedag/transfinterna/?alunoId=${this.aluno.id}&turmaId=${turmaId}`, {

        // }).subscribe(resp => {

        //     }

        //     ,
        //     (error) => { console.log(error) },
        //     () => { })

    }

    salvar() {

        if (this.turmaTransId > 0) {
            this._http.post(`${this.baseUrl}/pedag/trans-turma/?alunoId=${this.aluno.id}&turmaId=${this.turmaTransId}&turmaIdAntiga=${this.idTurmaAntiga}`, {

            }).subscribe(resp => {

            },
                (error) => { console.log(error) },
                () => {
                    this.dialogRef.close({ clicked: "Ok" });
                })
        }

    }

    onSubmit(form: FormGroup) {
        this.showMensagem = false
        console.log(form)
        console.log(form.value)
        console.log(form.valid)
        //var cel = `${form['celular'].value}`
        //console.log(cel)
        // this.dialogRef.close();
        if (form.valid) {
            console.log('form valid')
            const novoColaborador = JSON.stringify(form.value);
            //this.save(novoColaborador)
            // let newTemplate = this.mapForm(tempForm)

            this._http.post(`${this.baseUrl}/colaboradores`, novoColaborador, {
                //this.http.post("http://api.invictustemp.com.thor.hostazul.com.br/api/identity/login", credentials, {

                headers: new HttpHeaders({
                    "Content-Type": "application/json",
                    "Authorization": "Bear "
                })
            }).subscribe(response => {

                console.log(response)
                // this.colaboradores = Object.assign([], response['data'])
                // console.log(this.colaboradores)
                // this.dialogRef.close();
            }, (err) => {
                console.log(err)
                console.log(err['error'].mensagem)
                this.mensagem = err['error'].mensagem
                this.showMensagem = true
            },
                () => {
                    //console.log(response)
                    this.showMensagem = false
                    this.dialogRef.close({ clicked: "Ok" });
                });
        }
    }


    // https://viacep.com.br/ws/01001000/json/


    onOkClick() {
        //console.log("I do nothing");
        this.dialogRef.close({ clicked: "Ok" });
    }

}