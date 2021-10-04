import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Parametros } from "src/app/Adm/Colaboradores/colaboradores.component";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { Aluno } from "src/app/_shared/models/aluno.model";
import { Colaborador } from "src/app/_shared/models/colaborador.model";
import { environment } from "src/environments/environment";


@Component({
    selector: "novamatricula-app",
    templateUrl: './novamatricula.component.html',
    styleUrls: ['./novamatricula.component.scss'],
    animations: [HighlightTrigger]
})

export class NovaMatriculaComponent implements OnInit {


    // colaboradores: Colaborador[] = new Array<Colaborador>();
    baseUrl = environment.baseUrl;
    // length: number;
    // pageSize: number = 5;
    // pageEvent: PageEvent;
    // pageIndexNumber: number = 0;
    // formSubmitted: boolean = false;
    // showTable: boolean = false;
    // paginationInfo: IPager;
    // showMessage: boolean = false;
    
    listAlunos: Aluno[] = new Array<Aluno>();

    constructor(
        private _snackBar: MatSnackBar,
        private CreateMatriculaModal: MatDialog,
        private http: HttpClient,
        //private CreateColaboradoresModal: MatDialog,
        //private EditColaboradoresModal: MatDialog
    ) { }
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
    pesquisar(nome: string, email: string, cpf: string) {

        console.log(nome + " " + email + " " + cpf)
        if (nome == "" || nome == undefined) nome = ""
        if (email == "" || email == undefined) email = ""
        if (cpf == "" || cpf == undefined) cpf = ""

        if ((nome == "" || nome == undefined) &&
            (email == "" || email == undefined) &&
            (cpf == "" || cpf == undefined)) {
            console.log("retorno")
            return;
        }

        this.http.get(`${this.baseUrl}/matricula/alunos/?query={"nome":"${nome}","email":"${email}","cpf":"${cpf}"}`)
            .subscribe(
                (response) => {
                    console.log(response)
                    this.listAlunos = Object.assign([], response)
                   
                },
                (err) => {
                    //this.showSpinnerFirst = false
                    console.log(err)
                    //this.openSnackBar(err)

                },
                () => {
                    //this.showSpinnerFirst = false
                    console.log('ok get');
                    //this.pageIndexNumber = (evento.pageIndex * this.pageSize)
                },
            )

    }

    consulta(nome: string) {

        if (nome == "") {
            // TODO: sendo form alert: selecionar ao menos um
            return;
        }

        this.http.get(`${this.baseUrl}/matricula/alunos/?email=&cpf=&nome=${nome}`)
            .subscribe(response => {

                console.log(response)
                this.listAlunos = Object.assign([], response)

            }, err => { console.log(err) },
                () => {
                   
                });
    }

    matricular(aluno){
    //     const dialogRef = this.CreateMatriculaModal
    //     .open(AlunoMatriculaComponent, {
    //         height: 'auto',
    //         width: '1000px',
    //         autoFocus: false,
    //         maxHeight: '90vh',

    //         data: { alunoId: aluno.id },
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

    openMatriculaModal(): void {
        // const dialogRef = this.CreateMatriculaModal
        //     .open(CreateMatriculaComponent, {
        //         height: 'auto',
        //         width: '1000px',
        //         autoFocus: false,
        //         maxHeight: '90vh',

        //         data: { Hello: "Hello World" },
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

    openInfoModal(aluno: Aluno): void {
        // const dialogRef = this.CreateMatriculaModal
        //     .open(InfosComponent, {
        //         height: '90vh',
        //         width: '1000px',
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
