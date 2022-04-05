import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { environment } from "src/environments/environment";
//import { Unidade } from "../Adm-Models/unidade.model";
import { CreateUnidadeComponent } from "./CreateModal/createunidade.component";
import { CreateSalaComponent } from "./CreateSalaModal/createsala.component";
import { SalaEditarComponent } from "./EditarSala/sala-editar.component";
import { EditUnidadeComponent } from "./EditModal/editunidade.component";

@Component({
    selector: "unidades-app",
    templateUrl: './unidades.component.html',
    styleUrls: ['./unidades.component.scss']
})

export class UnidadesComponent implements OnInit {

    private _baseUrl = environment.baseUrl;
    //public salas: Sala[] = new Array<Sala>();
    public unidades: any[] = new Array<any>()
    public spinnerSearch = 'visible'

    constructor(
        private _http: HttpClient,
        private unidadeCreateModal: MatDialog,
        private unidadeEditModal: MatDialog) { }


    ngOnInit() {

        this.getUnidades();

    }

    getUnidades() {

        this._http.get(`${this._baseUrl}/unidade`)
            .subscribe(response => {

                Object.assign(this.unidades, response['unidades'])
            },
                (error) => { 
                    this.spinnerSearch = 'hidden'
                 },
                () => {
                    this.spinnerSearch = 'hidden'
                })

    }

    
    openUnidadeCreateModal(): void {
        const dialogRef = this.unidadeCreateModal
            .open(CreateUnidadeComponent, {
                height: '450px',
                width: '650px',
                //data: {  },
                hasBackdrop: true,
                disableClose: true
            });
        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "Ok") {
                this.getUnidades();
            } else if (data.clicked === "Cancel") {

            }
        });
    }
    
    openEditUnidade(unidade: any): void {
        const dialogRef = this.unidadeEditModal
            .open(EditUnidadeComponent, {
                //height: '450px',
                width: '670px',
                data: { unidade: unidade },
                hasBackdrop: true,
                disableClose: true
            });
        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "OK") {
                this.getUnidades();
            } else if (data.clicked === "Cancel") {

            }
        });
    }

    addSala(unidade: any): void {
        const dialogRef = this.unidadeEditModal
            .open(CreateSalaComponent, {
                height: 'auto',
                width: '600px',
                data: { unidade: unidade},
                hasBackdrop: true,
                disableClose: true
            });
        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "Ok") {
                this.getUnidades();
            } else if (data.clicked === "Cancel") {

            }
        });
    }

    editSala(unidade): void {
        const dialogRef = this.unidadeEditModal
            .open(SalaEditarComponent, {
               // height: 'auto',
                width: '600px',
                data: { unidade: unidade},
                hasBackdrop: true,
                disableClose: true
            });
        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "OK") {
                this.getUnidades();
            } else if (data.clicked === "Cancel") {

            }
        });
    }

}