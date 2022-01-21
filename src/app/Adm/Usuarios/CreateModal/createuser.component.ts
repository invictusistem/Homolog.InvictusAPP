import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { GenericTask } from 'src/app/shared/models/generictask.model';
import { Output, EventEmitter } from '@angular/core';
//import { AdmService } from '../../adm.service';
import { PageEvent } from '@angular/material/paginator';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Colaborador } from "src/app/_shared/models/colaborador.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PerfilEnum } from "src/app/_shared/models/perfil.model";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
//import { TemplateTasks } from 'src/app/shared/models/templateTasks.model';

@Component({
    selector: 'createusermodal',
    templateUrl: './createuser.component.html',
    styleUrls: ['./createuser.component.scss'],
    animations: [HighlightTrigger]
})

export class CreateUserComponent implements OnInit {

    baseUrl = environment.baseUrl
    public usuario: any;//Colaborador = new Colaborador();
    public usuarioForm: FormGroup;
    perfisArray = PerfilEnum;
    public initProgressBar = 'hidden'
    // pageSize: number = 5;
    // genericTasks: GenericTask[] = new Array<GenericTask>();
    // length: number;
    // pageEvent: PageEvent;
    mensagem = "";
    showForm = false
    showMensagem = false
    constructor(
        //private service: AdmService,
        public fb: FormBuilder,
        public http: HttpClient,
        public dialogRef: MatDialogRef<CreateUserComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.usuarioForm = fb.group({
            id: [],
            // nome: ['', [Validators.required, Validators.minLength(2)]],
            perfil: ['', [Validators.required]],
            // email: ['', [Validators.required, Validators.email]],
            perfilAtivo: [true, [Validators.required]]
        })
    }

    //@Output() newItemEvent = new EventEmitter<string>();


    ngOnInit() {
        // this.usuario.perfilAtivo = true;
        // console.log("on init")
        //this.getTasks(1, this.pageSize);
    }


    consultaUsuario(email: any) {
        console.log(email)
        if (email == '') return;
        this.showForm = false
        this.showMensagem = false
        this.initProgressBar = 'visible'
        this.http.get(`${this.baseUrl}/usuario/procurar/?email=${email}`).subscribe(
            (result) => {

                this.usuario = Object.assign({}, result['result'])
                console.log(this.usuario)

                this.usuarioForm.get('id').setValue(this.usuario.id)

            },
            (err) => {
                this.initProgressBar = 'hidden'
                console.log(err['error'].mensagem)
                this.mensagem = err['error'].mensagem
                this.showMensagem = true
            },
            () => {
                this.initProgressBar = 'hidden'
                console.log(this.usuario)
                this.showMensagem = false
                this.showForm = true
                console.log()
            }
        )

    }
    public sabeSpinner = 'hidden'
    disabledSaveButton = false
    get disabledButton() {
        if (this.usuarioForm.valid) {
            return this.sabeSpinner != 'hidden'
        } else {
            return true
        }

    }

    SaveUser(form: FormGroup) {

        console.log(form.valid)

        if (this.usuarioForm.valid) {
            this.sabeSpinner = 'visible'
            this.disabledSaveButton = true
            let perfil = this.usuarioForm.get('perfil').value
            let perfilAtivo = this.usuarioForm.get('perfilAtivo').value

            this.http.post(`${this.baseUrl}/usuario/${this.usuario.id}/?perfil=${perfil}&perfilAtivo=${perfilAtivo}`, {
            }).subscribe(
                (result) => {
                },
                (err) => {
                    console.log(err)
                    this.sabeSpinner = 'hidden'
                },
                () => {
                    this.sabeSpinner = 'hidden'
                    this.dialogRef.close({ clicked: "Ok" });
                }
            )
        }
    }

}

export class JsonPatch {
    constructor(

    ) { }
}