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
import { HelpersService } from "src/app/_shared/components/helpers/helpers.component";
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
    public perfisArray: any[] = new Array<any>()// = PerfilEnum;
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
        private _helper: HelpersService,
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
                //console.log(this.usuario)
                this.perfisArray = result['perfis']

                this.usuarioForm.get('id').setValue(this.usuario.id)

            },
            (err) => {
                if(err['status'] == 401){
                    this._helper.openSnackBarError("Você não possui autorização para conceder acesso.")
                    this.dialogRef.close();
                }else{
                this.initProgressBar = 'hidden'
                console.log(err['error'])
                this.mensagem = err['error'].mensagem
                this.showMensagem = true
                }
            },
            () => {
                this.initProgressBar = 'hidden'
                
                this.showMensagem = false
                this.showForm = true
               
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

       // console.log(form.valid)

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
                    //console.log(err['error'].msg)
                    if(err['status'] == 400){
                        this.sabeSpinner = 'hidden'
                        this._helper.openSnackBarError(err['error'].msg)
                        this.dialogRef.close();    
                    }else{
                        this.sabeSpinner = 'hidden'
                        this._helper.openSnackBarErrorDefault()
                        this.dialogRef.close();
                    }
                    

                },
                () => {
                    this.sabeSpinner = 'hidden'
                    this._helper.openSnackBarSucesso("Acesso criado com sucesso")
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