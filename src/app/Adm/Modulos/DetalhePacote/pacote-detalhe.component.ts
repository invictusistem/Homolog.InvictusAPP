import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CepReturn } from "src/app/_shared/models/cepreturn.model";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Cargos, Unidades } from "src/app/_shared/models/perfil.model";
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Modulo } from "src/app/_shared/models/modulo.model";
import { Materia } from "src/app/_shared/models/materia.model";

export const Modalidade = [
    { type: 'Presencial', value: 'Presencial' },
    { type: 'On-line', value: 'On-line' }
    
]

//import { TemplateTasks } from 'src/app/shared/models/templateTasks.model';

@Component({
    selector: 'pacotedetalhemodal',
    templateUrl: './pacote-detalhe.component.html',
    styleUrls: ['./pacote-detalhe.component.scss'],
    animations: [HighlightTrigger]
})

export class DetailPacoteComponent implements OnInit {

   

    baseUrl = environment.baseUrl;

    public moduloForm: FormGroup;
    private jwtHelper = new JwtHelperService();
    public tokenInfo: TokenInfos = new TokenInfos();
    public modulo: any// = new any();
    //materias: FormArray;
    modalidade = Modalidade
    showForm = false
    constructor(
        //private service: AdmService,
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fb: FormBuilder,
        private _http: HttpClient,
        public dialogRef: MatDialogRef<DetailPacoteComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.moduloForm = _fb.group({
            id: [''],
            descricao: ['', [Validators.required]],
            duracaoMeses: ['', [Validators.required]],
            preco: ['', [Validators.required]],
            typePacoteId: ['', [Validators.required]],
            unidadeId: [''],
            totalHoras: [''],
            dataCriacao: [''],
            materias: this._fb.array([], Validators.required)
            //terias: this.materias
            // documentos: this._fb.array([])

        })

        // this.materias = this._fb.array([
        //     new FormControl('descricao')//:['']

        // ], Validators.required)
    }

    trackByIdx(index: number, obj: any): any {
        return index;
      }

    ngOnInit() {
        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)
        this.modulo = Object.assign({}, this.data['modulo'])
        console.log(this.data['modulo'])
        //this.moduloForm.setValue(this.modulo)// as FormGroup
        //this.moduloForm.get('materias').setValue(this.modulo.materias)

        this.GetTypes()
        //this.SetForm(this.modulo)

        this.showForm = true




        console.log(this.moduloForm.value)
    }

    get materias() {
        return this.moduloForm.get("materias").value as FormArray;
    }

    get documentos() {
        return this.moduloForm.controls["documentos"] as FormArray;
    }

    typePacotes: any
    private GetTypes() {

        this._http.get(`${this.baseUrl}/unidade/typepacote`)
            .subscribe(resp => {
                this.typePacotes = resp['types']
            },
                (error) => { console.log(error) },
                () => { })
    }

    // addMateria() {
    //     const matForm = this._fb.group({
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

    //     this.materias.push(matForm);
    // }
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

    get totalHoras() {

        return 0;
    }

    onSubmit(form: any) {
        console.log(this.modulo)
        console.log(form.valid)
        if (form.valid) {
            console.log(JSON.stringify(form.value))
            //this.save(novoColaborador)
            // let newTemplate = this.mapForm(tempForm)

            this._http.put(`${this.baseUrl}/unidade/pacote-editar`, this.modulo, {})
            .subscribe(response => {
            }, (err) => { console.log(err) },
                () => {
                    this.dialogRef.close({ clicked: "Ok" });
                });
        }
    }

    private SetForm(modulo: ModuloDto) {
        this.moduloForm.get('id').setValue(modulo.id)
        this.moduloForm.get('descricao').setValue(modulo.descricao)
        this.moduloForm.get('duracaoMeses').setValue(modulo.duracaoMeses)
        this.moduloForm.get('preco').setValue(modulo.preco)
        this.moduloForm.get('typePacoteId').setValue(modulo.typePacoteId)
        this.moduloForm.get('unidadeId').setValue(modulo.unidadeId)
        this.moduloForm.get('totalHoras').setValue(modulo.totalHoras)
        this.moduloForm.get('dataCriacao').setValue(modulo.dataCriacao)

        modulo.materias.forEach(element => {
            //             this.moduloForm.g id
            // descricao
            // qntAulas
            // semestre
            // cargaHoraria
            // moduloId
            // modalidade
            this.addMateriaForm(element)
        });
    }


    addMateriaForm(materia) {
        const matForm = this._fb.group({
            // title: ['', Validators.required],
            // level: ['beginner', Validators.required]
            id: [, Validators.required],
            descricao: ['', Validators.required],
            qntAulas: [, Validators.required],
            semestre: [, Validators.required],
            cargaHoraria: [, Validators.required],
            PrimeiroDiaAula: [, Validators.required],
            PrimeiroDaLista: [, Validators.required],
            qntProvas: [, Validators.required],
            temRecuperacao: [, Validators.required],
            moduloId: [, Validators.required],
            modalidade: ['', Validators.required],

        });

        matForm.get('id').setValue(materia.id)
        matForm.get('descricao').setValue(materia.descricao)
        matForm.get('qntAulas').setValue(materia.qntAulas)
        matForm.get('semestre').setValue(materia.semestre)
        matForm.get('cargaHoraria').setValue(materia.cargaHoraria)
        matForm.get('PrimeiroDiaAula').setValue(materia.PrimeiroDiaAula)
        matForm.get('PrimeiroDaLista').setValue(materia.PrimeiroDaLista)
        matForm.get('qntProvas').setValue(materia.qntProvas)
        matForm.get('temRecuperacao').setValue(materia.temRecuperacao)
        matForm.get('moduloId').setValue(materia.moduloId)
        matForm.get('modalidade').setValue(materia.modalidade)

        this.materias.push(matForm.value);

    }
}

export class ModuloDto {
    constructor(
        public id?: number,
        public descricao?: string,
        public duracaoMeses?: number,
        public preco?: string,
        public unidadeId?: number,
        public typePacoteId?: number,
        public totalHoras?: number,
        public dataCriacao?: Date,
        public materias?: MateriaDto[],
        // public documentos?: DocumentoDto[]
    ) { }
}

export class MateriaDto {
    constructor(
        public id?: number,
        public descricao?: string,
        public qntAulas?: number,
        public qntProvas?: number,
        public semestre?: number,
        public cargaHoraria?: number,
        public moduloId?: number,
        public modalidade?: string,
        public temRecuperacao?: boolean
    ) { }
}

export class DocumentoDto {
    constructor(
        public id?: number,
        public descricao?: string,
        public comentario?: string,
        public titular?: string,
        public moduloId?: number,
    ) {

    }



}