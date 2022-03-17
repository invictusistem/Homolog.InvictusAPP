import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { HelpersService } from "src/app/_shared/components/helpers/helpers.component";

@Component({
    selector: 'cargocreatemodal',
    templateUrl: './cargo-create.component.html',
    styleUrls: ['./cargo-create.component.scss'],
    animations: [HighlightTrigger]
})

export class CargoCreateComponent implements OnInit {


    baseUrl = environment.baseUrl;

    private jwtHelper = new JwtHelperService();
    public tokenInfo: TokenInfos = new TokenInfos();
    public cargoForm: FormGroup
    public progress = false
    constructor(
        private _helpers: HelpersService,
        private _fb: FormBuilder,
        private _http: HttpClient,
        public dialogRef: MatDialogRef<CargoCreateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.cargoForm = _fb.group({
            value: ['', [Validators.required]],
            descricao: [''],
            comentario: ['', [Validators.required]],
            ativo:[true]
        })
    }

    ngOnInit() {
        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)

    }


    onSubmit(form: FormGroup) {

        if (this.cargoForm.valid) {
            this.disabledSaveButton = 'visible'
            this.progress = true
            this._http.post(`${this.baseUrl}/parametro/value/Cargo`, this.cargoForm.value, {})
                .subscribe(response => {

                }, (err) => {
                    //console.log(err)
                    this.disabledSaveButton = 'hidden'
                    this.progress = false
                    this._helpers.openSnackBarErrorDefault()
                },
                    () => {
                        this._helpers.openSnackBarSucesso("Cargo salvo com sucesso.");
                        this.progress = false
                        this.dialogRef.close({ clicked: true });
                    });
        }
    }

    disabledSaveButton = 'hidden'

    get disabledButton() {
        if (this.cargoForm.valid) {
            return this.disabledSaveButton != 'hidden'
        } else {
            return true
        }
    }
}