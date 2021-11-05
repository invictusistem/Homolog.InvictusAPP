import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Parametros } from "src/app/Adm/Colaboradores/colaboradores.component";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { Aluno } from "src/app/_shared/models/aluno.model";
import { Colaborador } from "src/app/_shared/models/colaborador.model";
import { environment } from "src/environments/environment";
import { VerEstagiosComponent } from "./estagio-list/estagio-list.component";
import { LiberarEstagioComponent } from "./liberar-estagio/liberarestagio.component";



@Component({
    selector: "estagioalunos-app",
    templateUrl: './estagioalunos.component.html',
    styleUrls: ['./estagioalunos.component.scss'],
    animations: [HighlightTrigger]
})

export class EstagioAlunosListComponent implements OnInit {


    // colaboradores: Colaborador[] = new Array<Colaborador>();
    baseUrl = environment.baseUrl;
    showMessageNoAluno = false
    length: number = 0
    mensagem: string = "";
    // length: number;
    pageSize: number = 5;
    // pageEvent: PageEvent;
    // pageIndexNumber: number = 0;
    // formSubmitted: boolean = false;
    // showTable: boolean = false;
    // paginationInfo: IPager;
    // showMessage: boolean = false;


    public pesquisarForm: FormGroup

    constructor(
        private _snackBar: MatSnackBar,
        private _modal: MatDialog,
        private _fb: FormBuilder,
        private _http: HttpClient
    ) {
        this.pesquisarForm = _fb.group({
            nome: ['', [Validators.required]],
            email: ['', [Validators.required]],
            cpf: ['', [Validators.required]],
            ativo: [false],
            todasUnidades: [false],
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
        console.log('init matricula')
        //this.getColaboradores(1, this.pageSize);
    }
    // pageIndex = 0


    getColaboradores(actualPage: number, pageSize: number) {

    }

    clicar(evento: any) {

    }

    paginationChange(pageEvt: PageEvent) {
        console.log(pageEvt)

    }

    liberarEstagioModal(item): void {
        const dialogRef = this._modal
            .open(LiberarEstagioComponent, {
                height: 'auto',
                width: '1000px',
                autoFocus: false,
                maxHeight: '90vh',
                data: { Hello: "Hello World" },
                hasBackdrop: true,
                disableClose: true
            });


        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "Ok") {

            } else if (data.clicked === "Cancel") {

            }
        });
    }

    verEstagiosModal(item): void {
        const dialogRef = this._modal
            .open(VerEstagiosComponent, {
                height: 'auto',
                width: '1000px',
                autoFocus: false,
                maxHeight: '90vh',
                data: { Hello: "Hello World" },
                hasBackdrop: true,
                disableClose: true
            });


        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "Ok") {

            } else if (data.clicked === "Cancel") {

            }
        });
    }


    params: Parametros = new Parametros()
    listAlunos: Aluno[] = new Array<Aluno>();
    onSubmit(form?: any, event?: any) {

        this.showMessageNoAluno = false
        var formJson = JSON.stringify(this.pesquisarForm.value)

        if (this.pesquisarForm.valid) {
            this._http.get(`${this.baseUrl}/matricula/alunos/?itemsPerPage=` + this.pageSize + `&currentPage=1&paramsJson=${formJson}`)
                .subscribe(
                    (response) => {
                        console.log(response)
                        this.listAlunos = Object.assign([], response['data'])

                        this.length = response['totalItemsInDatabase']

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

    consulta(nome: string) {

        if (nome == "") {
            // TODO: sendo form alert: selecionar ao menos um
            return;
        }

        this._http.get(`${this.baseUrl}/matricula/alunos/?email=&cpf=&nome=${nome}`)
            .subscribe(response => {

                console.log(response)
                this.listAlunos = Object.assign([], response)

            }, err => { console.log(err) },
                () => {

                });
    }







    openSnackBar() {
        this._snackBar.open('Aluno matriculado com sucesso', '', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'green-snackbar',
            duration: 3 * 1000,
        });
    }

    deleteColaborador(id: number) {


    }

}


export interface IPager {
    itemsPerPage?: number;
    totalItemsInDatabase?: number;
    currentPage?: number;
    totalPages?: number;
    items?: number;
}

function InfoComponent(InfoComponent: any, arg1: { height: string; width: string; autoFocus: false; maxHeight: string; data: { Hello: string; }; hasBackdrop: true; disableClose: true; }) {
    throw new Error("Function not implemented.");
}
