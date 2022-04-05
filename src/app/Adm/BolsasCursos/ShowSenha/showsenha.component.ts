import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { AdmService } from "../../Services/adm.services";

@Component({
    selector: 'createbolsamodal',
    template: `<div style="font-size: 0.9em;">
    Senha: <br>
    {{ data['senha'] }}
    </div>`,
   // styleUrls: ['./createbolsa.component.scss'],
    animations: [HighlightTrigger]
})

export class ShowSenhaComponent implements OnInit {
    
    public initProgressBar = 'visible'
    public showContent = false
    public typesPacotes: any[] = new Array<any>()
    public bolsaForm: FormGroup

    constructor(
        private _admService: AdmService,
        private _fb: FormBuilder,
        public dialogRef: MatDialogRef<ShowSenhaComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
        
    }

   
    

}


