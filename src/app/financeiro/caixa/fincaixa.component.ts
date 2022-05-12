import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HighlightTrigger } from "src/app/_shared/animation/animation";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { BaseComponent } from "src/app/_shared/services/basecomponent.component";
import { environment } from "src/environments/environment";
import { FinanceiroService } from "../services/financ.service";

@Component({
    selector: "fincaixa-app",
    templateUrl: './fincaixa.component.html',
    styleUrls: ['./fincaixa.component.scss']
})

export class FinCaixaComponent extends BaseComponent implements OnInit {
    
    mensagem: string = "";
    public pesquisarForm: FormGroup;
    public balancoProdutos: any[] = new Array<any>();
    totalVendas!: number;

    constructor(
        private _http: HttpClient,
        private _finService: FinanceiroService,
        override _snackBar: MatSnackBar,
        private _modal: MatDialog,
        private _fb: FormBuilder
    ) {
        super(_snackBar);
        this.pesquisarForm = _fb.group({
            start: ['', [Validators.required]],
            end: ['', [Validators.required]]
        });

        this.pageSize = 50;
    }


    ngOnInit() {

    }

    
    public Pesquisar(event?: any) {

        this.showMessageNotFound = false

        if (this.pesquisarForm.valid || this.tokenInfo['role'] == 'SuperAdm') {

            this.spinnerSearch = 'visible'            

            if (event != undefined) {
                this.currentPage = event.pageIndex + 1
            } else {
                this.currentPage = 1
            }

            this._finService.GetRegistrosFinanceirosDosProdutos(this.pageSize, this.currentPage, this.pesquisarForm.value)
                .subscribe(
                    sucesso => { this.ProcessarSucesso(sucesso, event) },
                    falha => { this.ProcessarFalha(falha) }
                );
        }

        return event

    }

    private ProcessarSucesso(response: any, event?: any) {

        this.balancoProdutos = Object.assign([], response['data']);

        this.length = response['totalItemsInDatabase']

        this.spinnerSearch = 'hidden'
        if (event != undefined) {
            this.pageIndexNumber = (event.pageIndex * this.pageSize)
        } else {
            this.pageIndexNumber = 0
            // console.log(this.paginator)
            if (this.paginator != undefined) {
                this.paginator.firstPage();
            }
        }
    }

    private ProcessarFalha(fail: any) {

        if (fail['status'] == 404) {
            this.mensagem = "Sua pesquisa não encontrou nenhum registro correspondente"
            this.showMessageNotFound = true
            this.balancoProdutos = new Array<any>();
        }
        if (fail['status'] != 404) {
            this.mensagem = "Ocorreu um erro desconhecido, por favor, procure o administrador do sistema"
            this.showMessageNotFound = true
            this.balancoProdutos = new Array<any>();
        }

        this.spinnerSearch = 'hidden'
    }


    openCaixaModal(): void {
        // const dialogRef = this._modal
        //     .open(VendaCaixaComponent, {
        //         height: 'auto',
        //         width: '900px',
        //         autoFocus: false,
        //         maxHeight: '90vh',
        //         maxWidth: '400vh',

        //         data: { Hello: "Hello World" },
        //         hasBackdrop: true,
        //         disableClose: true
        //     });


        // dialogRef.afterClosed().subscribe((data) => {
        //     if (data.clicked === "Ok") {

        //     } else if (data.clicked === "Cancel") {
        //     }
        // });
    }

    openVendaUnidades(): void {
        // const dialogRef = this._modal
        //     .open(VendaUnidadeComponent, {
        //         height: 'auto',
        //         width: '900px',
        //         autoFocus: false,
        //         maxHeight: '90vh',
        //         maxWidth: '400vh',

        //         data: { Hello: "Hello World" },
        //         hasBackdrop: true,
        //         disableClose: true
        //     });


        // dialogRef.afterClosed().subscribe((data) => {
        //     if (data.clicked === "Ok") {
        //     } else if (data.clicked === "Cancel") {
        //     }
        // });
    }

    openCaixaDiario(): void {
        // const dialogRef = this._modal
        //     .open(CaixaDiarioComponent, {
        //         height: 'auto',
        //         width: '900px',
        //         autoFocus: false,
        //         maxHeight: '90vh',
        //         maxWidth: '400vh',

        //         data: { Hello: "Hello World" },
        //         hasBackdrop: true,
        //         disableClose: true
        //     });


        // dialogRef.afterClosed().subscribe((data) => {
        //     if (data.clicked === "Ok") {

        //     } else if (data.clicked === "Cancel") {

        //     }
        // });
    }

}
