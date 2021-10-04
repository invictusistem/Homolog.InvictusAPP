import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { Colaborador } from "src/app/_shared/models/colaborador.model";
import { Cargos, Unidades } from "src/app/_shared/models/perfil.model";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { environment } from "src/environments/environment";

@Component({
    selector: "finrelatorio.component-app",
    templateUrl: './fin-relatorio.component.html',
    styleUrls: ['./fin-relatorio.component.scss'],
    animations: [HighlightTrigger]
})

export class FinRelatorioComponent implements OnInit {

    baseUrl = environment.baseUrl;
    // length: number = 0
    // pageSize: number = 5;
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
    public fornecedores: any;

    public tokenInfo: TokenInfos = new TokenInfos();
    private jwtHelper = new JwtHelperService();

    //pagination


    constructor(
        private _http: HttpClient,
        private _modal: MatDialog
        //private EditColaboradoresModal: MatDialog
    ) { }
    ngOnInit() {

    }



    pesquisar(nome: string, cargo: string, unidade: string) {

        //this.openConferencia();
        // console.log(nome + " " + cargo + " " + unidade)
        // if (nome == "" || nome == undefined) nome = ""
        // if (cargo == "" || cargo == undefined) cargo = ""
        // if (unidade == "" || unidade == undefined) unidade = ""

        // if ((nome == "" || nome == undefined) &&
        //     (cargo == "" || cargo == undefined) &&
        //     (unidade == "" || unidade == undefined)) {
        //     console.log("retorno")
        //     return;
        // }
        // this.showMessageNoColaborador = false
        // this.mensagem = ""

        // let query = { nome: nome, cargo: cargo, unidade: unidade }
        // this.params.nome = nome
        // this.params.email = cargo
        // this.params.cpf = unidade
        // //console.log(params)
        // //var itemsPerPage = 5;
        // //this.actualPage
        // //var currentPage = 1;
        // this.showSpinnerFirst = true
        // this.colaboradores = new Array<Colaborador>();
        // let paramsJson = JSON.stringify(this.params)
        // console.log(query)

        // this.http.post(`${this.baseUrl}/colaboradores/pesquisar/?itemsPerPage=` + this.pageSize + `&currentPage=1`, paramsJson, {
        //     headers: new HttpHeaders({
        //         "Content-Type": "application/json",
        //         "Authorization": `Bearer ${localStorage.getItem('jwt')}`
        //     })
        // }).subscribe(
        //     (response) => {
        //         console.log(response)
        //         this.colaboradores = Object.assign([], response['data']);
        //         //  this.length = tasks['data'].length;
        //         this.length = response['totalItemsInDatabase']
        //         if (this.length == 0) {
        //             this.showMessageNoColaborador = true
        //             this.mensagem = "Registro não localizado."
        //         }
        //         else if (this.colaboradores.length == 0) {
        //             console.log("lengt zero")
        //             this.mensagem = "Sua pesquisa não encontrou nenhum registro correspondente"
        //             this.showMessageNoColaborador = true
        //         }
        //         // this.applyFiler()
        //     },
        //     (err) => {
        //         this.showSpinnerFirst = false
        //         console.log(err)
        //         //this.openSnackBar(err)

        //     },
        //     () => {
        //         this.showSpinnerFirst = false
        //         console.log('ok get');
        //         //this.pageIndexNumber = (evento.pageIndex * this.pageSize)
        //     },
        // )

    }


    // openCreateFornecedorModal(): void {
    //     const dialogRef = this._modal
    //         .open(CreateFornecedoromponent, {
    //             height: 'auto',
    //             width: '1030px',
    //             autoFocus: false,
    //             maxHeight: '90vh',
    //             maxWidth: '400vh',

    //             data: { Hello: "Hello World" },
    //             hasBackdrop: true,
    //             disableClose: true
    //         });


    //     dialogRef.afterClosed().subscribe((data) => {
    //         if (data.clicked === "Ok") {
    //             // Reset form here
    //             console.log('afte close ok')
    //             //this.getColaboradores(1, this.pageSize);
    //         } else if (data.clicked === "Cancel") {
    //             // Do nothing. Cancel any events that navigate away from the
    //             // component.
    //         }
    //     });
    // }   

    openEditUserModal() { }
    deleteColaborador() { }

}
