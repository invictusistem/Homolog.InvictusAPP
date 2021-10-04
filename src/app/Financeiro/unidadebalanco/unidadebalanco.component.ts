import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { Colaborador } from "src/app/_shared/models/colaborador.model";
import { Debito } from "src/app/_shared/models/InfoFinanceiras.model";
import { Cargos, Unidades } from "src/app/_shared/models/perfil.model";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { environment } from "src/environments/environment";



@Component({
    selector: "unidadebalanco-app",
    templateUrl: './unidadebalanco.component.html',
    //styleUrls: ['./colaboradores.component.scss'],
    animations: [HighlightTrigger]
})

export class UnidadeBalancoComponent implements OnInit {


    //colaboradores: Colaborador[] = new Array<Colaborador>();
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

    public tokenInfo: TokenInfos = new TokenInfos();
    private jwtHelper = new JwtHelperService();
    public debitos: Debito[] = new Array<Debito>()
    //pagination
    range = new FormGroup({
        start: new FormControl(),
        end: new FormControl()
    });

    constructor(
        private _http: HttpClient,
        private _modal: MatDialog
        //private EditColaboradoresModal: MatDialog
    ) { }
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

    totalVendas: number
    pesquisarData() {

        console.log(this.range.value["end"])

        console.log(this.range.value["end"])

        this._http.get(`${this.baseUrl}/financeiro/cursos-buscar/?start=${new Date(this.range.value["start"]).toLocaleString()}&end=${new Date(this.range.value["end"]).toLocaleString()}`)
            .subscribe(resp => {
                console.log(resp)

                this.totalVendas =resp['total']

                this.debitos = Object.assign([], resp['vendas'])
            },
                (error) => { console.log(error) },
                () => { 

                    if(this.debitos.length > 0){

                    }else{
                        this.showMessageNoColaborador = true
                    }

                })
    }
    // pageIndex = 0
    // get page() {
    //     return console.log('page')
    // }


    // getColaboradores(actualPage: number, pageSize: number) {

    //     var itemsPerPage = pageSize;
    //     var currentPage = actualPage;

    //     this.http.get(`${this.baseUrl}/colaboradores/?itemsPerPage=` + itemsPerPage + `&currentPage=` + currentPage, {
    //         //this.http.post("http://api.invictustemp.com.thor.hostazul.com.br/api/identity/login", credentials, {

    //         // headers: new HttpHeaders({
    //         //     "Content-Type": "application/json",
    //         //     "Authorization": "Bear "
    //         // })
    //     }).subscribe(response => {

    //         console.log(response)
    //         this.colaboradores = Object.assign([], response['data'])
    //         this.length = response['totalItemsInDatabase']
    //         console.log(this.length)
    //         console.log(this.colaboradores)
    //         // this.dialogRef.close();
    //     }, err => { console.log(err) },
    //         () => { });

    // }


    // params: Parametros = new Parametros()

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

    // openConferencia(): void {
    //     const dialogRef = this._modal
    //         .open(ConferenciaComponent, {
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
               
    //             console.log('afte close ok')
               
    //         } else if (data.clicked === "Cancel") {
               
    //         }
    //     });
    // }

    openEditUserModal(item: Colaborador): void {
        // const dialogRef = this._modal
        //     .open(EditColaboradoresComponent, {
        //         height: '580px',
        //         width: '800px',

        //         data: { colaborador: item },
        //         hasBackdrop: true,
        //         disableClose: true
        //     });

        // dialogRef.afterClosed().subscribe(result => {

        // });
    }

    deleteColaborador(id: number) {

        //     this._http.delete(`${this.baseUrl}/colaboradores/${id}`, {
        //         //this.http.post("http://api.invictustemp.com.thor.hostazul.com.br/api/identity/login", credentials, {

        //         headers: new HttpHeaders({
        //             "Content-Type": "application/json",
        //             "Authorization": "Bear "
        //         })
        //     }).subscribe(response => {

        //         console.log(response)

        //     }, err => { 
        //         console.log(err) 
        //     },
        //         () => { });

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