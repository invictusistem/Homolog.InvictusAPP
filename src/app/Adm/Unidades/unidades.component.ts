import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { environment } from "src/environments/environment";
//import { Unidade } from "../Adm-Models/unidade.model";

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
        
    }
    
    openEditUnidade(unidade: any): void {
        
    }

    addSala(unidade: any): void {
        
    }

    editSala(unidade): void {
        
    }

}