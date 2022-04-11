import { HttpClient } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from "src/environments/environment";
import { HighlightTrigger } from "../../animation/animation";
import { HelpersService } from "../helpers/helpers.component";

@Component({
    selector: 'confirm-acao-modal',
    templateUrl: './modal-confirmar.component.html',
    styleUrls: ['./modal-confirmar.component.scss'],
    animations: [HighlightTrigger]
})

export class ModalConfirmarComponent implements OnInit {

    private baseUrl = environment.baseUrl;
    public saveProgressBar = 'hidden'

    constructor(
        private _helpers: HelpersService,
        private _http: HttpClient,
        public dialogRef: MatDialogRef<ModalConfirmarComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

    }

    ngOnInit() {

    }

    confirmar() {
        this.saveProgressBar = 'visible'
        switch (this.data['metodo']) {
            case 'get':
                this.Get()
                break;
            case 'post':
                this.Post()
                break;
            case 'put':
                this.Put()
                break;
        }
    }

    Get() {
        this._http.get(`${this.baseUrl}/${this.data['url']}`)
            .subscribe({
                next: (resp: any) => {
                    this.Sucess(resp)
                },
                error: (error) => {
                    this.Fail(error)
                }
            })
    }

    Post() {
        this._http.post(`${this.baseUrl}/${this.data['url']}`, this.data['payload'])
            .subscribe({
                next: (resp: any) => {
                    this.Sucess(resp)
                },
                error: (error) => {
                    this.Fail(error)
                }
            })
    }

    Put() {
        this._http.put(`${this.baseUrl}/${this.data['url']}`, {})
            .subscribe({
                next: (resp: any) => {
                    this.Sucess(resp)
                },
                error: (error) => {
                    this.Fail(error)
                }
            })
    }

    Sucess(response?: any) {
        //this.saveProgressBar = 'hidden'
        this._helpers.openSnackBarSucesso('Operação realizada com sucesso.')
        this.dialogRef.close({ confirm: true });
    }

    Fail(error: any) {
        this._helpers.openSnackBarErrorDefault();
        this.saveProgressBar = 'hidden'
        //this.dialogRef.close({ clicked: false });
    }

    get disabledButton() {
        return this.saveProgressBar != 'hidden'

    }


    cancelar() {
        this.dialogRef.close({ confirm: false });
    }
}