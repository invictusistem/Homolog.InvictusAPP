import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { environment } from "src/environments/environment";
import { ProdutoCreateComponent } from "./create/produto-create.component";
import { ProdutoDoacaoComponent } from "./doacao/produto-doacao.component";
import { ProdutoEditComponent } from "./edit/produto-edit.component";

@Component({
    selector: "produtos-app",
    templateUrl: './produtos.component.html',
    styleUrls: ['./produtos.component.scss']
})

export class ProdutosComponent implements OnInit {

    private baseUrl = environment.baseUrl;
    public produtos: any[] = new Array<any>();
    public tokenInfo: TokenInfos = new TokenInfos();
    private jwtHelper = new JwtHelperService();

    constructor(
        private _http: HttpClient,
        private _modal: MatDialog
    ) { }

    ngOnInit() {
        const token: any = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)

        this.GetProdutos();
    }

    GetProdutos(){

        this._http.get(`${this.baseUrl}/produto`)
        .subscribe((resp:any) => {
            this.produtos = Object.assign([], resp['produtos'])
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

    openEditProdutoModal(produto: any): void {
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

    openDoacaoProdutoModal(produto: any): void{ //ProdutoDoacaoComponent
        const dialogRef = this._modal
        .open(ProdutoDoacaoComponent, {
            height: 'auto',
            width: '900px',
            autoFocus: false,
            maxHeight: '90vh',
            maxWidth: '400vh',


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