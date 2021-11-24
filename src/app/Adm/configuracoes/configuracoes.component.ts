import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { Colaborador } from "src/app/_shared/models/colaborador.model";
import { environment } from "src/environments/environment";
import { Cargo } from "../Adm-Models/cargos.model";
import { CargoCreateComponent } from "./Config-Cargos/cargo-create.component";
import { DocTemplateComponent } from "./Doc-create/doctemplate.component";
import { MateriaTemplateComponent } from "./Mat-create/mat-create.component";

declare var $: any;

@Component({
    selector: "configuracoes-app",
    templateUrl: './configuracoes.component.html',
    styleUrls: ['./configuracoes.component.scss'],
    animations: [HighlightTrigger]

})

export class ConfiguracoesComponent implements OnInit {

    private baseUrl = environment.baseUrl;
    public htmlContent: any = "weewgwegewgegergregergergerg";//any;
    public cargos: Cargo[] = new Array<Cargo>();
    constructor(
        private _http: HttpClient,
        private _modal: MatDialog
    ) { }



    ngOnInit() {
        // $(".showtoast").click(function () {
        //     $('.toast').toast('show');
        // })
       // this.pegarMesg();
    }



    showTableCargos = false

    getCargos() {
        this.showTableCargos = false
        this._http.get(`${this.baseUrl}/unidade/cargo`)
            .subscribe(resp => {
                this.cargos = Object.assign([], resp)
            }, (error) => {
                console.log(error)
            },
                () => {
                    this.showTableCargos = true
                })
    }

    mensagem: any;
    pegarMesg() {

        this._http.get(`${this.baseUrl}/mensagem`)
            .subscribe(resp => {
                console.log(resp)
                this.mensagem = resp
                this.htmlContent = resp
            }, (error) => { console.log(error) },
                () => {

                })
    }

    

    getDocumentacao() {

    }

    getMaterias(){
        
    }

    openCreateMateriaModal(): void { // MateriaTemplateComponent
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

    openCreateDocModal(): void { //DocTemplateComponent
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


}