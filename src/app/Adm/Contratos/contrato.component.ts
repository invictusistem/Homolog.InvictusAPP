import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { environment } from "src/environments/environment";
import { CreateContratoComponent } from "./CreateContrato/create-contrato.component";
import { EditarContratoComponent } from "./EditContrato/editcontrato.component";



@Component({
    selector: "contrato-app",
    templateUrl: './contrato.component.html',
    styleUrls: ['./contrato.component.scss'],
    animations: [HighlightTrigger]
})

export class ContratoComponent implements OnInit {

    baseUrl = environment.baseUrl;

    public typesPacotes: any = new Array<any>();
    public contratos: any[] = new Array<any>()

    public tokenInfo: TokenInfos = new TokenInfos();
    private jwtHelper = new JwtHelperService();
    public pesquisarForm: FormGroup
    public showSpinnerSearch = false
    constructor(
        private _http: HttpClient,
        private _fb: FormBuilder,
        private _modal: MatDialog) {
        this.pesquisarForm = _fb.group({
            typePacoteId: ['', [Validators.required]]
        });
    }

    ngOnInit() {

        const token = localStorage.getItem('jwt')

        this.getTypePacotes();
    }

    Pesquisar() {

        if (this.pesquisarForm.valid) {
            this.showSpinnerSearch = true
            this.contratos = []
            let typePacoteId = this.pesquisarForm.get('typePacoteId').value
            // console.log(typePacoteId)
            this._http.get(`${this.baseUrl}/contrato/type-pacote/${typePacoteId}`)
                .subscribe(resp => {
                    console.log(resp)

                    this.contratos = Object.assign([], resp['contratos']);

                }, (error) => {
                    console.log(error)
                    this.showSpinnerSearch = false
                },
                    () => {
                        this.showSpinnerSearch = false
                    })
        }
    }

    getTypePacotes() {

        this._http.get(`${this.baseUrl}/typepacote`)
            .subscribe(resp => {
                console.log(resp)

                this.typesPacotes = Object.assign([], resp['typePacotes']);

            }, (error) => { console.log(error) },
                () => {

                })
    }

    openCreateContratoModal(): void {
        const dialogRef = this._modal
            .open(CreateContratoComponent, {
                height: 'auto',
                width: '1000px',
                autoFocus: false,
                maxHeight: '90vh',
                hasBackdrop: true,
                disableClose: true
            });
        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "OK") {

            } else if (data.clicked === "Cancel") {

            }
        });
    }

    openEditContratoModal(contrato: any): void {
        const dialogRef = this._modal
            .open(EditarContratoComponent, {
                height: 'auto',
                width: '1000px',
                autoFocus: false,
                maxHeight: '90vh',
                data: { contrato: contrato },
                hasBackdrop: true,
                disableClose: true
            });
        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "Ok") {
                this.getTypePacotes();
            } else if (data.clicked === "Cancel") {

            }
        });
    }

}


// export class Contrato {
//     constructor(
//         public id?: number,
//         public codigoContrato?: number,
//         public unidadeId?: number,
//         public pacoteId?: number,
//         public titulo?: string,
//         public conteudos?: Conteudo[],
//         public conteudo?: string,
//         public podeEditar?: boolean,
//         public observacao?: string,
//         public dataCriacao?: Date
//     ) {

//     }
// }

// export class Conteudo {
//     constructor(
//         public id?: number,
//         public order?: number,
//         public content?: string,
//         public contratoId?: number
//     ) {

//     }

// }

