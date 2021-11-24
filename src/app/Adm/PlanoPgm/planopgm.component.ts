import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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
    styleUrls: ['./planopgm.component.scss'],
    animations: [HighlightTrigger]
})

export class PlanoPgmComponent implements OnInit {

    baseUrl = environment.baseUrl;
    public modulos: Modulo[] = new Array<Modulo>();
    public pesquisarForm: FormGroup
    public tokenInfo: TokenInfos = new TokenInfos();
    private jwtHelper = new JwtHelperService();
    public planos: any[] = new Array<any>();
    public typesPacotes: any[] = new Array<any>();
    constructor(
        private _http: HttpClient,
        private _fb: FormBuilder,
        private _modal: MatDialog) { 
            this.pesquisarForm = _fb.group({
                typePacoteId: ['', [Validators.required]]
               // unidadeId: ['', [Validators.required]]
            });

        }

    ngOnInit() {
        //console.log('init colaboradores 123')
        const token = localStorage.getItem('jwt')
        
       // this.GetPlanos();
       this.getTypePacotes();
    }

    getTypePacotes() {

        //if(this.pesquisarForm.valid){
        this._http.get(`${this.baseUrl}/typepacote`)
            .subscribe(resp => {
                console.log(resp)

                this.typesPacotes = Object.assign([], resp['typePacotes']);

            }, (error) => { console.log(error) },
                () => {
                    //this.showTeste = true
                })
        // }
    }

    Pesquisar() {

        if (this.pesquisarForm.valid) {

            let typePacoteId = this.pesquisarForm.get('typePacoteId').value
            //let unidadeId = this.pesquisarForm.get('unidadeId').value
            // console.log(typePacoteId)
            this._http.get(`${this.baseUrl}/plano-pagamento/pacote/${typePacoteId}`)
                .subscribe(resp => {
                    console.log(resp)

                    this.planos = Object.assign([], resp['planos']);

                }, (error) => { console.log(error) },
                    () => {

                    })
        }
    }

    private GetPlanos() {
        this._http.get(`${this.baseUrl}/plano-pagamento`)
            .subscribe(resp => {
                this.planos = Object.assign([], resp);
            }, (error) => { console.log(error) },
                () => {
                    console.log(this.planos)
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
                this.GetPlanos();
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
                this.GetPlanos();
            } else if (data.clicked === "Cancel") {

            }
        });
    }
    pesquisar() {

    }





}