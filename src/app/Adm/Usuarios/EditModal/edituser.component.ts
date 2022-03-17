import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { GenericTask } from 'src/app/shared/models/generictask.model';
import { Output, EventEmitter } from '@angular/core';
//import { AdmService } from '../../adm.service';
import { PageEvent } from '@angular/material/paginator';
import { Colaborador } from "src/app/_shared/models/colaborador.model";
import { Perfil, Perfis } from "src/app/_shared/models/perfil.model";
import { Form, FormBuilder, FormGroup, NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AdmService } from "../../services/adm.services";
import { HelpersService } from "src/app/_shared/components/helpers/helpers.component";
//import { TemplateTasks } from 'src/app/shared/models/templateTasks.model';

@Component({
    selector: 'editusermodal',
    templateUrl: './edituser.component.html',
    styleUrls: ['./edituser.component.scss']
})

export class EditUserComponent implements OnInit {

    // pageSize: number = 5;
    // genericTasks: GenericTask[] = new Array<GenericTask>();
    // length: number;
    // pageEvent: PageEvent;
    // private baseUrl = environment.baseUrl
    public roles: string[] = new Array<string>();
    public usuarioForm: FormGroup
    public showContent = false
    public usuario: any;// = new any();// Colaborador = new Colaborador();
    public initProgressBar = 'visible'
    //ativo = true;
    //selected: any
    //perfilAtivo: boolean = true
    //isChecked = true;
    // showForm = false
    constructor(
        // private fb: FormBuilder,
        // private http: HttpClient,
        private _helper: HelpersService,
        private _service: AdmService,
        public dialogRef: MatDialogRef<EditUserComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        // this.usuarioForm = fb.group({

        // })
    }

    //@Output() newItemEvent = new EventEmitter<string>();


    ngOnInit() {
        //  this.ativo = true;

        this.usuario = Object.assign({}, this.data['colaborador'])
        //this.getTasks(1, this.pageSize);
        //this.selected = this.usuario.perfil
        //this.perfilAtivo = this.usuario.perfilAtivo

        //this.isChecked = this.usuario.perfilAtivo

        this.getSystemRoles()
    }

    getSystemRoles() {

        this._service.getSystemRoles()
            .subscribe(
                sucesso => { this.getSystemRolesSuccess(sucesso) },
                falha => { this.getSystemRolesError(falha) }
            )
    }

    getSystemRolesSuccess(resposta) {
        this.roles = resposta['roles']
        this.initProgressBar = 'hidden'
        this.showContent = true

    }

    getSystemRolesError(error) {
        this.initProgressBar = 'hidden'
        this._helper.openSnackBarErrorDefault();
    }


    submitForm(form: NgForm) {
        console.log(form.value)
        this.usuario.perfilAtivo = form.value['perfilAtivo']
        this.usuario.perfil = form.value['perfil']
        console.log(this.usuario)

        this._service.editUsuario(this.usuario)
            .subscribe(
                sucesso => { this.submitFormSucesso() },
                falha => { this.submitFormErro(falha) }
            )
    }

    submitFormSucesso() {
        this._helper.openSnackBarSucesso('Acesso editado com sucesso.')
        this.dialogRef.close({ clicked: true })
    }

    submitFormErro(error) {
        this._helper.openSnackBarErrorDefault();
    }

}