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
    selector: 'profmateriasmodal',
    templateUrl: './prof-materias.component.html',
    styleUrls: ['./prof-materias.component.scss'],
    animations: [HighlightTrigger]
})

export class ProfMateriasComponent implements OnInit {

    
    baseUrl = environment.baseUrl;
    
    private jwtHelper = new JwtHelperService();
    public tokenInfo: TokenInfos = new TokenInfos();
    public basicForm: FormGroup
    constructor(
        private _fb: FormBuilder,
        private _http: HttpClient,
        public dialogRef: MatDialogRef<ProfMateriasComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.basicForm = _fb.group({
            
        })
    }

    ngOnInit() {
        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)
        
    }
   

    onSubmit(form: FormGroup) {
        
        if (form.valid) {
            

            this._http.post(`${this.baseUrl}/colaboradores`, form.valid, {})
            .subscribe(response => {

            }, (err) => {
                console.log(err)
            },
                () => {
                    this.dialogRef.close({ clicked: "Ok" });
                });
        }
    }
}