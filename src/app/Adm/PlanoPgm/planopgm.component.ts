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
import { PlanoPgmCreateComponent } from "./CreatePlanoPgm/create-planopgm.component";
import { PlanoPgmEditComponent } from "./EditPlanoPgm/editplano.component";




@Component({
    selector: "modulo-app",
    templateUrl: './planopgm.component.html',
    // styleUrls: ['./colaboradores.component.scss'],
    animations: [HighlightTrigger]
})

export class PlanoPgmComponent implements OnInit {

    baseUrl = environment.baseUrl;
    public modulos: Modulo[] = new Array<Modulo>();

    public tokenInfo: TokenInfos = new TokenInfos();
    private jwtHelper = new JwtHelperService();
    public planos: any[] = new Array<any>();
    constructor(
        private _http: HttpClient,
        private _modal: MatDialog) { }

    ngOnInit() {
        //console.log('init colaboradores 123')
        const token = localStorage.getItem('jwt')
        // this.tokenInfo = this.jwtHelper.decodeToken(token)
        // console.log(token);
        // console.log(this.tokenInfo.Unidade);
        // console.log(this.tokenInfo.Codigo);
        // console.log(this.tokenInfo);
        //this.getColaboradores(1, this.pageSize);
        this.GetPlanos();
    }

    private GetPlanos() {
        this._http.get(`${this.baseUrl}/unidade/plano-pagamento`)
            .subscribe(resp => {
                this.planos = Object.assign([], resp);
            }, (error) => { console.log(error) },
                () => {
                    // console.log(this.modulos)
                })

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

    createPlano(): void {
        const dialogRef = this._modal
            .open(PlanoPgmCreateComponent, {
                height: 'auto',
                width: '600px',
                autoFocus: false,
                maxHeight: '90vh',
                //data: {  },
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

    // PlanoPgmEditComponent
    EditPlano(plano): void {
        const dialogRef = this._modal
            .open(PlanoPgmEditComponent, {
                height: 'auto',
                width: '600px',
                autoFocus: false,
                maxHeight: '90vh',
                data: { plano: plano },
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
    pesquisar() {

    }





}