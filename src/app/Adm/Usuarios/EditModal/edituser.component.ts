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
    private baseUrl = environment.baseUrl
    public usuarioForm: FormGroup
    perfis = Perfis;
    usuario: Colaborador = new Colaborador();
    ativo = true;
    selected: any
    perfilAtivo: boolean = true
    isChecked = true;
    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        //private service: AdmService,
        public dialogRef: MatDialogRef<EditUserComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.usuarioForm = fb.group({

        })
    }

    //@Output() newItemEvent = new EventEmitter<string>();


    ngOnInit() {
        this.ativo = true;
        console.log(this.data['colaborador'])
        Object.assign(this.usuario, this.data['colaborador'] as Colaborador)
        //this.getTasks(1, this.pageSize);
        this.selected = this.usuario.perfil
        this.perfilAtivo = this.usuario.perfilAtivo
        console.log(this.usuario)
        this.isChecked = this.usuario.perfilAtivo
    }
    changePerfil(perfil: string) {
        this.usuario.perfil = perfil
        console.log(this.usuario)
    }
    SaveUser(form: Form) {
        console.log(this.usuario)
    }
    onOffPerfil() {
        console.log(this.usuario.perfilAtivo)
        console.log(this.perfilAtivo)
        this.usuario.perfilAtivo = !this.usuario.perfilAtivo
        this.perfilAtivo = this.usuario.perfilAtivo
        console.log(this.usuario.perfilAtivo)
        console.log(this.perfilAtivo)
        //         this.usuario.perfilAtivo ?
        //         this.usuario.perfilAtivo = false :
        //         this.usuario.perfilAtivo = true 

        //         console.log(this.usuario)
        //         console.log(this.usuario.perfilAtivo)

    }

    submitForm(form: NgForm) {
        console.log(form.value)
        this.usuario.perfilAtivo = form.value['perfilAtivo']
        this.usuario.perfil = form.value['perfil']
        console.log(this.usuario)

        this.http.put(`${this.baseUrl}/colaboradores/users?id=${this.usuario.id}&perfil=${this.usuario.perfil}&perfilativo=${this.usuario.perfilAtivo}`, {

        }).subscribe((response) => {

        },
            (erro) => { console.log(erro) },
            () => {

            }
        )
        // console.log(this.editedColaborador)
        // if (form.valid) {
        //     console.log('form valid')
        //     /// const novoColaborador = JSON.stringify(form.value);
        //     this.edit(JSON.stringify(this.editedColaborador))
        //     // this.model.saveProduct(this.product);
        //     // //this.product = new Product();
        //     // //form.reset();
        //     // this.originalProduct = this.product;
        //     // this.router.navigateByUrl("/");
        // }
    }


    selectPerfil(event: Event) {
        this.selected = (event.target as HTMLSelectElement).value;
        console.log('event')
    }

}