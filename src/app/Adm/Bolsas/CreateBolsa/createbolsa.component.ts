import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { AdmService } from "../../services/adm.services";
import { HelpersService } from "src/app/_shared/components/helpers/helpers.component";

@Component({
    selector: 'createbolsamodal',
    templateUrl: './createbolsa.component.html',
    styleUrls: ['./createbolsa.component.scss'],
    animations: [HighlightTrigger]
})

export class CreateBolsaComponent implements OnInit {
    
    public initProgressBar = 'visible'
    public showContent = false
    public typesPacotes: any[] = new Array<any>()
    public bolsaForm: FormGroup

    constructor(
        private _admService: AdmService,
        private _helper: HelpersService, 
        private _fb: FormBuilder,
        public dialogRef: MatDialogRef<CreateBolsaComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

        this.bolsaForm = _fb.group({
            nome:['',[Validators.required]],
            percentualDesconto:['',[Validators.required,Validators.min(1), Validators.max(100)]],
            typePacoteId:['',[Validators.required]],
            dataExpiracao:['',[Validators.required]]
        })        
    }

    ngOnInit() {
        this.GetTypePacotes();
    }

    GetTypePacotes() {
        this.initProgressBar = 'visible'
        this._admService.getTypePacotes()
            .subscribe(
                sucesso => { this.GetTypePacotesSucesso(sucesso) },
                falha => { this.GetTypePacotesErro(falha) }
            )

    }

    GetTypePacotesSucesso(resposta) {
        this.typesPacotes = Object.assign([], resposta['typePacotes']);
        this.initProgressBar = 'hidden'
        this.dialogRef.addPanelClass('createbolsa-class')
        this.showContent = true
    }

    GetTypePacotesErro(error) {
        this.initProgressBar = 'hidden'
    }

    disabledSaveButton = 'hidden'
    get disabledButton() {
        if (this.bolsaForm.valid) {
            return this.disabledSaveButton != 'hidden'
        } else {
            return true
        }
    }

    onSubmit(form){

        if(this.bolsaForm.valid){
            this.disabledSaveButton = 'visible'
            this._admService.SaveBolsa(this.bolsaForm.value)
                .subscribe(
                    sucesso => { this.onSubmitSucesso(sucesso) },
                    falha => { this.onSubmitErro(falha) }
                )}
    }

    onSubmitSucesso(resp){
        this.disabledSaveButton = 'hidden'
        //console.log(resp['senha'])
        this._helper.openSnackBarSucesso('Bolsa cadastrada com sucesso.')
        this.dialogRef.close({ clicked: true})
    }

    onSubmitErro(error){
        this.disabledSaveButton = 'hidden'
       // console.log(error)
    }
    

}


