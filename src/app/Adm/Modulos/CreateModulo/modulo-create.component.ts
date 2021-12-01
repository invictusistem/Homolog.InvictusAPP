import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CepReturn } from "src/app/_shared/models/cepreturn.model";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Cargos, TitularDoc, Unidades } from "src/app/_shared/models/perfil.model";
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
    selector: 'modulocreatemodal',
    templateUrl: './modulo-create.component.html',
    styleUrls: ['./modulo-create.component.scss'],
    animations: [HighlightTrigger]
})

export class ModuloCreateComponent implements OnInit {


    baseUrl = environment.baseUrl;

    public moduloForm: FormGroup;
    public addMateriaForm: FormGroup;
    public addDocForm: FormGroup;
    private jwtHelper = new JwtHelperService();
    public tokenInfo: TokenInfos = new TokenInfos();
    public disabledSpinner = false
    public unidadesAutorizadas: any[] = new Array<any>();
    public materiasTemplate: any[] = new Array<any>();
    public documentosTemplate: any[] = new Array<any>();
    public typePacotes: any
    public docTemplates: any
    public titularDoc = TitularDoc

    constructor(
        //private service: AdmService,
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fb: FormBuilder,
        private _http: HttpClient,
        public dialogRef: MatDialogRef<ModuloCreateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

        this.addMateriaForm = _fb.group({
            pacote: ['', [Validators.required]]
        })

        this.addDocForm = _fb.group({
            documento: ['', [Validators.required]]
        })

        this.moduloForm = _fb.group({
            descricao: ['', [Validators.required]],
           // duracaoMeses: ['', [Validators.required]],
            totalHoras: [''],
           // preco: ['', [Validators.required]],
            typePacoteId: ['', [Validators.required]],
            unidadeId: ['', [Validators.required]],
            ativo: [true],

            materias: this._fb.array([], [Validators.required]),
            documentosExigidos: this._fb.array([])

        })
    }

    ngOnInit() {

        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)
        this.unidadesAutorizadas = JSON.parse(this.tokenInfo.UnidadesAutorizadas)
        this.GetViewModels()
    }

    get materias() {
        return this.moduloForm.controls["materias"] as FormArray;
    }
    get documentos() {
        return this.moduloForm.controls["documentosExigidos"] as FormArray;
    }


    addMateria(form: any) {

        let pacote = form.value['pacote']

        if (form.valid) {
            let pacotId = this.materias.value.find(element =>
                element.materiaId == pacote.id);

            if (pacotId != undefined) return;

            const matForm = this._fb.group({

                materiaId: [pacote.id],
                nome: [pacote.nome],
                descricao: [pacote.descricao],
                modalidade: [pacote.modalidade],
                cargaHoraria: [pacote.cargaHoraria],
                typePacoteId: [pacote.typePacoteId],

            });

            this.materias.push(matForm);
        }
    }
    addDocumentos(form: any) {

        let documento = form.value['documento']

         if (form.valid) {
        //     let documentoId = this.documentos.value.find(element =>
        //         element.documentoId == documento.id);

        //     if (documentoId != undefined) return;

            const docsForm = this._fb.group({
                obrigatorioParaMatricula: [false],
                descricao: [documento.nome],
                comentario: ['',[Validators.required]],
                titular: ['',[Validators.required]],
                validadeDias: [documento.validadeDias],
               // ObrigatorioParaMatricula: [false]

            });

            /*
            Descricao
Comentario
Titular
ValidadeDias
ObrigatorioParaMatricula

            
            */

            this.documentos.push(docsForm);
        }
    }

    deleteLesson(index: number) {
        this.materias.removeAt(index);
    }
    deleteDocumento(index: number) {
        this.documentos.removeAt(index);
    }

    setMateria(index, typePacote) {

    }

    get totalHoras() {
        let total = 0

        if (this.moduloForm.get('materias').value.length > 0) {
            const sum = this.moduloForm.get('materias').value.reduce((horas, a) => ({
                cargaHoraria: horas.cargaHoraria + a.cargaHoraria
            }));

            if (sum != null) {
                total = sum['cargaHoraria']
            } else {
                total = 0
            }
        }

        this.moduloForm.get('totalHoras').setValue(total)

        return total
    }

    private GetViewModels() {

        this._http.get(`${this.baseUrl}/pacote/create`)
            .subscribe(resp => {
                this.typePacotes = resp['typePacotes']
                this.docTemplates = resp['documentos']
            },
                (error) => { console.log(error) },
                () => {
                    console.log(this.typePacotes)
                    console.log(this.docTemplates)

                })
    }

    buscarMaterias(typePacoteId) { // filtro/{typePacoteId}

        this._http.get(`${this.baseUrl}/materia-template/filtro/${typePacoteId}`)
            .subscribe(resp => {
                this.materiasTemplate = resp['materias']
            },
                (error) => { console.log(error) },
                () => { })
    }

    onSubmit(form: any) {
        // console.log(form.value)
        if (form.valid) {
            this.disabledSpinner = true
            //console.log(JSON.stringify(form.value))

            this._http.post(`${this.baseUrl}/pacote`, this.moduloForm.value, {})
                .subscribe(response => {
                }, (err) => { console.log(err) },
                    () => {
                        this.dialogRef.close({ clicked: "Ok" });
                    });
        }
    }
}