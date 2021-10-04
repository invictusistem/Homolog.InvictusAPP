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
import { Fornecedor } from "../FinanceiroModels/fornecedor.model";
import { FornecedorCompraComponent } from "./cadastrocompra/fornecedorcadcompra.component";
import { FornecedorVendaComponent } from "./cadastrovenda/fornecedorcadvenda.component";
import { CreateFornecedorComponent } from "./createfornecedor/createfornecedor.component";
import { EditFornecedorComponent } from "./editfornecedor/editfornecedor.component";

@Component({
    selector: "fornecedores-app",
    templateUrl: './fornecedores.component.html',
    styleUrls: ['./fornecedores.component.scss'],
    animations: [HighlightTrigger]
})

export class FornecedoresComponent implements OnInit {

    baseUrl = environment.baseUrl;
    // length: number = 0
    // pageSize: number = 5;
    // pageEvent: PageEvent;
    // pageIndexNumber: number = 0;
    // actualPage = 1
    // paginationInfo: IPager;

    // formSubmitted: boolean = false;
    // showTable: boolean = false;
    showSpinner = false
    public fornecedores: Fornecedor[] = new Array<Fornecedor>();
    // showSpinnerFirst = false

    // showMessage: boolean = false;
    // cargos = Cargos;
    // unidades = Unidades
    showMessageNoColaborador = false
    mensagem: string = "";
    //public fornecedores: any;

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



    pesquisar(nome: string, email: string, cpf: string) {

        //this.openConferencia();
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

        this.chooseSearch = nome

        this._http.get(`${this.baseUrl}/adm/fornecedor/?query={"nome":"${nome}","email":"${email}","cpf":"${cpf}"}`)
            .subscribe(response => {
                console.log(response)
                this.fornecedores = Object.assign([], response);
            },
                (err) => { console.log(err) },
                () => {

                    //this.pageIndexNumber = (evento.pageIndex * this.pageSize)
                },
            )

    }


    openCreateFornecedorModal(): void {
        const dialogRef = this._modal
            .open(CreateFornecedorComponent, {
                height: 'auto',
                width: '1030px',
                autoFocus: false,
                maxHeight: '90vh',
                maxWidth: '400vh',

                data: { Hello: "Hello World" },
                hasBackdrop: true,
                disableClose: true
            });


        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "Ok") {
                // Reset form here
                console.log('afte close ok')
                //this.getColaboradores(1, this.pageSize);
            } else if (data.clicked === "Cancel") {
                // Do nothing. Cancel any events that navigate away from the
                // component.
            }
        });
    }
    chooseSearch = ""
    openEditUserModal(fornecedor: Fornecedor): void {
        const dialogRef = this._modal
            .open(EditFornecedorComponent, {
                height: 'auto',
                width: '1030px',
                autoFocus: false,
                maxHeight: '90vh',
                maxWidth: '400vh',

                data: { fornecedor: fornecedor },
                hasBackdrop: true,
                disableClose: true
            });


        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "Ok") {
                // Reset form here
                console.log('afte close ok')
                console.log(this.chooseSearch)
                //this.getColaboradores(1, this.pageSize);
            } else if (data.clicked === "Cancel") {
                // Do nothing. Cancel any events that navigate away from the
                // component.
            }
        });
    }

    openFornecedorVenda(fornecedor: Fornecedor): void {
        const dialogRef = this._modal
            .open(FornecedorVendaComponent, {
                height: 'auto',
                width: '600px',
                autoFocus: false,
                maxHeight: '90vh',
                maxWidth: '400vh',

                data: { fornecedor: fornecedor },
                hasBackdrop: true,
                disableClose: true
            });


        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "Ok") {
                // Reset form here
                console.log('afte close ok')
                console.log(this.chooseSearch)
                //this.getColaboradores(1, this.pageSize);
            } else if (data.clicked === "Cancel") {
                // Do nothing. Cancel any events that navigate away from the
                // component.
            }
        });
    }

    openFornecedorCompra(fornecedor: Fornecedor): void {
        const dialogRef = this._modal
            .open(FornecedorCompraComponent, {
                height: 'auto',
                width: '600px',
                autoFocus: false,
                maxHeight: '90vh',
                maxWidth: '400vh',

                data: { fornecedor: fornecedor },
                hasBackdrop: true,
                disableClose: true
            });


        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "Ok") {
                // Reset form here
                console.log('afte close ok')
                console.log(this.chooseSearch)
                //this.getColaboradores(1, this.pageSize);
            } else if (data.clicked === "Cancel") {
                // Do nothing. Cancel any events that navigate away from the
                // component.
            }
        });
    }
    deleteColaborador() { }

}
