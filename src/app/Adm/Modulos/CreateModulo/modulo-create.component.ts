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
    selector: 'modulocreatemodal',
    templateUrl: './modulo-create.component.html',
    styleUrls: ['./modulo-create.component.scss'],
    animations: [HighlightTrigger]
})

export class ModuloCreateComponent implements OnInit {


    baseUrl = environment.baseUrl;

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
        public dialogRef: MatDialogRef<ModuloCreateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.moduloForm = _fb.group({
            descricao: ['', [Validators.required]],
            duracaoMeses: ['', [Validators.required]],
            preco: ['', [Validators.required]],
            typePacoteId: ['', [Validators.required]],
            materias: this._fb.array([], Validators.required),

            documentos: this._fb.array([])

        })
    }

    ngOnInit() {
        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)
        this.GetTypes()
    }

    get materias() {
        return this.moduloForm.controls["materias"] as FormArray;
    }
    get documentos() {
        return this.moduloForm.controls["documentos"] as FormArray;
    }

    typePacotes: any

    get totalHoras() {
        let total = 0
        //console.log(this.moduloForm.get('materias').value)
        //    var arr = [{x:1},{x:2},{x:4}];
        //       arr.reduce((a, b) => ({x: a.x + b.x}));
        if (this.moduloForm.get('materias').value.length > 0) {
            const sum = this.moduloForm.get('materias').value.reduce((horas, a) => ({
                cargaHoraria: horas.cargaHoraria + a.cargaHoraria
            }));

            //console.log(sum['cargaHoraria'])
            if (sum != null) {
                total = sum['cargaHoraria']
            } else {
                total = 0
            }
        }
        return total
    }
    private GetTypes() {

        this._http.get(`${this.baseUrl}/unidade/typepacote`)
            .subscribe(resp => {
                this.typePacotes = resp['types']
            },
                (error) => { console.log(error) },
                () => { })
    }

    addMateria() {
        const matForm = this._fb.group({
            // title: ['', Validators.required],
            // level: ['beginner', Validators.required]

            descricao: ['', Validators.required],
            qntAulas: [, Validators.required],
            semestre: [, Validators.required],
            cargaHoraria: [, Validators.required],
            qntProvas: [, Validators.required],
            temRecuperacao: [true, Validators.required],
            modalidade: ['', Validators.required],

        });

        this.materias.push(matForm);
    }
    addDocumentos() {


        const docsForm = this._fb.group({

            descricao: ['', Validators.required],
            comentario: ['', Validators.required],
            titular: ['', Validators.required]

        });

        this.documentos.push(docsForm);
    }

    deleteLesson(index: number) {
        this.materias.removeAt(index);
    }
    deleteDocumento(index: number) {
        this.documentos.removeAt(index);
    }



    onSubmit(form: any) {
        console.log(form.value)
        if (form.valid) {
            this.disabledSpinner = true
            console.log(JSON.stringify(form.value))

            this._http.post(`${this.baseUrl}/unidade/modulo`, form.value, {})
                .subscribe(response => {
                }, (err) => { console.log(err) },
                    () => {
                        this.dialogRef.close({ clicked: "Ok" });
                    });
        }
    }
}