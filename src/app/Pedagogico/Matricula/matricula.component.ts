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
import { BoletimAlunoComponent } from "./BoletimAluno/boletimaluno.component";
import { CreateMatriculaComponent } from "./CreateModal/creatematricula.component";
import { InfoCadastraisComponent } from "./InfoCad/info-cadastrais.component";
import { InfoFinancPedagComponent } from "./infoFinancas/infofinanc.component";
import { InfosComponent } from "./informacoes/infos.component";
import { AlunoMatriculaComponent } from "./matricula/alunomatricula.component";


@Component({
    selector: "matricula-app",
    templateUrl: './matricula.component.html',
    styleUrls: ['./matricula.component.scss'],
    animations: [HighlightTrigger]
})

export class MatriculaComponent implements OnInit {


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
        private CreateMatriculaModal: MatDialog,
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


    params: Parametros = new Parametros()
    listAlunos: Aluno[] = new Array<Aluno>();
    pesquisar(form?: any, event?: any) {

        this.showMessageNoAluno = false
        var formJson = JSON.stringify(this.pesquisarForm.value)

        if (this.pesquisarForm.valid) {
            this.listAlunos = new Array<Aluno>();

            this._http.get(`${this.baseUrl}/alunos/pesquisar/?itemsPerPage=` + this.pageSize + `&currentPage=1&paramsJson=${formJson}`)
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
                        this.showMessageNoAluno = false
                        console.log('ok get');
                    },
                )
        }
    }



    matricular(aluno) {
        const dialogRef = this.CreateMatriculaModal
            .open(AlunoMatriculaComponent, {
                minHeight: '610px',
                width: '1000px',
               // autoFocus: false,
                //maxHeight: '400vh',

                data: { aluno: aluno },
                hasBackdrop: true,
                disableClose: true
            });

        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "Ok") {
                //clicked: "Ok"
                this.openSnackBar()
                this.pesquisar();
                console.log('afte close ok')
            } else if (data.clicked === "Cancel") {
                // Do nothing. Cancel any events that navigate away from the
                // component.
            }
        });

    }

    viewInfoCadastrais(aluno): void {
        const dialogRef = this.CreateMatriculaModal
            .open(InfoCadastraisComponent, {
                height: 'auto',
                width: '1000px',
                autoFocus: false,
                maxHeight: '400vhvh',

                data: { aluno: aluno },
                hasBackdrop: true,
                disableClose: true
            });

        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "OK") {
               this.pesquisar();
                console.log(JSON.stringify(this.pesquisarForm.value))
            } else if (data.clicked === "Cancel") {
                // Do nothing. Cancel any events that navigate away from the
                // component.
            }
        });
    }

    openMatriculaModal(): void {
        const dialogRef = this.CreateMatriculaModal
            .open(CreateMatriculaComponent, {
                height: '90vh',
                width: '1000px',
                autoFocus: false,
                maxHeight: '400vhvh',

                data: { Hello: "Hello World" },
                hasBackdrop: true,
                disableClose: true
            });

        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "OK") {
                this.openSnackBar()
                console.log('afte close ok')
            } else if (data.clicked === "Cancel") {
                // Do nothing. Cancel any events that navigate away from the
                // component.
            }
        });
    }

    openInfoModal(aluno: Aluno): void {
        const dialogRef = this.CreateMatriculaModal
            .open(InfosComponent, {
                height: '90vh',
                width: '1000px',
                autoFocus: false,
                // maxHeight: '90vh',

                data: { aluno: aluno },
                hasBackdrop: true,
                disableClose: true
            });

        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "OK") {
                this.openSnackBar()
                console.log('afte close ok')
            } else if (data.clicked === "Cancel") {
                // Do nothing. Cancel any events that navigate away from the
                // component.
            }
        });
    }

    openInfoFinancModal(aluno: Aluno): void {
        const dialogRef = this.CreateMatriculaModal
            .open(InfoFinancPedagComponent, {
                height: '90vh',
                width: '1000px',
                autoFocus: false,


                data: { aluno: aluno },
                hasBackdrop: true,
                disableClose: true
            });

        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "OK") {
                this.openSnackBar()
                console.log('afte close ok')
            } else if (data.clicked === "Cancel") {

            }
        });
    }

    openBoletimodal(aluno: Aluno): void {
        const dialogRef = this.CreateMatriculaModal
            .open(BoletimAlunoComponent, {
                height: '90vh',
                width: '1000px',
                autoFocus: false,


                data: { aluno: aluno },
                hasBackdrop: true,
                disableClose: true
            });

        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "OK") {
                this.openSnackBar()
                console.log('afte close ok')
            } else if (data.clicked === "Cancel") {

            }
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
