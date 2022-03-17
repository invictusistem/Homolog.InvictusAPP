import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { Colaborador } from "src/app/_shared/models/colaborador.model";
import { Cargos, Unidades } from "src/app/_shared/models/perfil.model";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { environment } from "src/environments/environment";
import { Fornecedor } from "../FinanceiroModels/fornecedor.model";
import { FinanceiroService } from "../models/financ.service";
import { CreateFornecedorModal, EditFornecedorModal } from "../models/model.config";
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

    //baseUrl = environment.baseUrl;
    @ViewChild(MatPaginator) paginator: MatPaginator
    public  length: number = 0
    public pageSize: number = 5;
    // pageEvent: PageEvent;
    public pageIndexNumber: number = 0;
    private currentPage = 1
    

    // formSubmitted: boolean = false;
    // showTable: boolean = false;
    public spinnerSearch = 'hidden'
    //showSpinner = false
    public fornecedores: any[] = new Array<any>();
    // showSpinnerFirst = false

    // showMessage: boolean = false;
    // cargos = Cargos;
    // unidades = Unidades
    public showMessageNoData = false
    public mensagem: string = "";
    //public fornecedores: any;
    public pesquisarForm: FormGroup
    public tokenInfo: TokenInfos = new TokenInfos();
    private jwtHelper = new JwtHelperService();

    //pagination


    constructor(
       // private _http: HttpClient,
        private _fb: FormBuilder,
        private _finService: FinanceiroService,
        private _modal: MatDialog
        //private EditColaboradoresModal: MatDialog
    ) { 
        this.pesquisarForm = _fb.group({
            nome: ['', [Validators.required]],
            email: ['', [Validators.required]],
            cpf: ['', [Validators.required]],
            ativo: [false]
        });

        this.pesquisarForm.valueChanges.subscribe(
            (form: any) => {

                if (this.pesquisarForm.get('nome').value == '' &&
                    this.pesquisarForm.get('email').value == '' &&
                    this.pesquisarForm.get('cpf').value == '') {

                    this.pesquisarForm.controls['nome'].setErrors({ required: true });
                    this.pesquisarForm.controls['email'].setErrors({ required: true });
                    this.pesquisarForm.controls['cpf'].setErrors({ required: true });
                } else {
                    this.pesquisarForm.controls['nome'].setErrors(null);

                    this.pesquisarForm.controls['email'].setErrors(null)

                    this.pesquisarForm.controls['cpf'].setErrors(null);
                }
            }
        );
    }

    ngOnInit() {

    }



    public Pesquisar(event?: any) {

        this.showMessageNoData = false

        if (this.pesquisarForm.valid) {
            this.spinnerSearch = 'visible'

            if (event != undefined) {
                this.currentPage = event.pageIndex + 1
            } else {
                this.currentPage = 1
            }

            this._finService.GetFornecedores(this.pageSize, this.currentPage, this.pesquisarForm.value)
                .subscribe(
                    sucesso => { this.processarSucesso(sucesso, event) },
                    falha => { this.processarFalha(falha) }
                );
        }

    }

    processarSucesso(response: any, event?: any) {
       // console.log(response)
       // console.log()
        this.fornecedores = Object.assign([], response['data']);

        this.length = response['totalItemsInDatabase']

        this.spinnerSearch = 'hidden'
        if (event != undefined) {
            this.pageIndexNumber = (event.pageIndex * this.pageSize)
        } else {
            this.pageIndexNumber = 0
            //console.log(this.paginator)
            if (this.paginator != undefined) {
                this.paginator.firstPage();
            }
        }

    }

    processarFalha(fail: any) {

        if (fail['status'] == 404) {
            this.mensagem = "Sua pesquisa não encontrou nenhum registro correspondente"
            this.showMessageNoData = true
            this.fornecedores = new Array<any>();
        }
        if (fail['status'] != 404) {
            this.mensagem = "Ocorreu um erro desconhecido, por favor, procure o administrador do sistema"
            this.showMessageNoData = true
            this.fornecedores = new Array<any>();
        }

        this.spinnerSearch = 'hidden'
    }


    openCreateFornecedorModal(): void {
        const dialogRef = this._modal
            .open(CreateFornecedorComponent, CreateFornecedorModal());
        dialogRef.afterClosed().subscribe((data) => {

        });
    }

    OpenEditFornecedorModal(fornecedor): void {
        const dialogRef = this._modal
            .open(EditFornecedorComponent, EditFornecedorModal(fornecedor.id));
        dialogRef.afterClosed().subscribe((data) => {

        });
    }
    
    // openCreateFornecedorModal(): void {
    //     const dialogRef = this._modal
    //         .open(CreateFornecedorComponent, {
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
    chooseSearch = ""
    // openEditUserModal(fornecedor: Fornecedor): void {
    //     const dialogRef = this._modal
    //         .open(EditFornecedorComponent, {
    //             height: 'auto',
    //             width: '1030px',
    //             autoFocus: false,
    //             maxHeight: '90vh',
    //             maxWidth: '400vh',

    //             data: { fornecedor: fornecedor },
    //             hasBackdrop: true,
    //             disableClose: true
    //         });


    //     dialogRef.afterClosed().subscribe((data) => {
    //         if (data.clicked === "Ok") {
    //             // Reset form here
    //             console.log('afte close ok')
    //             console.log(this.chooseSearch)
    //             //this.getColaboradores(1, this.pageSize);
    //         } else if (data.clicked === "Cancel") {
    //             // Do nothing. Cancel any events that navigate away from the
    //             // component.
    //         }
    //     });
    // }

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
               // console.log('afte close ok')
             //   console.log(this.chooseSearch)
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
                //console.log('afte close ok')
               // console.log(this.chooseSearch)
                //this.getColaboradores(1, this.pageSize);
            } else if (data.clicked === "Cancel") {
                // Do nothing. Cancel any events that navigate away from the
                // component.
            }
        });
    }
    deleteColaborador() { }

}
