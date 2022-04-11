import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { environment } from "src/environments/environment";
import { CreateUnidadeComponent } from "./create/unidade-create.component";
import { EditUnidadeComponent } from "./edit/unidade-edit.component";
import { CreateSalaComponent } from "./salas/create/sala-create.component";
import { SalaEditarComponent } from "./salas/edit/sala-edit.component";

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
            .subscribe((response: any) => {

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

    editSala(unidade: any): void {
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