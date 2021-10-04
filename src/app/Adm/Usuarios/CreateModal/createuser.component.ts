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
    public usuario: Colaborador = new Colaborador();
    public usuarioForm: FormGroup;
    perfisArray = PerfilEnum;
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
            id:[,[Validators.required]],
            nome: ['', [Validators.required, Validators.minLength(2)]],
            perfil: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            perfilAtivo: [true, [Validators.required]]
        })
    }

    //@Output() newItemEvent = new EventEmitter<string>();


    ngOnInit() {
        this.usuario.perfilAtivo = true;
        // console.log("on init")
        //this.getTasks(1, this.pageSize);
    }


    consultaUsuario(email: any) {

        if(!this.usuarioForm.get('email').valid) return;
        this.showForm = false
        this.showMensagem = false
        console.log(email)
        this.http.get(`${this.baseUrl}/colaboradores/procurar/?email=${email}`).subscribe(
            (result) => {
                // console.log(this.usuarioForm.get['nome'])
                // this.usuarioForm['nome'].patchValue({name:"joao"})
                // console.log(this.usuarioForm.get['nome'])
                console.log(result)
                console.log(result['data'])
                // console.log(result['nome'])
                //conos
                console.log(result['mensagem'])
                Object.assign(this.usuario, result['data'])
                console.log(this.usuario)
                this.usuarioForm.controls['nome'].setValue(this.usuario.nome)

                this.usuarioForm.get('id').setValue(this.usuario.id)
               // this.usuarioForm.controls['perfilAtivo'].setValue(this.usuario.perfilAtivo)
                // if (result['mensagem'] != "") {
                //     console.log('tem mensagem')
                // } else {

                //     this.usuario = result['data']
                //     console.log(this.usuario)
                //     this.usuarioForm.controls['nome'].setValue(this.usuario.nome)
                //     this.usuarioForm.controls['id'].setValue(this.usuario.id)

                //      this.usuario = result as Colaborador
                //     console.log(this.usuario)

                // }
                //console.log(mensagem)
            },
            (err) => { 
                console.log(err['error'].mensagem) 
                this.mensagem = err['error'].mensagem
                this.showMensagem = true
            },
            () => {
                console.log(this.usuario)
                this.showMensagem = false
                this.showForm = true
                
                // this.usuarioForm['nome'].setValue(this.usuario.nome)
                console.log()
            }
        )

    }

    onCheckboxChange(e) {
        //const website: FormArray = this.form.get('website') as FormArray;
       // console.log(e.checked)
        console.log(e)
       //console.log(profId)
        if (e.checked) {
            this.usuarioForm.controls['perfilAtivo'].setValue(e.checked)
        } else {
            this.usuarioForm.controls['perfilAtivo'].setValue(e.checked)
        }

        // if (e.target.checked) {
        //   website.push(new FormControl(e.target.value));
        // } else {
        //    const index = website.controls.findIndex(x => x.value === e.target.value);
        //    website.removeAt(index);
        // }
    }

    changePerfil(e) {
        console.log(e)
        //return this.usuarioForm.get('perfil');

        this.usuarioForm['perfil'].setValue(e.target.value, {
            onlySelf: true
        })
    }

    SaveUser(form: FormGroup) {
        console.log(form.value)
        console.log(form.valid)
        console.log(this.usuarioForm.get['nome'])
        //this.usuarioForm.controls['nome'].setValue(this.usuario.nome)
        //this.usuarioForm.controls['id'].setValue(this.usuario.id)
        //console.log(this.usuarioForm.get['nome'])
        var perfil = form.value['perfil']
        if (form.valid) {

            var patchreq = `[{"op":"replace","path":"/perfil","value":"${form.value['perfil']}"}]`
            console.log(JSON.stringify(patchreq))
            const user = JSON.stringify(patchreq)
            
            this.http.put(`${this.baseUrl}/colaboradores/${this.usuario.id}/?perfil=${perfil}&perfilAtivo=${form.value['perfilAtivo']}`, {
            }).subscribe(
                (result) => {



                },
                (err) => { console.log(err) },
                () => {

                    this.dialogRef.close({ clicked: "Ok" });
                    console.log(this.usuario)

                    console.log()
                }
            )
        }

    }
    onOkClick() {
        //console.log("I do nothing");
        this.dialogRef.close({ clicked: "Ok" });
    }
    // getTasks(actualPage: number, pageSize: number) {
    //     this.service.getTasks(actualPage, pageSize)
    //         .subscribe(
    //             tasks => {
    //                 console.log(tasks)
    //                 this.genericTasks =  Object.assign([],tasks["data"]);
    //                 this.length = tasks["totalItemsInDatabase"];

    //             },
    //             (err) => {
    //                 console.log("err erro")


    //             },
    //             () => { console.log('ok get') },
    //         )

    // }

    // addNewItem(value: string) {
    //     console.log(value)
    //     this.newItemEvent.emit(value);
    // }

    // adicionar(taskAded: GenericTask) {
    //     console.log(taskAded)
    //     let templateTask:TemplateTasks = new TemplateTasks()
    //     templateTask.genericTaskId = taskAded.id
    //     templateTask.name = taskAded.name
    //     templateTask.hour = taskAded.hour
    //     templateTask.minute = taskAded.minute
    //     console.log(templateTask)

    //     this.data.templateTasks.push(templateTask)

    //     console.log(this.data.templateTasks)
    //     console.log('adicionar task')
    // }


    // //mat-dialog-container
    // onNoClick(): void {
    //     this.dialogRef.close();
    // }
    // pageIndexNumber: number = 0;
    // clicar(evento: any) {
    //     console.log(evento)

    //     this.pageIndexNumber = (evento.pageIndex * this.pageSize)
    //     this.getTasks(evento.pageIndex + 1, this.pageSize);
    // }
}

export class JsonPatch {
    constructor(

    ) { }
}