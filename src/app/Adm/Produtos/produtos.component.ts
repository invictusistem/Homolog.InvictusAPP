import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Produto } from "src/app/_shared/models/produto.model";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { environment } from "src/environments/environment";
import { ProdutoCreateComponent } from "./produto-create/produto-create.component";
import { ProdutoEditComponent } from "./produto-edit/produto-edit.component";

@Component({
    selector: "produtos-app",
    templateUrl: './produtos.component.html',
    styleUrls: ['./produtos.component.scss']
})

export class ProdutosComponent implements OnInit {

    private baseUrl = environment.baseUrl;
    public produtos: any[];//Produto[] = new Array<Produto>();
    public tokenInfo: TokenInfos = new TokenInfos();
    private jwtHelper = new JwtHelperService();

    constructor(
        private _http: HttpClient,
        private _modal: MatDialog
    ) { }

    ngOnInit() {
        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)

        this.GetProdutos();
    }

    GetProdutos(){

        this._http.get(`${this.baseUrl}/financeiro/produtos`)
        .subscribe(resp => {
            this.produtos = Object.assign([], resp)
            console.log(this.produtos)
        }, (error) => { console.log(error) })

    }

    pesquisar(nome: string, cargo: string, unidade: string) {


    }


    openCreateProdutoModal(): void {
        const dialogRef = this._modal
            .open(ProdutoCreateComponent, {
                height: 'auto',
                width: '600px',

                data: { Hello: "Hello World" },
                hasBackdrop: true,
                disableClose: true
            });       

        dialogRef.afterClosed().subscribe(result => {
            if (result.clicked === "Ok") {

                this.GetProdutos();
               
            } else if (result.clicked === "Cancel") {
               
            }
        });
    }

    openEditProdutoModal(produto: Produto): void {
        const dialogRef = this._modal
            .open(ProdutoEditComponent, {
                height: 'auto',
                width: '600px',

                data: { produto: produto },
                hasBackdrop: true,
                disableClose: true
            });
        

        dialogRef.afterClosed().subscribe(result => {
            if (result.clicked === "Ok") {

                this.GetProdutos();
               
            } else if (result.clicked === "Cancel") {
               
            }
        });
    }


}