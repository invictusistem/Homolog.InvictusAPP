import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HighlightTrigger } from "src/app/_shared/animation/animation";
import { environment } from "src/environments/environment";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { Modalidade } from "src/app/_shared/models/perfil.model";

@Component({
    selector: 'mat-createmodal',
    templateUrl: './mat-create.component.html',
    styleUrls: ['./mat-create.component.scss'],
    animations: [HighlightTrigger]
})

export class MateriaTemplateComponent implements OnInit {


    baseUrl = environment.baseUrl;

    private jwtHelper = new JwtHelperService();
    public tokenInfo: TokenInfos = new TokenInfos();
    public docForm: FormGroup
    public typesPacotes: any[] = new Array<any>();
    public progress = false
    public modalidade = Modalidade
    constructor(
        private _fb: FormBuilder,
        private _http: HttpClient,
        public dialogRef: MatDialogRef<MateriaTemplateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.docForm = _fb.group({
            nome: ['', [Validators.required]],
            descricao: [''],
            typePacoteId: ['', [Validators.required]],
            modalidade: ['', [Validators.required]],
            cargaHoraria: ['', [Validators.required]],
            ativo: [true]
        })
    }

    ngOnInit() {
        const token:any = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)
        this.getTypePacotes();
    }

    getTypePacotes() {

        
        this._http.get(`${this.baseUrl}/typepacote`)
        .subscribe({
            next: (resp: any) => { 
                this.typesPacotes = Object.assign([], resp['typePacotes']);
			},
            error: (error) => { 
			
			}
        })
        
    }

    onSubmit(form: FormGroup) {

        if (form.valid) {

            this.progress = true
            this._http.post(`${this.baseUrl}/materia-template`, this.docForm.value, {})
                .subscribe(response => {

                }, (err) => {
                    this.progress = false
                },
                    () => {
                        this.progress = false
                        this.dialogRef.close({ clicked: "Ok" });
                    });
        }
    }
}