import { Component, Inject, OnInit, Pipe, PipeTransform } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { GenericTask } from 'src/app/shared/models/generictask.model';
import { Output, EventEmitter } from '@angular/core';
//import { AdmService } from '../../adm.service';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { JwtHelperService } from "@auth0/angular-jwt";
//import { TemplateTasks } from 'src/app/shared/models/templateTasks.model';


@Component({
    selector: 'sala-editarmodal',
    templateUrl: './sala-editar.component.html',
    styleUrls: ['./sala-editar.component.scss'],
    animations: [HighlightTrigger]
})

export class SalaEditarComponent implements OnInit {

    // pageSize: number = 5;
    // genericTasks: GenericTask[] = new Array<GenericTask>();
    // length: number;
    // pageEvent: PageEvent;
    public initProgressBar = 'visible'
    public buscaSalaSpinner = 'hidden'
    public saveSpinner = 'hidden'

    public showContent = false
    private jwtHelper = new JwtHelperService();
    tokenInfo: TokenInfos = new TokenInfos();
    public salas: any[]
    public sala: any;
    private _baseUrl = environment.baseUrl
    public showEditSalaForm: boolean = false
    public originalSala: any
    public salaForm: FormGroup;
    constructor(
        //private service: AdmService,
        private _http: HttpClient,
        private _fb: FormBuilder,
        public dialogRef: MatDialogRef<SalaEditarComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.salaForm = this._fb.group({
            id: [''],
            titulo: [''],
            descricao: ['', [Validators.required]],
            capacidade: [''],
            comentarios: ['', [Validators.required, Validators.maxLength(200)]],
            ativo: [''],
            dataCriacao: [''],
            unidadeId: ['']


        })
    }


    ngOnInit() {


        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)
        console.log(this.data['unidade'])
        this.GetSalas();
    }

    GetSalas() {
        this._http.get(`${this._baseUrl}/unidade/salas/${this.data["unidade"].id}`)
            .subscribe(resp => {
                this.salas = resp['salas']
            },
                (error) => { console.log(error) },
                () => {
                    this.initProgressBar = 'hidden'
                    this.showContent = true
                })
    }

    buscar(salaId) {
        //console.log(id)
        this.buscaSalaSpinner = 'visible'
        this._http.get(`${this._baseUrl}/unidade/sala/${salaId}`)
            .subscribe(resp => {
                this.salaForm.patchValue(resp['sala']);
                this.originalSala = JSON.parse(JSON.stringify(this.salaForm.value))
                // this.sala = resp['sala']
            },
                (error) => { console.log(error) },
                () => {
                    this.buscaSalaSpinner = 'hidden'
                    this.showEditSalaForm = true
                })
    }

    get saveButton() {

        if (this.salaForm.valid) {
            return this.saveSpinner != 'hidden'
        } else {
            return true
        }
    }

    onSubmit(form: any) {

        if (this.salaForm.valid) {
            this.saveSpinner != 'visible'
            this._http.put(`${this._baseUrl}/unidade/sala-editar`, this.salaForm.value, {})
                .subscribe(resp => { },
                    (error) => {
                        this.saveSpinner != 'hidden'
                    },
                    () => {
                        this.dialogRef.close({ clicked: "OK" })
                    })

        }
    }
}