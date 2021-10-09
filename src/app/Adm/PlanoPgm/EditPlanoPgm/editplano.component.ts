import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CepReturn } from "src/app/_shared/models/cepreturn.model";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Cargos, Unidades } from "src/app/_shared/models/perfil.model";
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { MatSnackBar } from "@angular/material/snack-bar";



//import { TemplateTasks } from 'src/app/shared/models/templateTasks.model';

@Component({
    selector: 'editplanomodal',
    templateUrl: './editplano.component.html',
    styleUrls: ['./editplano.component.scss'],
    animations: [HighlightTrigger]
})

export class PlanoPgmEditComponent implements OnInit {


    baseUrl = environment.baseUrl;
    public typePacotes: any
    public moduloForm: FormGroup;
    private jwtHelper = new JwtHelperService();
    public tokenInfo: TokenInfos = new TokenInfos();
    public plano: any;
    public disabledSpinner = false

    constructor(
        //private service: AdmService,
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fb: FormBuilder,
        private _http: HttpClient,
        public dialogRef: MatDialogRef<PlanoPgmEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)
        this.plano = this.data['plano']
        console.log(this.plano)
        this.GetTypes()
    }

    private GetTypes() {

        this._http.get(`${this.baseUrl}/unidade/typepacote`)
            .subscribe(resp => {
                this.typePacotes = resp['types']
            },
                (error) => { console.log(error) },
                () => { })
    }
    isDisabled = false
    onSubmit(form: any) {
        console.log(this.plano)
        if (form.valid) {
            this.isDisabled = true
            this.disabledSpinner = true
            this._http.put(`${this.baseUrl}/unidade/plano-editar`, this.plano, {})
                .subscribe(response => {
                }, (err) => { console.log(err) },
                    () => {
                        this.disabledSpinner = false
                        this.dialogRef.close({ clicked: "OK" });
                    });
        }
    }
}