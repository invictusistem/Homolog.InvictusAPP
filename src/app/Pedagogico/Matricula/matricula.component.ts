import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Parametros } from "src/app/Adm/Colaboradores/colaboradores.component";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { Aluno } from "src/app/_shared/models/aluno.model";
import { Colaborador } from "src/app/_shared/models/colaborador.model";
import { environment } from "src/environments/environment";
import { InfoFinancComponentModal, OpenInfoComponentModal } from "../service/modal.config";
import { PedagogicoService } from "../service/pedagogico.service";
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

    baseUrl = environment.baseUrl

    showMessageNoAluno = false
    length: number = 0
    mensagem: string = "";
    // length: number;
    pageSize: number = 5;
    pageEvent: PageEvent;
    pageIndexNumber: number = 0;
    currentPage = 1
    // formSubmitted: boolean = false;
    // showTable: boolean = false;
    // paginationInfo: IPager;
    // showMessage: boolean = false;
    spinnerSearch = false
    params: Parametros = new Parametros()
    listAlunos: any[] = new Array<any>();

    public pesquisarForm: FormGroup

    public testeForm: FormGroup

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        //private _snackBar: MatSnackBar,
        private _pedagService: PedagogicoService,
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

        this.testeForm = _fb.group({
            nome: ['', [Validators.required]],
            child: this._fb.group({
                nome: ['', [Validators.required]]
            })
        });

    }

    get disabledTest() {

        return !this.testeForm.valid

    }

    salvarTeste(){

        this._http.post(`${this.baseUrl}/teste/salvarteste`, this.testeForm.value , {})
        .subscribe(resp => {

        },
        (error) => { })
    }
    ngOnInit() {
        console.log('init matricula')
        this.testeForm.get('child').disable()
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



    pesquisar(event?: any) {


        this.showMessageNoAluno = false

        if (this.pesquisarForm.valid) {
            this.spinnerSearch = true

            if (event != undefined) {
                this.currentPage = event.pageIndex + 1
            } else {
                this.currentPage = 1
            }


            this._pedagService.getAlunos(this.pageSize, this.currentPage, this.pesquisarForm.value)
                .subscribe(
                    sucesso => { this.processarSucesso(sucesso, event) },
                    falha => { this.processarFalha(falha) }
                );
        }
    }

    processarSucesso(response: any, event?: any) {

        this.listAlunos = Object.assign([], response['data']);

        this.length = response['totalItemsInDatabase']

        this.spinnerSearch = false
        if (event != undefined) {
            this.pageIndexNumber = (event.pageIndex * this.pageSize)
        } else {
            this.pageIndexNumber = 0

            this.paginator.firstPage();
        }

    }

    processarFalha(fail: any) {

        if (fail['status'] == 404) {
            this.mensagem = "Sua pesquisa não encontrou nenhum registro correspondente"
            this.showMessageNoAluno = true
            this.listAlunos = new Array<any>();
        }
        if (fail['status'] != 404) {
            this.mensagem = "Ocorreu um erro desconhecido, por favor, procure o administrador do sistema"
            this.showMessageNoAluno = true
            this.listAlunos = new Array<any>();
        }

        this.spinnerSearch = false
    }

    matricular(aluno) {
        const dialogRef = this._modal
            .open(AlunoMatriculaComponent, {
                // minHeight: '610px',
                width: '850px',
                // autoFocus: false,
                //maxHeight: '400vh',

                data: { aluno: aluno },
                hasBackdrop: true,
                disableClose: true
            });

        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "Ok") {
                //clicked: "Ok"
                //  this.openSnackBar()
                this.pesquisar();
                console.log('afte close ok')
            } else if (data.clicked === "Cancel") {
                // Do nothing. Cancel any events that navigate away from the
                // component.
            }
        });

    }

    viewInfoCadastrais(aluno): void {
        const dialogRef = this._modal
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
        const dialogRef = this._modal
            .open(CreateMatriculaComponent, {
                // height: '90vh',
                width: '1000px',
                // autoFocus: false,
                // maxHeight: '400vhvh',

                data: { Hello: "Hello World" },
                hasBackdrop: true,
                disableClose: true
            });

        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "OK") {
                //this.openSnackBar()
                console.log('afte close ok')
            } else if (data.clicked === "Cancel") {
                // Do nothing. Cancel any events that navigate away from the
                // component.
            }
        });
    }


    openInfoModal(aluno): void {
        const dialogRef = this._modal
            .open(InfosComponent, OpenInfoComponentModal(aluno));
        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "OK") {
            } else if (data.clicked === "Cancel") {
            }
        });
    }

    // openInfoModal(aluno: Aluno): void {
    //     const dialogRef = this._modal
    //         .open(InfosComponent, {
    //             height: '90vh',
    //             width: '1000px',
    //             autoFocus: false,
    //             // maxHeight: '90vh',

    //             data: { aluno: aluno },
    //             hasBackdrop: true,
    //             disableClose: true
    //         });

    //     dialogRef.afterClosed().subscribe((data) => {
    //         if (data.clicked === "OK") {
    //             //this.openSnackBar()
    //             console.log('afte close ok')
    //         } else if (data.clicked === "Cancel") {
    //             // Do nothing. Cancel any events that navigate away from the
    //             // component.
    //         }
    //     });
    // }

    openInfoFinancModal(aluno: Aluno): void {
        const dialogRef = this._modal
            .open(InfoFinancPedagComponent, InfoFinancComponentModal(aluno));
        dialogRef.afterClosed().subscribe(
            data => { });


        // const dialogRef = this.CreateMatriculaModal
        //     .open(InfoFinancPedagComponent, {
        //         height: '90vh',
        //         width: '1050px',
        //         autoFocus: false,


        //         data: { aluno: aluno },
        //         hasBackdrop: true,
        //         disableClose: true
        //     });

        // dialogRef.afterClosed().subscribe((data) => {
        //     if (data.clicked === "OK") {
        //         this.openSnackBar()
        //         console.log('afte close ok')
        //     } else if (data.clicked === "Cancel") {

        //     }
        // });
    }

    openBoletimodal(aluno: Aluno): void {
        const dialogRef = this._modal
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
                // this.openSnackBar()
                console.log('afte close ok')
            } else if (data.clicked === "Cancel") {

            }
        });
    }


    // openSnackBar() {
    //     this._snackBar.open('Aluno matriculado com sucesso', '', {
    //         horizontalPosition: 'center',
    //         verticalPosition: 'top',
    //         panelClass: 'green-snackbar',
    //         duration: 3 * 1000,
    //     });
    // }

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
