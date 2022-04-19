import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from "@angular/common/http";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HighlightTrigger } from "src/app/_shared/animation/animation";
import { environment } from "src/environments/environment";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { AdmService } from "../../services/adm.service";
import { TitularDoc } from "src/app/_shared/models/perfil.model";

@Component({
    selector: 'modulocreatemodal',
    templateUrl: './modulo-create.component.html',
    styleUrls: ['./modulo-create.component.scss'],
    animations: [HighlightTrigger]
})

export class ModuloCreateComponent implements OnInit {


    baseUrl = environment.baseUrl;
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
        private _fb: FormBuilder,
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
            totalHoras: [''],
            typePacoteId: ['', [Validators.required]],
            unidadeId: ['', [Validators.required]],
            ativo: [true],

            materias: this._fb.array([], [Validators.required]),
            documentosExigidos: this._fb.array([])

        })
    }

    ngOnInit() {

        const token: any = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)
        this.unidadesAutorizadas = JSON.parse(this.tokenInfo.UnidadesAutorizadas as string)
        this.GetViewModels()
        // TEMP
        this.GetUnidadeBySigla()
    }


    GetUnidadeBySigla(){

        this._admService.GetUnidadesFilteredBySigla(this.tokenInfo.Unidade)
        .subscribe(
            (sucesso: any) => {
                this.moduloForm.get('unidadeId')?.setValue(sucesso['unidade'])
            }
        )      
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
            let pacotId = this.materias.value.find((element: any) => // get materias()
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

            this.materias.push(matForm);// get materias()
        }
    }
    addDocumentos(form: any) {

        let documento = form.value['documento']

        if (form.valid) {
            // let documentoId = this.documentos.value.find(element =>
            //     element.documentoId == documento.id);

            // if (documentoId != undefined) return;

            const docsForm = this._fb.group({
                obrigatorioParaMatricula: [false],
                descricao: [documento.nome],
                comentario: ['', [Validators.required]],
                titular: ['', [Validators.required]],
                validadeDias: [documento.validadeDias]

            });

            this.documentos.push(docsForm);
        }
    }

    deleteLesson(index: number) {
        this.materias.removeAt(index);
    }
    deleteDocumento(index: number) {
        this.documentos.removeAt(index);
    }

    get totalHoras() {
        let total = 0

        if (this.moduloForm.get('materias')?.value.length > 0) {
            const sum = this.moduloForm.get('materias')?.value.reduce((horas: any, a: any) => ({
                cargaHoraria: horas.cargaHoraria + a.cargaHoraria
            }));

            if (sum != null) {
                total = sum['cargaHoraria']
            } else {
                total = 0
            }
        }

        this.moduloForm.get('totalHoras')?.setValue(total)

        return total
    }

    
    get disabledSaveButton() {

        if (this.saveProgressBar == 'visible') return true

        if (this.moduloForm.valid) return false

        return true
    }

    GetViewModels() {

        this._admService.GetCreateModuleViewModel()
            .subscribe(
                sucesso => { this.GetViewModelsSucesso(sucesso) },
                erro => { this.GetViewModelsErro(erro) })
    }

    GetViewModelsSucesso(response: any) {
        this.typePacotes = response['typePacotes']
        this.docTemplates = response['documentos']
        this.initProgressBar = 'hidden'
        this.dialogRef.addPanelClass('mymodulocreate-class')
        this.showContent = true

    }

    GetViewModelsErro(error: any) {
        this.initProgressBar = 'hidden'
       // console.log(error)
    }

    buscarMaterias(typePacoteId: any) {
        this.materias.clear()
        this.initProgressBar = 'visible'
       // console.log('buscar')
        this._admService.GetMateriasByTypeId(typePacoteId)
            .subscribe(
                sucesso => { this.buscarMateriasSucesso(sucesso) },
                erro => { this.buscarMateriasErro(erro) })
    }

    buscarMateriasSucesso(resposta: any) {
        this.materiasTemplate = resposta['materias']
        this.initProgressBar = 'hidden'
        this.addMateriasForm = true
    }

    buscarMateriasErro(error: any) {
        this.initProgressBar = 'hidden'
        console.log(error)
    }

    onSubmit(form: any) {
        console.log(this.moduloForm.value)
        if (form.valid) {
            this.saveProgressBar = 'visible'
            this._admService.SavePacote(this.moduloForm.value)
                .subscribe(
                    sucesso => { this.onSubmitSucesso(sucesso) },
                    erro => { this.onSubmitErro(erro) })
        }
    }

    onSubmitSucesso(resposta: any) {
        this.dialogRef.close({ clicked: true });
        this.saveProgressBar = 'hidden'
    }
    
    onSubmitErro(error: any) {
       // console.log(error)
        if (error['status'] == 409) {
            this.errorMsg = error['error'].erros
        }
        this.saveProgressBar = 'hidden'

    }

}