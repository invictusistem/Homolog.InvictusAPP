import { HttpClient } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { HelpersService } from "../helpers/helpers.component";

@Component({
    selector: 'confirm-modal',
    templateUrl: './confirm-modal.component.html',
    styleUrls: ['./confirm-modal.component.scss'],
    animations: [HighlightTrigger]
})

export class ConfirmModalComponent implements OnInit {

    public msg: string = ''
    public url: string = ''
    constructor(
        //private _modal: MatDialog,
        private _helper: HelpersService,
        private _http: HttpClient,
        public dialogRef: MatDialogRef<ConfirmModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

    }
    disabledSaveButton = false
    ngOnInit() {
        this.msg = this.data['msg']
        this.url = this.data['url']
    }

    confirmar() {
        this.disabledSaveButton = true
        this._http.delete(`${this.url}`)
            .subscribe(response => {

            },
                (error) => { 
                    console.log(error)
                    this.dialogRef.close({ clicked: false });
                 },
                () => {
                    //this._helper.openSnackBar("Professor excluído com sucesso.")
                    this.dialogRef.close({ clicked: true });
                }
            )
    }

    cancelar() {
        this.dialogRef.close({ clicked: false });
    }




}