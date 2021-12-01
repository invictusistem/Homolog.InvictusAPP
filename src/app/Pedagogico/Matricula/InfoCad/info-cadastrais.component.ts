import { Component, EventEmitter, Inject, OnInit, Output } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { environment } from "src/environments/environment";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { Aluno } from "src/app/_shared/models/aluno.model";
import { PedagService } from "../../service/pedag.service";
import { CepReturn } from "src/app/_shared/models/cepreturn.model";
import { InfoFinanceiras } from "src/app/_shared/models/InfoFinanceiras.model";
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { DocumentoAlunoDto } from "../../Pedag-Models/documentoaluno.model";
import { Observable } from "rxjs";

@Component({
    selector: 'info-cadastraismodal',
    templateUrl: './info-cadastrais.component.html',
    styleUrls: ['./info-cadastrais.component.scss'],
    animations: [HighlightTrigger]
})

export class InfoCadastraisComponent implements OnInit {

    baseUrl = environment.baseUrl;

    private jwtHelper = new JwtHelperService();
    tokenInfo: TokenInfos = new TokenInfos();


    constructor(
        private _fb: FormBuilder,
        private _http: HttpClient,
        // private _service: PedagService,
        public dialogRef: MatDialogRef<InfoCadastraisComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {



    }

    ngOnInit() {

        //this.alunoId = this.data['aluno'].nome

        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)
        this.getAluno(this.data['aluno'].id);
    }
    alunoOriginal:any
    aluno: any
    showForm = false
    getAluno(alunoId) {

        this._http.get(`${this.baseUrl}/alunos/cadastro/${alunoId}`)
            .subscribe(resp => {
                this.alunoOriginal = Object.assign({}, resp['aluno'])
                this.aluno = Object.assign({}, resp['aluno'])

            }, () => { },
                () => {
                    this.showForm = true
                })
    }

    get podeSalvar(){

        return JSON.stringify(this.aluno) === JSON.stringify(this.alunoOriginal)
    }

    onFocusOutDateEvent($event) {

    }

    consultaCEP(cep:string) {
       console.log(cep);

        this._http.get(`https://viacep.com.br/ws/${cep}/json/`)
            .subscribe(response => {
                console.log(response);
                this.aluno.logradouro = response['logradouro']
                this.aluno.bairro = response['bairro']
                this.aluno.cidade = response['localidade']
                this.aluno.uf = response['uf']


            }, err => { console.log("erros") },
                () => { console.log('finaly') });
    }

    saveEdit(form: any) {
        if (form.valid) {

            //this.redi(["./adm/colaboradores"]);
            this._http.put(`${this.baseUrl}/alunos`, this.aluno, {})
            .subscribe(response => {

            }, err => { console.log(err) },
                () => {
                    //this.openSnackBar()
                    this.dialogRef.close({clicked: 'OK'});

                });
        }

    }



}