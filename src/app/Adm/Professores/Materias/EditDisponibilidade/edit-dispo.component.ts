import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { SpinnerParams } from "src/app/_shared/models/spinner.model";
import { HelpersService } from "src/app/_shared/components/helpers/helpers.component";
import { AdmService } from "src/app/adm/services/adm.services";

@Component({
    selector: 'edit-dispomodal',
    templateUrl: './edit-dispo.component.html',
    //styleUrls: ['./edit-dispo.component.scss'],
    animations: [HighlightTrigger]
})

export class EditDispoComponent implements OnInit {

    baseUrl = environment.baseUrl;
    originalDispo: any;// = new Any()
    dispo:any
    

    constructor(
        private _fb: FormBuilder,
        private _admService: AdmService,
        private _http: HttpClient,
        private _helper: HelpersService,
        public dialogRef: MatDialogRef<EditDispoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        

    }

    ngOnInit() {
      
        console.log(this.data['dispo'])
        this.originalDispo = Object.assign({}, this.data['dispo'])
        this.dispo = Object.assign({}, this.data['dispo'])
      
    }

    

    disabledSaveButton = false
    get disabledButton() {
        if(this.disabledSaveButton){
            return true
        }
        if (JSON.stringify(this.dispo) === JSON.stringify(this.originalDispo)) {
            return true
        } else {
            return false
        }
    }

    saveEdit(form) {
        this.disabledSaveButton = true
        this._admService.editDisponibilidade(this.dispo)
        .subscribe(
            sucesso => {  this.dialogRef.close({ clicked: true }); },
            falha => {  this.dialogRef.close({ clicked: false }); }
        )
    }


    

}