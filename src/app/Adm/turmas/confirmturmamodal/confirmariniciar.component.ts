import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'confirmdialog',
    templateUrl: 'confirmariniciar.component.html',
})
export class ConfirmarIniciarTurmaModal {

    constructor(
        public dialogRef: MatDialogRef<ConfirmarIniciarTurmaModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }
}