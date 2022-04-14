import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { HighlightTrigger } from "src/app/_shared/animation/animation";
import { environment } from "src/environments/environment";
import { EditCargoModalConfig } from "../services/adm-modal";
import { AdmService } from "../services/adm.service";
import { CargoCreateComponent } from "./cargo-create/cargo-create.component";
import { CargoEditComponent } from "./cargo-edit/cargo-edit.component";
import { DocTemplateComponent } from "./doc-create/doc-create.component";
import { MateriaTemplateComponent } from "./materia-create/mat-create.component";

enum Config {
    CARGOS,
    DOCUMENTOS,
    MATERIAS
}

@Component({
    selector: "configuracoes-app",
    templateUrl: './configuracoes.component.html',
    styleUrls: ['./configuracoes.component.scss'],
    animations: [HighlightTrigger]

})

export class ConfiguracoesComponent implements OnInit {

    // Materias paginated
    materiasLength: number = 0
    materiasPageSize: number = 10;
    materiasPageEvent?: PageEvent;
    materiasPageIndexNumber: number = 0;
    materiasCurrentPage = 1
    @ViewChild(MatPaginator) MateriaPaginator?: MatPaginator
    //
    public config?: Config
    public configCargos = Config.CARGOS
    private baseUrl = environment.baseUrl;
    public searchSpinner = 'hidden'
    public showCargosTable = false
    public showDocumentosTable = false
    public showMateriasTable = false
    public htmlContent: any = "weewgwegewgegergregergergerg";//any;
    public cargos: any[] = new Array<any>();
    public documentos: any[] = new Array<any>();
    public materias: any[] = new Array<any>();
    constructor(
        private _admService: AdmService,       
        private _modal: MatDialog
    ) { }


    ngOnInit() {
       
    }

   
    public GetMaterias(event?: any) {

        this.searchSpinner = 'visible'

        if (event != undefined) {
            this.materiasCurrentPage = event.pageIndex + 1
        } else {
            this.materiasCurrentPage = 1
        }

        this._admService.GetMaterias(this.materiasPageSize, this.materiasCurrentPage)
            .subscribe(
                sucesso => { this.GetMateriasSucesso(sucesso, event) },
                falha => { this.GetMateriasError(falha) }
            )

            return event
    }

    private GetMateriasSucesso(response: any, event?: any) {
        this.materias = Object.assign([], response['results'].data);

        this.materiasLength = response['results'].totalItemsInDatabase


        this.searchSpinner = 'hidden'
        if (event != undefined) {
            this.materiasPageIndexNumber = (event.pageIndex * this.materiasPageSize)
        } else {
            this.materiasPageIndexNumber = 0
          
            if (this.MateriaPaginator != undefined) {
                this.MateriaPaginator.firstPage();
            }
        }

        this.showMateriasTable = true
    }

    private GetMateriasError(fail?:any) {
        if (fail['status'] == 404) {
            // this.mensagem = "Sua pesquisa não encontrou nenhum registro correspondente"
            // this.showMessageNoColaborador = true
            this.materias = new Array<any>();
        }
        if (fail['status'] != 404) {
            // this.mensagem = "Ocorreu um erro desconhecido, por favor, procure o administrador do sistema"
            // this.showMessageNoColaborador = true
            this.materias = new Array<any>();
        }

        this.searchSpinner = 'hidden'
    }

    showTableCargos = false

    public GetConfig(config: any) {
        this.showCargosTable = false
        this.showDocumentosTable = false
        this.showMateriasTable = false
        this.searchSpinner = 'visible'
        this._admService.GetConfig(config)
            .subscribe(
                sucesso => { this.GetConfigSucess(sucesso, config) },
                falha => { this.GetConfigError(falha) }
            )
    }

    private GetConfigSucess(response?:any, config?:any) {
        this.searchSpinner = 'hidden'
        if (config == 'CARGOS') {
            this.showCargosTable = true
            this.cargos = response['values']
        }
        if (config == 'DOCUMENTOS') {
            this.showDocumentosTable = true
            this.documentos = response['docs']
        }
        if (config == 'MATERIAS') {
            this.showMateriasTable = true
            this.materias = response['results']
        }

    }

    private GetConfigError(error?:any) {
        this.searchSpinner = 'hidden'
    }


    // getCargos() {
    //     this.showTableCargos = false
    //     this._http.get(`${this.baseUrl}/unidade/cargo`)
    //         .subscribe(resp => {
    //             this.cargos = Object.assign([], resp)
    //         }, (error) => {
    //             console.log(error)
    //         },
    //             () => {
    //                 this.showTableCargos = true
    //             })
    // }

    // mensagem: any;
    // pegarMesg() {

    //     this._http.get(`${this.baseUrl}/mensagem`)
    //         .subscribe(resp => {
    //             console.log(resp)
    //             this.mensagem = resp
    //             this.htmlContent = resp
    //         }, (error) => { console.log(error) },
    //             () => {

    //             })
    // }



    getDocumentacao() {

    }

    getMaterias() {

    }

    openCreateMateriaModal(): void { 
        const dialogRef = this._modal
            .open(MateriaTemplateComponent, {
                height: 'auto',
                width: '850px',
                autoFocus: false,
                maxHeight: '90vh',
                data: { Hello: "Hello World" },
                hasBackdrop: true,
                disableClose: true
            });


        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "Ok") {

            } else if (data.clicked === "Cancel") {

            }
        });
    }

    openCreateDocModal(): void { 
        const dialogRef = this._modal
            .open(DocTemplateComponent, {
                height: 'auto',
                width: '700px',
                autoFocus: false,
                maxHeight: '90vh',
                data: { Hello: "Hello World" },
                hasBackdrop: true,
                disableClose: true
            });


        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "Ok") {

            } else if (data.clicked === "Cancel") {

            }
        });
    }

    openCreateCargoModal(): void {
        const dialogRef = this._modal
            .open(CargoCreateComponent, {
                height: 'auto',
                width: '700px',
                autoFocus: false,
                maxHeight: '90vh',
                data: { Hello: "Hello World" },
                hasBackdrop: true,
                disableClose: true
            });


        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "Ok") {

            } else if (data.clicked === "Cancel") {

            }
        });
    }    

    public OpenEditCargoModal(item: any): void {
        const dialogRef = this._modal
            .open(CargoEditComponent, EditCargoModalConfig(item));
        dialogRef.afterClosed().subscribe(data => {
        });
    }


}