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
    selector: 'createplanopgmmodal',
    templateUrl: './create-planopgm.component.html',
    styleUrls: ['./create-planopgm.component.scss'],
    animations: [HighlightTrigger]
})

export class PlanoPgmCreateComponent implements OnInit {


    baseUrl = environment.baseUrl;
    public typePacotes: any
    public moduloForm: FormGroup;
    private jwtHelper = new JwtHelperService();
    public tokenInfo: TokenInfos = new TokenInfos();
    public disabledSpinner = false
    constructor(
        //private service: AdmService,
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fb: FormBuilder,
        private _http: HttpClient,
        public dialogRef: MatDialogRef<PlanoPgmCreateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.moduloForm = _fb.group({
            pacoteId: ['', [Validators.required]],
            descricao: ['', [Validators.required]],
            valor: ['', [Validators.required]],
            taxaMatricula: [0.00],
           // ativo: [true],
            parcelamento: [''],
            materialGratuito: ['', [Validators.required]],
            bonusMensalidade: [0.00],
            contratoId: ['', [Validators.required]]
            
            /*
            pacoteId
descricao
valor
taxaMatricula
parcelamento
materialGratuito
bonusMensalidade
contratoId

            */

        })
    }

    // get materias() {
    //     return this.moduloForm.controls["materias"] as FormArray;
    // }

    // addMateria() {
    //     const lessonForm = this._fb.group({
    //         // title: ['', Validators.required],
    //         // level: ['beginner', Validators.required]

    //         descricao: ['', Validators.required],
    //         qntAulas: [, Validators.required],
    //         semestre: [, Validators.required],
    //         cargaHoraria: [, Validators.required],
    //         qntProvas: [, Validators.required],
    //         temRecuperacao: [true, Validators.required],
    //         modalidade: ['', Validators.required],

    //     });

    //     this.materias.push(lessonForm);
    // }

    // deleteLesson(index: number) {
    //     this.materias.removeAt(index);
    // }

    ngOnInit() {
        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)
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

    onSubmit(form: any) {
        console.log(form.value)
        if (form.valid) {
           // console.log(JSON.stringify(form.value))
            //this.save(novoColaborador)
            // let newTemplate = this.mapForm(tempForm)
            this.disabledSpinner = true
            this._http.post(`${this.baseUrl}/unidade/plano-pagamento`, form.value, {})
            .subscribe(response => {
            }, (err) => { console.log(err) },
                () => {
                    this.dialogRef.close({ clicked: "Ok" });
                });
        }
    }
}