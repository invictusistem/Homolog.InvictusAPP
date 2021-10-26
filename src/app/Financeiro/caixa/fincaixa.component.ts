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
import { BalancoProdutos } from "../FinanceiroModels/balancoproduto.model";
import { CaixaDiarioComponent } from "./caixadiario/caixadiario.component";
import { VendaCaixaComponent } from "./venda/vendacaixa.component";
import { VendaUnidadeComponent } from "./vendaUnidade/vendaunidade.component";

@Component({
    selector: "fincaixa-app",
    templateUrl: './fincaixa.component.html',
    styleUrls: ['./fincaixa.component.scss'],
    animations: [HighlightTrigger]
})

export class FinCaixaComponent implements OnInit {

    baseUrl = environment.baseUrl;
    showMessageNoColaborador = false
    mensagem: string = "";

    public tokenInfo: TokenInfos = new TokenInfos();
    private jwtHelper = new JwtHelperService();
    //public debitos: Debito[] = new Array<Debito>()
    public balancoProdutos: BalancoProdutos[] = new Array<BalancoProdutos>();
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

    }

    totalVendas: number;
    pesquisarData(){
        
        console.log(this.range.value["end"])

        console.log(this.range.value["end"])

        this._http.get(`${this.baseUrl}/financeiro/produtos-venda/?start=${new Date(this.range.value["start"]).toLocaleString()}&end=${new Date(this.range.value["end"]).toLocaleString()}`)
            .subscribe(resp => {
                console.log(resp['vendas'])
                console.log(resp['total'])
                this.totalVendas = resp['total']
                this.balancoProdutos = Object.assign([], resp['vendas']);
            },
                (error) => { console.log(error) },
                () => { })


    }
    submitSearch(form:any) {
        console.log(this.range)
    }

    


    openCaixaModal(): void {
        const dialogRef = this._modal
            .open(VendaCaixaComponent, {
                height: 'auto',
                width: '900px',
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

    openVendaUnidades(): void {
        const dialogRef = this._modal
            .open(VendaUnidadeComponent, {
                height: 'auto',
                width: '900px',
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

    openCaixaDiario(): void {
        const dialogRef = this._modal
            .open(CaixaDiarioComponent, {
                height: 'auto',
                width: '900px',
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

}
