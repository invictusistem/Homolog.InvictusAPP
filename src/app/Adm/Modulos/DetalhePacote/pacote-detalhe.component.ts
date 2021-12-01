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
    public addMateriaForm: FormGroup;
    public addDocForm: FormGroup;
    private jwtHelper = new JwtHelperService();
    public tokenInfo: TokenInfos = new TokenInfos();
    public modulo: any// = new any();
    materiasTemplate: any//
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
        this.addMateriaForm = _fb.group({
            pacote: ['', [Validators.required]]
        })

        // this.addDocForm = _fb.group({
        //     documento: ['', [Validators.required]]
        // })

        this.moduloForm = _fb.group({
            id: [''],
            descricao: ['', [Validators.required]],
            dataCriacao: [''],
            totalHoras: [''],
            typePacoteId: ['', [Validators.required]],
            unidadeId: ['', [Validators.required]],
            ativo: [''],

            materias: this._fb.array([], [Validators.required]),
            // documentosExigidos: this._fb.array([])

        })
    }

    trackByIdx(index: number, obj: any): any {
        return index;
    }

    ngOnInit() {
        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)

        console.log(this.data['moduloId'])

        this.GetEditPacoteView(this.data['moduloId'])
    }

    GetEditPacoteView(pacoteId) {

        this._http.get(`${this.baseUrl}/pacote/edit/${pacoteId}`)
            .subscribe(resp => {
                this.modulo = resp['pacote']
                this.materiasTemplate = resp['materias']
            },
                (error) => { console.log(error) },
                () => {
                    this.showForm = true
                    this.modulo.materias.forEach(element => {
                        this.addMateriaInitial(element)
                    });
                    // this.materias.push(this.modulo.materias);
                    this.moduloForm.get('id').setValue(this.modulo.id)
                    this.moduloForm.get('descricao').setValue(this.modulo.descricao)
                    this.moduloForm.get('dataCriacao').setValue(this.modulo.dataCriacao)
                    this.moduloForm.get('totalHoras').setValue(this.modulo.totalHoras)
                    this.moduloForm.get('typePacoteId').setValue(this.modulo.typePacoteId)
                    this.moduloForm.get('unidadeId').setValue(this.modulo.unidadeId)
                    this.moduloForm.get('ativo').setValue(this.modulo.ativo)
                    console.log(this.modulo)
                    console.log(this.moduloForm.value)
                })
    }

    get materias() {
        return this.moduloForm.controls["materias"] as FormArray;
    }

    addMateriaInitial(form: any) {

        let pacote = form//.value['pacote']

        // if (form.valid) {
        //     let pacotId = this.materias.value.find(element =>
        //         element.materiaId == pacote.id);

        //     if (pacotId != undefined) return;

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

    deleteLesson(index: number) {
        this.materias.removeAt(index);
    }



    onSubmit(form: any) {

    }





}