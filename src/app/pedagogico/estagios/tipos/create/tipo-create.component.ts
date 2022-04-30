import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HighlightTrigger } from "src/app/_shared/animation/animation";
import { BaseComponent } from "src/app/_shared/services/basecomponent.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { PedagogicoService } from "src/app/pedagogico/services/pedagogico.service";

@Component({
    selector: 'tipo-create-modal',
    templateUrl: './tipo-create.component.html',
    styleUrls: ['./tipo-create.component.scss'],
    animations: [HighlightTrigger]
})

export class TipoCreateComponent extends BaseComponent implements OnInit {

    //baseUrl = environment.baseUrl;
    //materiasAtuais: any[] = new Array<any>()
    //materias: any[] = new Array<any>()
    //typePacotes: any[] = new Array<any>()
    estagioTipoForm!: FormGroup
    //mostrarDivPrincipal = false
    //showForm = false

    constructor(
        override _snackBar: MatSnackBar,
        private _pedagService: PedagogicoService,
        private _fb: FormBuilder,
        //private _http: HttpClient,
        //private _helper: HelpersService,
        public dialogRef: MatDialogRef<TipoCreateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        super(_snackBar)
        this.estagioTipoForm = _fb.group({
            nome: ['', [Validators.required]],
            observacao: ['', [Validators.required, Validators.maxLength(250)]],
            ativo:[true]
        })
    }

    ngOnInit() {
        //this.materiasAtuais = Object.assign([], this.data['materias'])
        //this.GetTypePacotes()
    }   

    public Save() { // AddEstagioTipo
        // this.showMateriaMsg = false
        // var mat = this.materiasAtuais.find(element => element.pacoteMateriaId == this.materiasForm.get('materiaId')?.value)
        // //console.log(mat)
        // if (mat != undefined) {
        //     this.showMateriaMsg = true
        //     return;
        // }

        //this.disabledSaveButton = true

        if (this.estagioTipoForm.valid) {

            this.disabledSaveButton = 'visible'

            this._pedagService.AddEstagioTipo(this.estagioTipoForm.value)
                .subscribe(
                    sucesso => { this.SaveSucess() },
                    falha => { this.SaveError(falha) },
                )
        }
    }

    private SaveSucess(){
        this.openSnackBarSucesso("Matéria adicionada com sucesso.")
        this.dialogRef.close({ clicked: true });
    }

    private SaveError(error: any){
        this.openSnackBarError("Ocorreu um erro, entre em contato com o administrador do sistema.")
    }

    //disabledSaveButton = false
    get disabledButton() {
        if (this.estagioTipoForm.valid) {
            return this.disabledSaveButton != 'hidden'
        } else {
            return true
        }
    }
}