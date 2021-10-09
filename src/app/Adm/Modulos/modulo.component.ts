import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { Colaborador } from "src/app/_shared/models/colaborador.model";
import { Modulo } from "src/app/_shared/models/modulo.model";
import { Cargos, Unidades } from "src/app/_shared/models/perfil.model";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { environment } from "src/environments/environment";
import { ModuloCreateComponent } from "./CreateModulo/modulo-create.component";
import { DetailPacoteComponent } from "./DetalhePacote/pacote-detalhe.component";



@Component({
    selector: "modulo-app",
    templateUrl: './modulo.component.html',
    // styleUrls: ['./colaboradores.component.scss'],
    animations: [HighlightTrigger]
})

export class ModuloComponent implements OnInit {

    baseUrl = environment.baseUrl;
    public modulos: any[] = new Array<any>();

    public tokenInfo: TokenInfos = new TokenInfos();
    private jwtHelper = new JwtHelperService();

    constructor(
        private _http: HttpClient,
        private _modal: MatDialog) { }

    ngOnInit() {
        //console.log('init colaboradores 123')
        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)
        console.log(token);
        console.log(this.tokenInfo);
        // console.log(this.tokenInfo.Codigo);
        // console.log(this.tokenInfo);
        //this.getColaboradores(1, this.pageSize);
        this.getModulos();
    }

    getModulos() {

        this._http.get(`${this.baseUrl}/unidade/modulos`)
            .subscribe(resp => {
                this.modulos = Object.assign([], resp);
            }, (error) => { console.log(error) },
                () => {
                    console.log(this.modulos)
                })
    }

    openDetailModal(item: any): void {
        // const dialogRef = this._modal
        //     .open(DetailPacoteComponent, {
        //         height: 'auto',
        //         width: '1000px',
        //         autoFocus: false,
        //         maxHeight: '90vh',
        //         data: { modulo: item },
        //         hasBackdrop: true,
        //         disableClose: true
        //     });
        // dialogRef.afterClosed().subscribe((data) => {
        //     if (data.clicked === "Ok") {
        //         // this.getUnidades();
        //     } else if (data.clicked === "Cancel") {

        //     }
        // });
    }

    createModulo(): void {
        const dialogRef = this._modal
            .open(ModuloCreateComponent, {
                height: 'auto',
                width: '1000px',
                autoFocus: false,
                maxHeight: '90vh',
                //data: {  },
                hasBackdrop: true,
                disableClose: true
            });
        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "Ok") {
                this.getModulos();
            } else if (data.clicked === "Cancel") {

            }
        });
    }

    openEditModal(modulo: any): void {
        const dialogRef = this._modal
            .open(DetailPacoteComponent, {
                height: 'auto',
                width: '1000px',
                autoFocus: false,
                maxHeight: '90vh',
                data: { modulo: modulo },
                hasBackdrop: true,
                disableClose: true
            });
        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "Ok") {
                // this.getUnidades();
            } else if (data.clicked === "Cancel") {

            }
        });
    }





}