import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { Aluno } from "src/app/_shared/models/aluno.model";
import { Colaborador } from "src/app/_shared/models/colaborador.model";
import { Cargos, Unidades } from "src/app/_shared/models/perfil.model";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { environment } from "src/environments/environment";
import { InfoFinancComponent } from "./infoFinanc/infofinanc.component";
import { ReparcelamentoComponent } from "./Reparcelamento/reparcelamento.component";


@Component({
    selector: "alunofin-app",
    templateUrl: './alunofinanc.component.html',
    styleUrls: ['./alunofinanc.component.scss'],
    animations: [HighlightTrigger]
})

export class AlunoFinancComponent implements OnInit {


    //colaboradores: Colaborador[] = new Array<Colaborador>();
    baseUrl = environment.baseUrl;
    length: number = 0
    pageSize: number = 5;
    showMessageNoAluno = false
    // pageEvent: PageEvent;
    // pageIndexNumber: number = 0;
    // actualPage = 1
    // paginationInfo: IPager;

    // formSubmitted: boolean = false;
    // showTable: boolean = false;
    // showSpinner = false
    // showSpinnerFirst = false

    // showMessage: boolean = false;
    // cargos = Cargos;
    // unidades = Unidades
    showMessageNoColaborador = false
    mensagem: string = "";
    listAlunos: any[] = new Array<any>()// Aluno[] = new Array<Aluno>();

    public tokenInfo: TokenInfos = new TokenInfos();
    private jwtHelper = new JwtHelperService();
    public pesquisarForm: FormGroup
    //pagination


    constructor(
        private _http: HttpClient,
        private _fb: FormBuilder,
        private _modal: MatDialog) {
        this.pesquisarForm = _fb.group({
            nome: ['', [Validators.required]],
            email: ['', [Validators.required]],
            cpf: ['', [Validators.required]],
            ativo: [false]
        });

        this.pesquisarForm.valueChanges.subscribe(
            (form: any) => {
                // console.log('form changed to:', form);
                if (this.pesquisarForm.get('nome').value == '' &&
                    this.pesquisarForm.get('email').value == '' &&
                    this.pesquisarForm.get('cpf').value == '') {
                    //  console.log('false valid')

                    this.pesquisarForm.controls['nome'].setErrors({ required: true });
                    this.pesquisarForm.controls['email'].setErrors({ required: true });
                    this.pesquisarForm.controls['cpf'].setErrors({ required: true });
                    // this.pesquisarForm.setErrors({required: true});
                } else {
                    //   console.log('true valid')
                    this.pesquisarForm.controls['nome'].setErrors(null);

                    this.pesquisarForm.controls['email'].setErrors(null)

                    this.pesquisarForm.controls['cpf'].setErrors(null);

                    //this.pesquisarForm.setErrors({required: false});


                }


            }


        );
    }


    ngOnInit() {
    }

    onSubmit(form?: any, event?: any) {

        // this.showMessageNoAluno = false
        var formJson = JSON.stringify(this.pesquisarForm.value)

        if (this.pesquisarForm.valid) {
            this._http.get(`${this.baseUrl}/financeiro/alunos/?itemsPerPage=` + this.pageSize + `&currentPage=1&paramsJson=${formJson}`)
                .subscribe(
                    (response) => {
                        console.log(response)
                        let resposta = response['alunos']
                        this.listAlunos = Object.assign([], resposta['data'])
                        console.log(this.listAlunos)
                        this.length = resposta['totalItemsInDatabase']

                        if (this.listAlunos.length == 0) {
                            // console.log("lengt zero")
                            this.mensagem = "Sua pesquisa não encontrou nenhum registro correspondente"
                            this.showMessageNoAluno = true
                        }

                    },
                    (err) => {
                        //this.showSpinnerFirst = false
                        console.log(err)
                        //this.openSnackBar(err)

                    },
                    () => {
                        //this.showSpinnerFirst = false
                        this.showMessageNoAluno = false
                        console.log('ok get');
                        //this.pageIndexNumber = (evento.pageIndex * this.pageSize)
                    },
                )
        }

    }   

    openInfoFinanc(aluno: any): void {
        const dialogRef = this._modal
            .open(InfoFinancComponent, {
                height: '580px',
                width: '1000px',

                data: { aluno: aluno },
                hasBackdrop: true,
                disableClose: true
            });

        dialogRef.afterClosed().subscribe(result => {

        });
    }

    openReparcelamentoModal(aluno: any): void {
        const dialogRef = this._modal
            .open(ReparcelamentoComponent, {
                height: 'auto',
                width: '1000px',
                autoFocus: false,
                maxHeight: '90vh',

                data: { aluno: aluno },
                hasBackdrop: true,
                disableClose: true
            });

        dialogRef.afterClosed().subscribe(result => {

        });
    }

}


export interface IPager {
    itemsPerPage?: number;
    totalItemsInDatabase?: number;
    currentPage?: number;
    totalPages?: number;
    items?: number;
}

export class Parametros {
    constructor(
        public nome?: string,
        public email?: string,
        public cpf?: string) { }
}

function InfoFinancModal(InfoFinancModal: any, arg1: { height: string; width: string; data: { aluno: Aluno; }; hasBackdrop: true; disableClose: true; }) {
    throw new Error("Function not implemented.");
}
