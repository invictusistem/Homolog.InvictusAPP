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
    //styleUrls: ['./colaboradores.component.scss'],
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
     listAlunos: Aluno[] = new Array<Aluno>();

    public tokenInfo: TokenInfos = new TokenInfos();
    private jwtHelper = new JwtHelperService();
    public pesquisarForm: FormGroup
    //pagination


    constructor(
        private _http: HttpClient,
        private _fb: FormBuilder,
        private _modal: MatDialog) 
        { 
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
        //console.log('init colaboradores 123')
        //const token = localStorage.getItem('jwt')
        // this.tokenInfo = this.jwtHelper.decodeToken(token)
        // console.log(token);
        // console.log(this.tokenInfo.Unidade);
        // console.log(this.tokenInfo.Codigo);
        // console.log(this.tokenInfo);
        //this.getColaboradores(1, this.pageSize);
    }
    
    onSubmit(form?: any, event?: any) {

       // this.showMessageNoAluno = false
        var formJson = JSON.stringify(this.pesquisarForm.value)

        if (this.pesquisarForm.valid) {
        this._http.get(`${this.baseUrl}/financeiro/alunosfin/?itemsPerPage=` + this.pageSize + `&currentPage=1&paramsJson=${formJson}`)
            .subscribe(
                (response) => {
                    console.log(response)
                    this.listAlunos = Object.assign([], response['data'])
                    console.log(this.listAlunos)
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

        this._http.get(`${this.baseUrl}/financeiro/alunosfin/?query={"nome":"${nome}","email":"${email}","cpf":"${cpf}"}`)
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

    // changePage(evento: any) {
    //     console.log(evento)
    //     console.log(this.actualPage)
    //     //if(this.actualPage)
    //     this.showSpinner = true
    //     let paramsJson = JSON.stringify(this.params)
    //     // this.getTasks(evento.pageIndex + 1, this.pageSize);
    //     this.http.post(`${this.baseUrl}/colaboradores/pesquisar/?itemsPerPage=` + this.pageSize + `&currentPage=${evento.pageIndex + 1}`, paramsJson, {
    //         headers: new HttpHeaders({
    //             "Content-Type": "application/json",
    //             "Authorization": "Bearer "
    //         })
    //     })
    //         .subscribe(
    //             (response) => {
    //                 // console.log('generictasks get')
    //                 this.colaboradores = response['data'];
    //                 //  this.length = tasks['data'].length;
    //                 this.length = response['totalItemsInDatabase']
    //                 // this.applyFiler()
    //             },
    //             (err) => {
    //                 console.log(err)
    //                 this.showSpinner = false
    //                 //this.openSnackBar(err)

    //             },
    //             () => {
    //                 console.log('ok get');
    //                 this.showSpinner = false
    //                 this.pageIndexNumber = (evento.pageIndex * this.pageSize)
    //             },
    //         )
    // }

    // paginationChange(pageEvt: PageEvent) {
    //     console.log(pageEvt)

    // }

    // openCreateUserModal(): void {
    //     const dialogRef = this.CreateColaboradoresModal
    //         .open(CreateColaboradoresComponent, {
    //             height: 'auto',
    //             width: '800px',

    //             data: { Hello: "Hello World" },
    //             hasBackdrop: true,
    //             disableClose: true
    //         });


    //     dialogRef.afterClosed().subscribe((data) => {
    //         if (data.clicked === "Ok") {
    //             // Reset form here
    //             console.log('afte close ok')
    //             this.getColaboradores(1, this.pageSize);
    //         } else if (data.clicked === "Cancel") {
    //             // Do nothing. Cancel any events that navigate away from the
    //             // component.
    //         }
    //     });
    // }

    openInfoFinanc(item: Aluno): void {
        const dialogRef = this._modal
            .open(InfoFinancComponent, {
                height: '580px',
                width: '1000px',

                data: { aluno: item },
                hasBackdrop: true,
                disableClose: true
            });

        dialogRef.afterClosed().subscribe(result => {

        });
    }

    openReparcelamentoModal(item: Aluno): void {
        const dialogRef = this._modal
            .open(ReparcelamentoComponent, {
                height: 'auto',
				width: '1000px',
				autoFocus: false,
				maxHeight: '90vh',

                data: { aluno: item },
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
