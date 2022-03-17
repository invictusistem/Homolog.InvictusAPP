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
    selector: 'cargoeditmodal',
    templateUrl: './cargo-edit.component.html',
    styleUrls: ['./cargo-edit.component.scss'],
    animations: [HighlightTrigger]
})

export class CargoEditComponent implements OnInit {


    baseUrl = environment.baseUrl;

    public initProgressBar = 'visible'
    public showForm = false
    private originalCargo: any

    private jwtHelper = new JwtHelperService();
    public tokenInfo: TokenInfos = new TokenInfos();
    public cargoForm: FormGroup
    public progress = false
    constructor(
        private _helpers: HelpersService,
        private _fb: FormBuilder,
        private _http: HttpClient,
        public dialogRef: MatDialogRef<CargoEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.cargoForm = _fb.group({
            id:[''],
            value: ['', [Validators.required]],
            descricao: [''],
            comentario: ['', [Validators.required]],
            parametrosKeyId: ['']
        })
    }

    ngOnInit() {
        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)
        console.log(this.data['value'])
        this.GetCargo()

    }

    private GetCargo(){
     
        this._http.get(`${this.baseUrl}/parametro/get-value/${this.data['value'].id}`, {}) // get-value/{valueId}
            .subscribe(response => {
                //this.cargos = Object.assign([], response['values'])
                this.cargoForm.patchValue(response['value']);
                this.originalCargo = JSON.parse(JSON.stringify(this.cargoForm.value))


            }, (err) => {
                //console.log(err)
                this.disabledSaveButton = 'hidden'
                this.progress = false
                this._helpers.openSnackBarErrorDefault()
            },
                () => {
                    this.initProgressBar = 'hidden'
                    this.showForm = true
                  //  this._helpers.openSnackBarSucesso("Cargo salvo com sucesso.");
                   // this.progress = false
                  //  this.dialogRef.close({ clicked: true });
                });
    }


    onSubmit(form: FormGroup) {

        if (this.cargoForm.valid) {
            this.disabledSaveButton = 'visible'
            this.progress = true
            this._http.put(`${this.baseUrl}/parametro/value`, this.cargoForm.value, {})
                .subscribe(response => {

                }, (err) => {
                    //console.log(err)
                    this.disabledSaveButton = 'hidden'
                    this.progress = false
                    this._helpers.openSnackBarErrorDefault()
                },
                    () => {
                        this._helpers.openSnackBarSucesso("Cargo editado com sucesso.");
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