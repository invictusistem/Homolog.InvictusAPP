import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CepReturn } from "src/app/_shared/models/cepreturn.model";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Cargos, TitularDoc, Unidades } from "src/app/_shared/models/perfil.model";
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Modulo } from "src/app/_shared/models/modulo.model";
import { Materia } from "src/app/_shared/models/materia.model";
import { AdmService } from "../../Services/adm.services";

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


    // initProgressBar = 'visible'
    // public moduloForm: FormGroup;
    // public addMateriaForm: FormGroup;
    // public addDocForm: FormGroup;
    // private jwtHelper = new JwtHelperService();
    // public tokenInfo: TokenInfos = new TokenInfos();
    public modulo: any// = new any();
    // materiasTemplate: any//
    public documentos: any//
    // modalidade = Modalidade
    // public titularDoc = TitularDoc
    // showForm = false

    public initProgressBar = 'visible'
    public saveProgressBar = 'hidden'

    public showContent = false
    public addMateriasForm = false

    public moduloForm: FormGroup;
    public addMateriaForm: FormGroup;
    public addDocForm: FormGroup;

    private jwtHelper = new JwtHelperService();
    public tokenInfo: TokenInfos = new TokenInfos();

    public errorMsg: any[] = new Array<any>()
    public unidadesAutorizadas: any[] = new Array<any>();
    public materiasTemplate: any[] = new Array<any>();
    public documentosTemplate: any[] = new Array<any>();

    public typePacotes: any
    public docTemplates: any

    public titularDoc = TitularDoc

    constructor(
        private _admService: AdmService,
        private _snackBar: MatSnackBar,
        //private router: Router,
        private _fb: FormBuilder,
        //private _http: HttpClient,
        public dialogRef: MatDialogRef<DetailPacoteComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

        this.addMateriaForm = _fb.group({
            pacote: ['', [Validators.required]]
        })

        this.addDocForm = _fb.group({
            documento: ['', [Validators.required]]
        })

        this.moduloForm = _fb.group({
            id: [''],
            descricao: ['', [Validators.required]],
            dataCriacao: [''],
            totalHoras: [''],
            typePacoteId: ['', [Validators.required]],
            unidadeId: ['', [Validators.required]],
            ativo: [''],

            materias: this._fb.array([], [Validators.required]),
            documentosExigidos: this._fb.array([])

        })
    }  

    ngOnInit() {
        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)

        this.GetEditPacoteView(this.data['moduloId'])
    }

    GetEditPacoteView(pacoteId) {

        this._admService.GetEditModuleViewModel(pacoteId)
            .subscribe(
                sucesso => { this.GetEditPacoteViewSucesso(sucesso) },
                error => { this.GetEditPacoteViewErro(error) })
    }

    GetEditPacoteViewSucesso(response) {
        this.modulo = response['pacote']
        this.materiasTemplate = response['materias']
        this.documentos = response['docs']

        this.MappingForm();
    }

    GetEditPacoteViewErro(error){
        this.initProgressBar = 'hidden'
        //console.log(error)
    }

    MappingForm(){
        this.modulo.materias.forEach(element => {
            this.addMateriaInitial(element)
        });

        this.modulo.documentosExigidos.forEach(element => {
            this.addDocumentacaoInitial(element)
        });
        
        this.moduloForm.get('id').setValue(this.modulo.id)
        this.moduloForm.get('descricao').setValue(this.modulo.descricao)
        this.moduloForm.get('dataCriacao').setValue(this.modulo.dataCriacao)
        this.moduloForm.get('totalHoras').setValue(this.modulo.totalHoras)
        this.moduloForm.get('typePacoteId').setValue(this.modulo.typePacoteId)
        this.moduloForm.get('unidadeId').setValue(this.modulo.unidadeId)
        this.moduloForm.get('ativo').setValue(this.modulo.ativo)
        
        this.initProgressBar = 'hidden'
        this.dialogRef.addPanelClass('mymoduloedit-class')
        this.showContent = true
        this.addMateriasForm = true
    }


    get materias() {
        return this.moduloForm.controls["materias"] as FormArray;
    }

    get documentosExig() {
        return this.moduloForm.controls["documentosExigidos"] as FormArray;
    }

    addDocumentacaoInitial(form: any) {

        let pacote = form//.value['pacote']

        // if (form.valid) {
        //     let pacotId = this.materias.value.find(element =>
        //         element.materiaId == pacote.id);
        //         if (pacotId != undefined) return;
        //     }


        const docsForm = this._fb.group({
            id: [pacote.id],
            descricao: [pacote.descricao],
            comentario: [pacote.comentario],
            titular: [pacote.titular],
            validadeDias: [pacote.validadeDias],
            obrigatorioParaMatricula: [pacote.obrigatorioParaMatricula],
            pacoteId: [pacote.pacoteId],


        });

        this.documentosExig.push(docsForm);
        //}

    }

    addMateriaInitial(form: any) {

        let pacote = form//.value['pacote']

        // if (form.valid) {
        //     let pacotId = this.materias.value.find(element =>
        //         element.materiaId == pacote.id);
        //         if (pacotId != undefined) return;
        //     }


        const matForm = this._fb.group({
            id: [pacote.id],
            materiaId: [pacote.materiaId],
            nome: [pacote.nome],
            descricao: [pacote.descricao],
            modalidade: [pacote.modalidade],
            cargaHoraria: [pacote.cargaHoraria],
            pacoteId: [pacote.pacoteId],

        });

        this.materias.push(matForm);
        //}
    }

    addMateria(form: any) {

        let pacote = form.value['pacote']

        if (form.valid) {
            let pacotId = this.materias.value.find(element =>
                element.materiaId == pacote.id);

            if (pacotId != undefined) return;

            const matForm = this._fb.group({
                id: [pacote.id],
                materiaId: [pacote.materiaId],
                nome: [pacote.nome],
                descricao: [pacote.descricao],
                modalidade: [pacote.modalidade],
                cargaHoraria: [pacote.cargaHoraria],
                pacoteId: [pacote.pacoteId],

            });

            this.materias.push(matForm);
        }
    }

    addDocumentos(form: any) {

        let pacote = form.value
        

        // if (form.valid) {
        //     let pacotId = this.documentosExig.value.find(element =>
        //         element.materiaId == pacote.id);
        //     if (pacotId != undefined) return;
        // }
        console.log(form.value)

        const docsForm = this._fb.group({
            id: [pacote.id],
            nome:  [pacote.nome],
            descricao: [pacote.descricao],
            titular: ['',[Validators.required]],
            validadeDias: [pacote.modalidade],
            obrigatorioParaMatricula: [false]
        });

        this.documentosExig.push(docsForm);
        //}

    }

    deleteLesson(index: number) {
        this.materias.removeAt(index);
    }

    deleteDocs(index: number) {
        this.documentosExig.removeAt(index);
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


    onSubmit(form: any) {

        if(this.moduloForm.valid){

            this._admService.editPacote(this.moduloForm.value)
                .subscribe(
                    sucesso => { this.onSubmitSucesso(sucesso)},
                    falha => { this.onSubmitErro(falha)})
        }
    }

    onSubmitSucesso(resposta){

    }

    onSubmitErro(error){

    }





}