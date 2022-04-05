import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { AdmService } from "../../Services/adm.services";

@Component({
    selector: 'edit-bolsamodal',
    templateUrl: './edit-bolsa.component.html',
    styleUrls: ['./edit-bolsa.component.scss'],
    animations: [HighlightTrigger]
})

export class EditBolsaComponent implements OnInit {

    public initProgressBar = 'visible'
    public showContent = false
    // public typesPacotes: any;
    public originalBolsa: any
    public bolsaForm: FormGroup

    constructor(
        private _admService: AdmService,
        private _fb: FormBuilder,
        public dialogRef: MatDialogRef<EditBolsaComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

        this.bolsaForm = _fb.group({
            id: [''],
            nome: ['', [Validators.required]],
            percentualDesconto: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
            typePacoteId: ['', [Validators.required]],
            dataExpiracao: ['', [Validators.required]],
            senha: [''],
            colaborador: [''],
            unidadeId: [''],
            dataCriacao: ['']


        })
    }

    ngOnInit() {
        this.GetBolsa();
    }

    GetBolsa() {
        this.initProgressBar = 'visible'
        this._admService.GetBolsa(this.data['bolsaId'])
            .subscribe(
                sucesso => { this.GetBolsaSucesso(sucesso) },
                falha => { this.GetBolsaErro(falha) }
            )

    }

    GetBolsaSucesso(resposta) {
        this.bolsaForm.patchValue(resposta['bolsa']);
        this.bolsaForm.patchValue(resposta['bolsa']);
        this.originalBolsa = JSON.parse(JSON.stringify(this.bolsaForm.value))
        this.initProgressBar = 'hidden'
        this.dialogRef.addPanelClass('editbolsa-class')
        this.showContent = true
    }

    GetBolsaErro(error) {
        this.initProgressBar = 'hidden'
    }

    disabledSaveButton = 'hidden'
    get disabledButton() {
        if (this.bolsaForm.valid &&
            JSON.stringify(this.originalBolsa) !=
            JSON.stringify(this.bolsaForm.value)) {

            return this.disabledSaveButton != 'hidden'
        } else {
            return true
        }
    }

    onSubmit(form) {

        if (this.bolsaForm.valid) {
            this.disabledSaveButton = 'visible'
            this._admService.EditBolsa(this.bolsaForm.value)
                .subscribe(
                    sucesso => { this.onSubmitSucesso(sucesso) },
                    falha => { this.onSubmitErro(falha) }
                )
        }
    }

    onSubmitSucesso(resp) {
        this.disabledSaveButton = 'hidden'
        //console.log(resp['senha'])
        this.dialogRef.close({ clicked: true })
    }

    onSubmitErro(error) {
        this.disabledSaveButton = 'hidden'
        console.log(error)
    }


}


