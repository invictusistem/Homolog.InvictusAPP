import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";

@Component({
    selector: 'doctemplatemodal',
    templateUrl: './doctemplate.component.html',
    styleUrls: ['./doctemplate.component.scss'],
    animations: [HighlightTrigger]
})

export class DocTemplateComponent implements OnInit {


    baseUrl = environment.baseUrl;

    private jwtHelper = new JwtHelperService();
    public tokenInfo: TokenInfos = new TokenInfos();
    public docForm: FormGroup
    public progress = false
    constructor(
        private _fb: FormBuilder,
        private _http: HttpClient,
        public dialogRef: MatDialogRef<DocTemplateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.docForm = _fb.group({
            nome: ['', [Validators.required]],
            descricao: [''],
            validadeDias: ['', [Validators.required]]
        })
    }

    ngOnInit() {
        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)

    }


    onSubmit(form: FormGroup) {

        if (form.valid) {

            this.progress = true
            this._http.post(`${this.baseUrl}/documentacao`, this.docForm.value, {})
                .subscribe(response => {

                }, (err) => {
                    console.log(err)
                    this.progress = false
                },
                    () => {
                        this.progress = false
                        this.dialogRef.close({ clicked: "Ok" });
                    });
        }
    }
}